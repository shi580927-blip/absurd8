const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const code=fs.readFileSync('game.js','utf8');
function harness(){
  const nodes=new Map(),el=id=>{if(!nodes.has(id)){const c=new Set();nodes.set(id,{dataset:{},classList:{add:x=>c.add(x),remove:x=>c.delete(x),contains:x=>c.has(x)},setAttribute(){}})}return nodes.get(id)};
  let now=1000000,callbacks,rewards=0,paused=false,otherPanel=false;
  const context={Date:{now:()=>now},Math,document:{documentElement:el('html'),querySelector(selector){
    if(selector.includes('.game.layout-mode'))return otherPanel||(!selector.includes(':not(#foodShop)')&&el('foodShop').classList.contains('open'))?el('foodShop'):null;
    if(selector==='.shop.open')return el('foodShop').classList.contains('open')?el('foodShop'):null;
    if(selector==='.game')return el('game');return null;
  }},$:el,gameIsPaused:()=>paused,adRequestPending:false,adPlaying:false,ysdk:{adv:{showRewardedVideo:({callbacks:c})=>{callbacks=c}}},
    L:(ru,en)=>ru,lastAdWatch:0,AD_WATCH_COOLDOWN:300000,trackEvent(){},renderAd(){},render(){},save(){},syncPausedTimers(){},playSound(){},
    localStorage:{setItem(){}},pauseGameForAd(){paused=true;context.adPlaying=true},resumeGameAfterAd(){paused=false;context.adPlaying=false;vm.runInContext("EventDirector.end('ad')",context)}};
  vm.createContext(context);
  vm.runInContext(code.slice(code.indexOf('const EVENT_DIRECTOR_CONFIG='),code.indexOf('\nlet chefAnticRunning')),context);
  vm.runInContext(code.slice(code.indexOf('function showRewardedAction('),code.indexOf('\nfunction mainRewardedAdClick')),context);
  return {context,el,run:s=>vm.runInContext(s,context),advance:n=>now+=n,cb:()=>callbacks,reward:()=>rewards,request(){context.reward=()=>rewards++;this.run("showRewardedAction({event:'treat_unlock',sourcePanel:'foodShop',onReward:reward,success:'ok'})")}};
}
for(const outcome of ['reward','cancel','error']){
  const h=harness();h.el('foodShop').classList.add('open');h.request();assert.ok(h.cb(),'food menu must allow requested ad');assert.equal(h.run('EventDirector.activeEvent'),'ad');assert.equal(h.el('foodShop').classList.contains('open'),false);
  h.cb().onOpen();if(outcome==='reward'){h.cb().onRewarded();h.cb().onRewarded()}
  outcome==='error'?h.cb().onError():h.cb().onClose();
  h.cb().onRewarded(); // late callbacks must not grant rewards
  assert.equal(h.reward(),outcome==='reward'?1:0);assert.equal(h.context.adRequestPending,false);assert.equal(h.run('EventDirector.major'),null);assert.ok(h.el('foodShop').classList.contains('open'));
}
for(const major of ['chef-antic','zoomies','level']){const h=harness();h.run(`EventDirector.begin('${major}')`);h.request();assert.equal(h.cb(),undefined);h.run(`EventDirector.end('${major}')`);h.request();assert.ok(h.cb(),'completed scene must permit ad even during scene cooldown')}
for(const antic of ['sleep','groom','sing']){const h=harness();h.run("EventDirector.begin('chef-antic',100)");h.advance(200);assert.equal(h.run('EventDirector.busy()'),true,'animation must retain ownership after nominal duration');h.run("EventDirector.end('chef-antic')");assert.equal(h.run("EventDirector.canStartMajor('zoomies')"),false);h.request();assert.ok(h.cb(),`ad after ${antic}`)}
{const h=harness();h.run("EventDirector.begin('zoomies');EventDirector.end('zoomies')");h.advance(89999);assert.equal(h.run("EventDirector.canStartMajor('chef-antic')"),false);h.advance(1);assert.equal(h.run("EventDirector.canStartMajor('chef-antic')"),true)}
{const h=harness();h.context.ysdk.adv.showRewardedVideo=()=>{throw Error('SDK failure')};h.el('foodShop').classList.add('open');h.request();assert.equal(h.context.adRequestPending,false);assert.equal(h.run('EventDirector.major'),null);assert.ok(h.el('foodShop').classList.contains('open'))}
{const h=harness();h.request();const original=h.cb();h.request();assert.equal(h.cb(),original)}
console.log('Live Chef A: food rewarded, cancellation/errors, exactly-once rewards, locks and cooldowns PASS');
