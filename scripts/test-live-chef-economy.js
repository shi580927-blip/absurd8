const assert=require('node:assert/strict'),E=require('../live-chef-economy');
const now=1700000000000;
const fresh=(fields={})=>E.normalize({food:20,total:20,counts:{grandma:2},last:now,...fields},now);
// Migration must preserve actual money, purchases, achievements and unlocks.
const legacy=fresh({food:700,total:200000000,adTreatUnlocks:[12],earnedAchievements:['Первая лапа власти']});
assert.equal(legacy.food,700);assert.equal(legacy.total,200000000);assert.deepEqual(legacy.counts,{grandma:2});assert.deepEqual(legacy.adTreatUnlocks,[12]);assert.equal(legacy.offlineReserve,0);assert.equal(E.checkpoints(legacy).length,0);
const s=fresh();E.accrue(s,60);assert.equal(s.offlineReserve,120);E.accrue(s,2000);assert.equal(s.offlineReserve,3600);
s.lastSeen=now-7200000;const award=E.settleOffline(s,now,10);assert.equal(award.seconds,3600);assert.equal(award.gain,12600);assert.equal(s.offlineReserve,0);
// Save/reload and repeated entrances do not refill the reserve.
const reload=JSON.parse(JSON.stringify(s));E.normalize(reload,now+10000);assert.equal(E.settleOffline(reload,now+10000,10).gain,0);
for(let i=0;i<10;i++)assert.equal(E.settleOffline(reload,now+10000+i*1000,10).gain,0);
const partial=fresh({offlineReserve:120,lastSeen:now-30000});assert.equal(E.settleOffline(partial,now,2).gain,21);assert.equal(partial.offlineReserve,90);
const backwards=fresh({offlineReserve:100,lastSeen:now+10000});assert.equal(E.settleOffline(backwards,now,10).gain,0);assert.equal(backwards.offlineReserve,100);
// Temporary bonus fields cannot affect pure offline settlement.
const boosted=fresh({offlineReserve:60,lastSeen:now-60000,adBonusUntil:now+999999,care:{bonusUntil:now+999999},treatUntil:{0:now+999999}});
assert.equal(E.settleOffline(boosted,now,10).gain,210);
const milestones=fresh({total:0});E.accrue(milestones,30);milestones.total=80;
assert.deepEqual(E.checkpoints(milestones).map(x=>x.percent),[25,50,75]);assert.equal(E.checkpoints(milestones).length,0);
const persisted=JSON.parse(JSON.stringify(milestones));E.normalize(persisted,now);assert.equal(E.checkpoints(persisted).length,0);
persisted.total=100;assert.equal(E.checkpoints(persisted)[0].percent,100);assert.equal(persisted.levelCompletions[0].activeSeconds,30);
assert.equal(E.level(450000000),13);assert.equal(E.level(1e15),13);assert.equal(E.config.levelThresholds.length,14);
const invalid=fresh({offlineReserve:Infinity,activePlaySeconds:NaN});assert.equal(invalid.offlineReserve,0);assert.equal(invalid.activePlaySeconds,0);
console.log('Live Chef B: legacy saves, reserve cap/debit, reload farming, partial/future timestamps, bonus exclusion, milestones/telemetry, 14 levels PASS');
