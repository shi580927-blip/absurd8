/* Shared, deterministic balance rules for browser and Node verification. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ChefEconomy=api})(globalThis,()=>{
  const config=Object.freeze({version:1,reserveCapSeconds:3600,reservePerActiveSecond:2,offlineRate:.35,milestones:[.25,.5,.75,1],levelThresholds:[0,100,500,2500,12000,50000,180000,600000,2000000,6000000,18000000,50000000,150000000,450000000]});
  const nonnegative=n=>Number.isFinite(n)?Math.max(0,n):0;
  function level(total){let index=0;config.levelThresholds.forEach((at,i)=>{if(total>=at)index=i});return index}
  function normalize(state,now){
    const legacy=state.economyVersion!==config.version;
    state.offlineReserve=Math.min(config.reserveCapSeconds,nonnegative(state.offlineReserve));
    state.lastSeen=Number.isFinite(state.lastSeen)?state.lastSeen:(Number.isFinite(state.last)?state.last:now);
    state.activePlaySeconds=nonnegative(state.activePlaySeconds);
    state.levelActiveSeconds=state.levelActiveSeconds&&typeof state.levelActiveSeconds==='object'?state.levelActiveSeconds:{};
    state.levelCompletions=Array.isArray(state.levelCompletions)?state.levelCompletions:[];
    state.milestones=state.milestones&&typeof state.milestones==='object'?state.milestones:{};
    state.milestonePending=Array.isArray(state.milestonePending)?state.milestonePending:[];
    if(legacy){
      // New curve never subtracts currency, lifetime earnings, purchases or unlocks.
      // Already-passed checkpoints are marked silently to avoid a migration reward burst.
      for(let i=0;i<config.levelThresholds.length-1;i++)for(const fraction of config.milestones){
        const at=config.levelThresholds[i]+(config.levelThresholds[i+1]-config.levelThresholds[i])*fraction;
        if(state.total>=at)state.milestones[`${i+1}:${fraction}`]=true;
      }
    }
    state.economyVersion=config.version;
    return state;
  }
  function accrue(state,seconds){
    seconds=nonnegative(seconds);const key=String(level(state.total)+1);
    state.offlineReserve=Math.min(config.reserveCapSeconds,state.offlineReserve+seconds*config.reservePerActiveSecond);
    state.activePlaySeconds+=seconds;
    state.levelActiveSeconds[key]=nonnegative(state.levelActiveSeconds[key])+seconds;
  }
  function settleOffline(state,now,baseCps){
    const absence=Math.max(0,(now-state.lastSeen)/1000);
    const seconds=Math.min(absence,state.offlineReserve);
    const gain=seconds*nonnegative(baseCps)*config.offlineRate;
    state.offlineReserve=Math.max(0,state.offlineReserve-seconds);
    state.food+=gain;state.total+=gain;
    state.lastSeen=Math.max(state.lastSeen,now);state.last=now;
    return {absenceSeconds:absence,seconds,gain};
  }
  function checkpoints(state){
    const reached=[];
    for(let i=0;i<config.levelThresholds.length-1;i++)for(const fraction of config.milestones){
      const key=`${i+1}:${fraction}`,at=config.levelThresholds[i]+(config.levelThresholds[i+1]-config.levelThresholds[i])*fraction;
      if(state.total>=at&&!state.milestones[key]){
        state.milestones[key]=true;const entry={key,level:i+1,percent:fraction*100};reached.push(entry);
        state.milestonePending.push(entry);
        if(fraction===1&&!state.levelCompletions.some(x=>x.level===i+1))state.levelCompletions.push({level:i+1,activeSeconds:nonnegative(state.levelActiveSeconds[String(i+1)]),sessionTotalSeconds:state.activePlaySeconds});
      }
    }
    return reached;
  }
  return {config,level,normalize,accrue,settleOffline,checkpoints};
});
