(() => {
  'use strict';

  const params = new URLSearchParams(location.search);
  const client = params.get('vk_client') === 'ok' ? 'ok' : 'vk';
  const listeners = { pause: new Set(), resume: new Set() };
  let initPromise = null;
  let bridgeReady = false;
  let bridgeSubscribed = false;

  let okFapiReady = false;
  let okFapiLoading = null;
  let okAdReady = false;
  let okAdPreparing = false;
  let okAdPreparedAt = 0;
  let okAdShowResolve = null;
  let okAdShowTimer = null;
  let previousApiCallback = null;

  const bridge = () => window.vkBridge || null;
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const withTimeout = async (promise, ms, fallback = null) => {
    let timer;
    try {
      return await Promise.race([
        Promise.resolve(promise),
        new Promise(resolve => { timer = setTimeout(() => resolve(fallback), ms); })
      ]);
    } finally {
      clearTimeout(timer);
    }
  };

  function emit(type) {
    listeners[type]?.forEach(handler => {
      try { handler(); } catch (error) {}
    });
  }

  function subscribeBridgeEvents() {
    if (bridgeSubscribed || !bridge()?.subscribe) return;
    bridgeSubscribed = true;
    bridge().subscribe(event => {
      const type = event?.detail?.type;
      if (type === 'VKWebAppViewHide') emit('pause');
      if (type === 'VKWebAppViewRestore') emit('resume');
    });
  }

  function installOkCallback() {
    if (window.API_callback?.__kotChefPlatformCallback) return;
    previousApiCallback = typeof window.API_callback === 'function' ? window.API_callback : null;

    const callback = function(method, result, data) {
      if (method === 'loadAd') {
        okAdPreparing = false;
        okAdReady = result === 'ok' && (data === 'ready' || data === 'ad_prepared');
        if (okAdReady) okAdPreparedAt = Date.now();
      }

      if (method === 'showLoadedAd') {
        if (result === 'event') {
          // OK additionally reports the real ad format. It is informational only.
        } else if (okAdShowResolve) {
          const resolve = okAdShowResolve;
          okAdShowResolve = null;
          clearTimeout(okAdShowTimer);
          okAdShowTimer = null;
          const completed = result === 'ok' && (data === 'complete' || data === 'ad_shown');
          okAdReady = false;
          okAdPreparedAt = 0;
          resolve(completed);
          setTimeout(prepareOkRewarded, 30000);
        }
      }

      try { previousApiCallback?.(method, result, data); } catch (error) {}
    };
    callback.__kotChefPlatformCallback = true;
    window.API_callback = callback;
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = [...document.scripts].find(script => script.src === src);
      if (existing) {
        if (window.FAPI) resolve();
        else {
          existing.addEventListener('load', resolve, { once: true });
          existing.addEventListener('error', reject, { once: true });
        }
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async function ensureOkFapi() {
    if (client !== 'ok') return false;
    if (okFapiReady) return true;
    if (okFapiLoading) return okFapiLoading;

    okFapiLoading = (async () => {
      try {
        if (!window.FAPI) await loadScript('https://api.ok.ru/js/fapi5.js');
        if (!window.FAPI?.Util?.getRequestParameters || !window.FAPI?.init) return false;

        installOkCallback();
        const request = window.FAPI.Util.getRequestParameters() || {};
        const apiServer = request.api_server || params.get('api_server');
        const apiConnection = request.apiconnection || params.get('apiconnection');
        if (!apiServer || !apiConnection) return false;

        okFapiReady = await withTimeout(new Promise(resolve => {
          window.FAPI.init(apiServer, apiConnection, () => resolve(true), () => resolve(false));
        }), 5000, false);

        if (okFapiReady) prepareOkRewarded();
        return okFapiReady;
      } catch (error) {
        okFapiReady = false;
        return false;
      } finally {
        okFapiLoading = null;
      }
    })();

    return okFapiLoading;
  }

  function prepareOkRewarded() {
    if (!okFapiReady || okAdReady || okAdPreparing || !window.FAPI?.UI?.loadAd) return;
    okAdPreparing = true;
    try {
      window.FAPI.UI.loadAd();
    } catch (error) {
      okAdPreparing = false;
      okAdReady = false;
    }
  }

  async function showOkRewarded(onOpen) {
    if (!okFapiReady) await ensureOkFapi();
    if (!okFapiReady) return false;

    if (!okAdReady) {
      prepareOkRewarded();
      return false;
    }

    const earliestShowAt = okAdPreparedAt + 10000;
    if (Date.now() < earliestShowAt) await delay(earliestShowAt - Date.now());
    if (!okAdReady) return false;

    return await new Promise(resolve => {
      try { onOpen?.(); } catch (error) {}
      okAdShowResolve = resolve;
      okAdShowTimer = setTimeout(() => {
        if (!okAdShowResolve) return;
        const finish = okAdShowResolve;
        okAdShowResolve = null;
        okAdShowTimer = null;
        okAdReady = false;
        okAdPreparedAt = 0;
        finish(false);
      }, 90000);
      try {
        window.FAPI.UI.showLoadedAd();
      } catch (error) {
        clearTimeout(okAdShowTimer);
        okAdShowTimer = null;
        okAdShowResolve = null;
        okAdReady = false;
        okAdPreparedAt = 0;
        resolve(false);
      }
    });
  }

  async function showBridgeRewarded(onOpen) {
    if (!bridgeReady || !bridge()?.send) return false;
    try {
      try { onOpen?.(); } catch (error) {}
      const data = await bridge().send('VKWebAppShowNativeAds', { ad_format: 'reward' });
      return data?.result === true;
    } catch (error) {
      return false;
    }
  }

  async function init() {
    if (initPromise) return initPromise;
    initPromise = (async () => {
      subscribeBridgeEvents();
      const currentBridge = bridge();
      if (currentBridge?.send) {
        const result = await withTimeout(
          currentBridge.send('VKWebAppInit').then(() => true).catch(() => false),
          3500,
          false
        );
        bridgeReady = result === true;
      }

      if (client === 'ok') {
        // FAPI is needed for rewarded ads on OK web/mobile web/iOS.
        ensureOkFapi().catch(() => false);
      }

      return { ok: bridgeReady, client };
    })();
    return initPromise;
  }

  const STORAGE_CHUNK_SIZE = 3000;
  const STORAGE_MAX_CHUNKS = 8;
  const storageChunkKey = (key, index) => `${key}_${index}`;
  const storageMetaKey = key => `${key}_meta`;

  async function bridgeStorageGet(keys) {
    const data = await withTimeout(bridge().send('VKWebAppStorageGet', { keys }), 4000, null);
    return Array.isArray(data?.keys) ? data.keys : [];
  }

  async function loadState(key) {
    if (!bridgeReady || !bridge()?.send) return null;
    try {
      const metaRows = await bridgeStorageGet([storageMetaKey(key), key]);
      const metaRaw = metaRows.find(item => item.key === storageMetaKey(key))?.value || '';
      const legacyRaw = metaRows.find(item => item.key === key)?.value || '';

      if (metaRaw) {
        const meta = JSON.parse(metaRaw);
        const count = Math.max(0, Math.min(STORAGE_MAX_CHUNKS, Number(meta?.chunks) || 0));
        if (!count) return null;
        const keys = Array.from({ length: count }, (_, index) => storageChunkKey(key, index));
        const rows = await bridgeStorageGet(keys);
        const map = Object.fromEntries(rows.map(item => [item.key, item.value || '']));
        const raw = keys.map(chunkKey => map[chunkKey] || '').join('');
        if (!raw) return null;
        return JSON.parse(raw);
      }

      if (!legacyRaw) return null;
      return JSON.parse(legacyRaw);
    } catch (error) {
      return null;
    }
  }

  async function saveState(key, value) {
    if (!bridgeReady || !bridge()?.send) return false;
    try {
      const payload = JSON.stringify(value);
      const chunks = [];
      for (let offset = 0; offset < payload.length; offset += STORAGE_CHUNK_SIZE) {
        chunks.push(payload.slice(offset, offset + STORAGE_CHUNK_SIZE));
      }
      if (!chunks.length) chunks.push('');
      if (chunks.length > STORAGE_MAX_CHUNKS) return false;

      for (let index = 0; index < chunks.length; index++) {
        await withTimeout(
          bridge().send('VKWebAppStorageSet', { key: storageChunkKey(key, index), value: chunks[index] }),
          4000,
          null
        );
      }
      await withTimeout(
        bridge().send('VKWebAppStorageSet', {
          key: storageMetaKey(key),
          value: JSON.stringify({ chunks: chunks.length, version: 1 })
        }),
        4000,
        null
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async function showRewarded(options = {}) {
    const onOpen = typeof options.onOpen === 'function' ? options.onOpen : null;
    if (client === 'ok') {
      const fapiAvailable = await ensureOkFapi();
      if (fapiAvailable && okAdReady) return showOkRewarded(onOpen);

      // VK Bridge native ads are supported by OK on Android, so keep this
      // as a fallback when FAPI is unavailable/not prepared there.
      const bridgeResult = await showBridgeRewarded(onOpen);
      if (bridgeResult) return true;

      if (fapiAvailable) prepareOkRewarded();
      return false;
    }
    return showBridgeRewarded(onOpen);
  }

  window.GamePlatform = Object.freeze({
    name: 'vk-ok',
    client,
    init,
    canCloudSave: () => bridgeReady,
    loadState,
    saveState,
    showRewarded,
    onPause(handler) { if (typeof handler === 'function') listeners.pause.add(handler); },
    onResume(handler) { if (typeof handler === 'function') listeners.resume.add(handler); },
    gameReady() {},
    startGameplay() {},
    stopGameplay() {},
    debug() {
      return {
        client,
        bridgeReady,
        okFapiReady,
        okAdReady,
        okAdPreparing,
        okAdPreparedAt
      };
    }
  });
})();