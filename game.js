const upgrades = [
  {id:'bowl', icon:'🥣', name:'Миска без дна', desc:'+1 рыбка за нажатие', base:25, click:1},
  {id:'grandma', icon:'👵', name:'Бабушка-кормитель', desc:'+1 рыбка в секунду', base:60, cps:1},
  {id:'chef', icon:'👨‍🍳', name:'Повар, боящийся кота', desc:'+5 рыбок в секунду', base:260, cps:5},
  {id:'delivery', icon:'🛵', name:'Доставка со скоростью света', desc:'+20 рыбок в секунду', base:1100, cps:20},
  {id:'ministry', icon:'🏛️', name:'Министерство кошачьей еды', desc:'+100 рыбок в секунду', base:6000, cps:100}
];
const levels=[
  {at:0,name:'Голодный стратег',scale:1}, {at:100,name:'Кот с личной миской',scale:1.05},
  {at:500,name:'Диванный аристократ',scale:1.12}, {at:2500,name:'Ресторанный критик',scale:1.2},
  {at:12000,name:'Владелец кухни',scale:1.3}, {at:60000,name:'Кот, купивший Луну',scale:1.42}
];
const phrases=['Шеф требует второе первое.','Кот не толстый. Он стратегически запасливый.','Эта рыбка была недостаточно амбициозна.','Шеф одобряет. Молча и свысока.','В миске появилось дно. Кто ответит?','Кот съел бюджет. Буквально.','Теперь можно и перекусить.','Работай усерднее. Кот сам себя не накормит.','Уровень мурчания временно повышен.','Рыбка поступила в распоряжение руководства.'];
let state={food:0,total:0,counts:{},sound:true,last:Date.now()};
try{state={...state,...JSON.parse(localStorage.getItem('absurd8-save')||'{}')}}catch(e){}
upgrades.forEach(u=>state.counts[u.id]??=0);
const $=id=>document.getElementById(id);
const format=n=>Math.floor(n).toLocaleString('ru-RU');
const price=u=>Math.floor(u.base*Math.pow(1.55,state.counts[u.id]));
const perClick=()=>1+upgrades.reduce((n,u)=>n+(u.click||0)*state.counts[u.id],0);
const cps=()=>upgrades.reduce((n,u)=>n+(u.cps||0)*state.counts[u.id],0);
function currentLevel(){let i=0;levels.forEach((l,n)=>{if(state.total>=l.at)i=n});return i}
function render(){
  $('food').textContent=`${format(state.food)} рыбок`; $('perClick').textContent=`+${format(perClick())} рыбок`;
  $('income').textContent=format(cps()); const li=currentLevel(),level=levels[li],next=levels[li+1];
  $('level').textContent=`${li+1} · ${level.name}`; $('catBody').style.transform=`scale(${level.scale})`;
  $('levelProgress').style.width=next?`${Math.min(100,(state.total-level.at)/(next.at-level.at)*100)}%`:'100%';
  $('upgrades').innerHTML=upgrades.map(u=>`<button class="upgrade" data-id="${u.id}" ${state.food<price(u)?'disabled':''}><span class="icon">${u.icon}</span><span><b>${u.name} · ${state.counts[u.id]}</b><small>${u.desc}</small></span><span class="price">🐟 ${format(price(u))}</span></button>`).join('');
}
function feed(e){state.food+=perClick();state.total+=perClick();const cat=$('cat');cat.classList.add('bop');setTimeout(()=>cat.classList.remove('bop'),100);if(Math.random()<.28)$('phrase').textContent=phrases[Math.floor(Math.random()*phrases.length)];const f=document.createElement('span');f.className='floater';f.textContent=`+${format(perClick())} 🐟`;f.style.left=`${e?.clientX||innerWidth/2}px`;f.style.top=`${e?.clientY||innerHeight/2}px`;$('floaters').append(f);setTimeout(()=>f.remove(),850);render()}
$('cat').addEventListener('click',feed);$('feed').addEventListener('click',feed);
$('cat').addEventListener('contextmenu',e=>e.preventDefault());
$('openShop').addEventListener('click',()=>{$('shop').classList.add('open');$('shop').setAttribute('aria-hidden','false')});
$('closeShop').addEventListener('click',()=>{$('shop').classList.remove('open');$('shop').setAttribute('aria-hidden','true')});
$('upgrades').addEventListener('click',e=>{const b=e.target.closest('.upgrade');if(!b)return;const u=upgrades.find(x=>x.id===b.dataset.id),p=price(u);if(state.food>=p){state.food-=p;state.counts[u.id]++;$('phrase').textContent=`Куплено: «${u.name}». Бухгалтер плачет.`;render()}});
$('sound').addEventListener('click',()=>{state.sound=!state.sound;$('sound').textContent=state.sound?'🔊':'🔇';save()});
function save(){state.last=Date.now();localStorage.setItem('absurd8-save',JSON.stringify(state))}
const away=Math.min(4*3600,Math.max(0,(Date.now()-(state.last||Date.now()))/1000));if(away>10&&cps()>0){const bonus=Math.floor(away*cps());state.food+=bonus;state.total+=bonus;$('phrase').textContent=`Пока тебя не было, Шеф получил ${format(bonus)} рыбок.`}
setInterval(()=>{const gain=cps()/10;state.food+=gain;state.total+=gain;render()},100);setInterval(save,5000);addEventListener('beforeunload',save);render();
