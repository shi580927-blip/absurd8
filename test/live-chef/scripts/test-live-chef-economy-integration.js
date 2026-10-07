const assert=require('node:assert/strict'),createGame=require('./smoke-localization');
(async()=>{
 const time=Date.now();
 const seed={saveVersion:10,economyVersion:1,food:100,total:100,counts:{grandma:10},offlineReserve:120,lastSeen:time-60000,last:time-60000,adBonusUntil:time+100000,care:{bonusUntil:time+100000},milestones:{},milestonePending:[]};
 const h=createGame('en',{save:seed});
 h.run('finishEconomyLoading()');
 const saved=JSON.parse(h.storage.get('absurd8-test-save'));
 assert.ok(saved.food>=310&&saved.food<313);assert.ok(saved.offlineReserve<=60);assert.equal(saved.adBonusUntil,seed.adBonusUntil);
 h.run('finishEconomyLoading()');assert.equal(h.run('state.food'),saved.food,'offline settlement must run once');
 // Same full game, serialized state loaded again: only milliseconds of absence, no fresh reserve.
 const reloaded=createGame('ru',{save:saved});reloaded.run('finishEconomyLoading()');assert.ok(reloaded.run('state.food')<saved.food+1);
 let stamp=0;h.context.performance.now=()=>stamp;
 h.context.document.querySelector=selector=>selector==='.game'?h.get('game'):null;
 h.run('brandIntroFinished=true;gameplayActive=true;economyLastTick=0');
 const reserve=h.run('state.offlineReserve');stamp=1000;h.run('tickEconomy()');assert.equal(h.run('state.offlineReserve'),reserve+2);
 h.run('adRequestPending=true');stamp=2000;h.run('tickEconomy()');assert.equal(h.run('state.offlineReserve'),reserve+2);
 h.run('adRequestPending=false');h.context.document.visibilityState='hidden';stamp=3000;h.run('tickEconomy()');assert.equal(h.run('state.offlineReserve'),reserve+2);
 h.context.document.visibilityState='visible';h.run('platformPaused=true');stamp=4000;h.run('tickEconomy()');assert.equal(h.run('state.offlineReserve'),reserve+2);
 h.run('platformPaused=false;gameplayActive=false');stamp=5000;h.run('tickEconomy()');assert.equal(h.run('state.offlineReserve'),reserve+2);
 // Cloud must be selected before awarding; rejected local reserve must not leak into cloud snapshot.
 const cloud=createGame('en',{test:false,save:{...seed,last:time-100000,offlineReserve:3600}});
 cloud.context.fakePlayer={getData:async()=>({absurd8State:{...seed,food:200,total:200,offlineReserve:60,last:time-30000,lastSeen:time-30000}}),setData:async()=>{}};
 cloud.run('ysdk={getPlayer:async()=>fakePlayer}');await cloud.run('initCloudSave()');cloud.run('finishEconomyLoading()');
 assert.ok(cloud.run('state.food')>=305&&cloud.run('state.food')<308);assert.ok(cloud.run('state.offlineReserve')<=30);
 // Slow cloud cannot replace progressed local state after readiness fallback.
 const late=createGame('ru',{test:false,save:seed});late.run('finishEconomyLoading()');const before=late.run('state.food');
 late.context.fakePlayer={getData:async()=>({absurd8State:{...seed,food:999999,last:Date.now()+100000}}),setData:async()=>{}};
 late.run('ysdk={getPlayer:async()=>fakePlayer}');await late.run('initCloudSave()');assert.equal(late.run('state.food'),before);
 // A v9 snapshot must remain intact and start with zero reserve.
 const old=createGame('ru',{save:{saveVersion:9,food:555,total:200000000,counts:{grandma:3},adTreatUnlocks:[12],last:time-86400000}});old.run('finishEconomyLoading()');assert.equal(old.run('state.food'),555);assert.equal(old.run('state.total'),200000000);assert.equal(old.run('state.offlineReserve'),0);assert.equal(old.run('currentLevel()'),12);
 console.log('Live Chef B integration: actual game save/reload, base-only offline, active/ad/hidden/paused gating, cloud selection/late response, v9 migration PASS');
})().catch(error=>{console.error(error);process.exitCode=1});
