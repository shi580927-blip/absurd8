// Transparent scenarios, not a prediction of real player behaviour.
const fs=require('fs'),vm=require('vm'),E=require('../live-chef-economy');
const code=fs.readFileSync('game.js','utf8'),context={};vm.createContext(context);vm.runInContext(code.slice(0,code.indexOf('const levels=')),context);const upgrades=vm.runInContext('upgrades',context);
const scenarios=[{clicks:1,boost:1,name:'1 tap/s, no ads'},{clicks:2,boost:1,name:'2 taps/s, no ads'},{clicks:2,boost:1.5,name:'2 taps/s, average x1.5'}];
for(const scenario of scenarios){
 let fish=0,total=0;const counts=Object.fromEntries(upgrades.map(x=>[x.id,0])),entered=[0];
 const helperList=upgrades.filter(x=>x.cps);
 for(let second=1;second<=36*3600;second++){
  const cps=helperList.reduce((sum,x)=>sum+x.cps*counts[x.id],0),click=1+upgrades.reduce((sum,x)=>sum+(x.click||0)*counts[x.id],0);
  const gain=(cps+click*scenario.clicks)*scenario.boost;fish+=gain;total+=gain;
  // Once per ten seconds buy the most efficient affordable helper.
  if(second%10===0){const choices=helperList.map(x=>({x,cost:Math.floor(x.base*1.55**counts[x.id])})).filter(x=>x.cost<=fish).sort((a,b)=>a.cost/a.x.cps-b.cost/b.x.cps);if(choices.length){fish-=choices[0].cost;counts[choices[0].x.id]++}}
  const index=E.level(total);while(entered.length<=index)entered.push(second);
  if(index===13)break;
 }
 console.log(JSON.stringify({scenario:scenario.name,level:E.level(total)+1,activeHours:Number((entered[13]/3600).toFixed(2))||null,levelEntryMinutes:entered.map(x=>Number((x/60).toFixed(1))),finalCps:helperList.reduce((sum,x)=>sum+x.cps*counts[x.id],0)}));
}
