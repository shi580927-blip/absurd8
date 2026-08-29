const upgrades = [
  {id:'bowl', icon:'🥣', name:'Миска без дна', desc:'+1 рыбов за нажатие', base:25, click:1},
  {id:'grandma', icon:'👵', name:'Бабушка-кормитель', desc:'+1 рыбов в секунду', base:60, cps:1},
  {id:'chef', icon:'👨‍🍳', name:'Повар, боящийся кота', desc:'+5 рыбов в секунду', base:260, cps:5},
  {id:'delivery', icon:'🛵', name:'Доставка со скоростью света', desc:'+20 рыбов в секунду', base:1100, cps:20},
  {id:'ministry', icon:'🏛️', name:'Министерство кошачьей еды', desc:'+100 рыбов в секунду', base:6000, cps:100},
  {id:'laser', icon:'🔴', name:'Лазерная точка с амбициями', desc:'+3 рыбов за нажатие', base:180, click:3},
  {id:'mouse', icon:'🐭', name:'Мышь на удалённой работе', desc:'+12 рыбов в секунду', base:720, cps:12},
  {id:'box', icon:'📦', name:'Коробка дороже квартиры', desc:'+250 рыбов в секунду', base:18000, cps:250}
];
const levels=[
  {at:0,name:'Голодный стратег',scale:.88,img:'assets/images/shef-level-1.png'},
  {at:100,name:'Кот с личной миской',scale:.94,img:'assets/images/shef-level-2.png'},
  {at:500,name:'Диванный аристократ',scale:.98,img:'assets/images/shef-level-3.png'},
  {at:2500,name:'Ресторанный критик',scale:1.02,img:'assets/images/shef-level-4.png'},
  {at:12000,name:'Владелец кухни',scale:1.06,img:'assets/images/shef-level-5.png'},
  {at:60000,name:'Рыбный магнат',scale:1.09,img:'assets/images/shef-level-6.png'},
  {at:300000,name:'Герцог Диванный',scale:1.12,img:'assets/images/shef-level-7.png'},
  {at:1500000,name:'Лососевый барон',scale:1.15,img:'assets/images/shef-level-8.png'},
  {at:8000000,name:'Министр полной миски',scale:1.18,img:'assets/images/shef-level-9.png'},
  {at:40000000,name:'Император квартиры',scale:1.21,img:'assets/images/shef-level-10.png'},
  {at:200000000,name:'Кот, купивший Луну',scale:1.24,img:'assets/images/shef-level-11.png'},
  {at:1000000000,name:'Хозяин Вселенной',scale:1.27,img:'assets/images/shef-level-12.png'}
];
const phrases=['Шеф требует второе первое.','Кот не толстый. Он стратегически запасливый.','Эта рыбка была недостаточно амбициозна.','Шеф одобряет. Молча и свысока.','В миске появилось дно. Кто ответит?','Кот съел бюджет. Буквально.','Теперь можно и перекусить.','Работай усерднее. Кот сам себя не накормит.','Уровень мурчания временно повышен.','Рыбка поступила в распоряжение руководства.'];
const outfits=levels.map((level,index)=>({id:`level-${index+1}`,name:level.name,img:level.img,unlock:index}));
let state={food:0,total:0,counts:{},sound:true,last:Date.now(),outfit:null};
try{state={...state,...JSON.parse(localStorage.getItem('absurd8-save')||'{}')}}catch(e){}
upgrades.forEach(u=>state.counts[u.id]??=0);
const $=id=>document.getElementById(id);
const format=n=>Math.floor(n).toLocaleString('ru-RU');
const price=u=>Math.floor(u.base*Math.pow(1.55,state.counts[u.id]));
const perClick=()=>1+upgrades.reduce((n,u)=>n+(u.click||0)*state.counts[u.id],0);
const cps=()=>upgrades.reduce((n,u)=>n+(u.cps||0)*state.counts[u.id],0);
function currentLevel(){let i=0;levels.forEach((l,n)=>{if(state.total>=l.at)i=n});return i}
function render(updatePanels=false){
  $('food').textContent=`${format(state.food)} рыбов`; $('perClick').textContent=`+${format(perClick())} рыбов`;
  $('income').textContent=format(cps()); const li=currentLevel(),level=levels[li],next=levels[li+1];
  $('level').textContent=`${li+1} · ${level.name}`;
  const chosen=outfits.find(o=>o.id===state.outfit&&li>=o.unlock);
  const catImage=chosen?chosen.img:level.img;
  if($('catBody').getAttribute('src')!==catImage)$('catBody').src=catImage;
  $('catBody').style.transform=`scale(${level.scale})`;
  $('levelProgress').style.width=next?`${Math.min(100,(state.total-level.at)/(next.at-level.at)*100)}%`:'100%';
  if(updatePanels)$('upgrades').innerHTML=upgrades.map(u=>`<button class="upgrade ${state.food<price(u)?'locked':''}" data-id="${u.id}"><span class="icon">${u.icon}</span><span><b>${u.name} · ${state.counts[u.id]}</b><small>${u.desc}</small></span><span class="price">🐟 ${format(price(u))}</span></button>`).join('');
  $('grandmaHelper').classList.toggle('visible',state.counts.grandma>0);
  $('chefHelper').classList.toggle('visible',state.counts.chef>0);
  $('deliveryHelper').classList.toggle('visible',state.counts.delivery>0);
  $('bowl').classList.toggle('upgraded',state.counts.bowl>0);
  $('grandmaHelper').dataset.tier=state.counts.grandma>=10?'3':state.counts.grandma>=5?'2':'1';
  $('chefHelper').dataset.tier=state.counts.chef>=10?'3':state.counts.chef>=5?'2':'1';
  if(updatePanels)$('outfits').innerHTML=outfits.map(o=>{const unlocked=li>=o.unlock,active=(chosen?chosen.id:null)===o.id;return `<button class="outfit-card ${unlocked?'':'locked'} ${active?'selected':''}" data-outfit="${o.id}"><img src="${o.img}" alt=""><b>${unlocked?o.name:'Секретный образ'}</b><small>${unlocked?(active?'Надето':'Надеть'):`Откроется на уровне ${o.unlock+1}`}</small></button>`}).join('');
}
function feed(e){const before=currentLevel();state.food+=perClick();state.total+=perClick();const after=currentLevel();const cat=$('cat'),bowl=$('bowl');cat.classList.add('bop');bowl.classList.add('served');setTimeout(()=>{cat.classList.remove('bop');bowl.classList.remove('served')},180);if(after>before)$('phrase').textContent=`Новый статус: «${levels[after].name}». Шеф ожидал этого раньше.`;else if(Math.random()<.28)$('phrase').textContent=phrases[Math.floor(Math.random()*phrases.length)];const f=document.createElement('span');f.className='floater';f.textContent=`+${format(perClick())} 🐟`;f.style.left=`${e?.clientX||innerWidth/2}px`;f.style.top=`${e?.clientY||innerHeight/2}px`;$('floaters').append(f);setTimeout(()=>f.remove(),850);render(after>before)}
$('cat').addEventListener('click',feed);$('feed').addEventListener('click',feed);
$('cat').addEventListener('contextmenu',e=>e.preventDefault());
$('openShop').addEventListener('click',()=>{render(true);$('wardrobe').classList.remove('open');$('shop').classList.add('open');$('shop').setAttribute('aria-hidden','false')});
$('closeShop').addEventListener('click',()=>{$('shop').classList.remove('open');$('shop').setAttribute('aria-hidden','true')});
$('openWardrobe').addEventListener('click',()=>{render(true);$('shop').classList.remove('open');$('wardrobe').classList.add('open');$('wardrobe').setAttribute('aria-hidden','false')});
$('closeWardrobe').addEventListener('click',()=>{$('wardrobe').classList.remove('open');$('wardrobe').setAttribute('aria-hidden','true')});
$('outfits').addEventListener('click',e=>{const card=e.target.closest('.outfit-card');if(!card)return;const outfit=outfits.find(o=>o.id===card.dataset.outfit);if(currentLevel()<outfit.unlock){$('phrase').textContent='Шеф ещё не заслужил этот наряд. Хотя он с этим не согласен.';return}state.outfit=outfit.id;$('phrase').textContent=`Шеф выбрал: «${outfit.name}». Публика может аплодировать.`;save();render(true)});
$('upgrades').addEventListener('click',e=>{const b=e.target.closest('.upgrade');if(!b)return;const u=upgrades.find(x=>x.id===b.dataset.id),p=price(u);if(state.food>=p){state.food-=p;state.counts[u.id]++;const message=`Куплено: «${u.name}» · уровень ${state.counts[u.id]}.`;$('phrase').textContent=message;$('shopMessage').textContent=message;$('shopMessage').className='panel-message success';save();render(true);if((u.id==='grandma'||u.id==='chef')&&state.counts[u.id]===1){$('shop').classList.remove('open');$('shop').setAttribute('aria-hidden','true')}}else{const message=`Не хватает ${format(p-state.food)} рыбов.`;$('phrase').textContent=message;$('shopMessage').textContent=message;$('shopMessage').className='panel-message warning';b.classList.add('nope');setTimeout(()=>b.classList.remove('nope'),300)}});
$('roomEvent').addEventListener('click',()=>{const toy=$('roomEvent');if(!toy.classList.contains('show'))return;const reward=Math.max(10,perClick()*12);state.food+=reward;state.total+=reward;$('phrase').textContent=toy.dataset.phrase;toy.classList.remove('show');save();render();scheduleRoomEvent()});
$('roomEvent').addEventListener('contextmenu',e=>e.preventDefault());
const roomEvents=[
  {img:'assets/images/events/yarn.png',phrase:'Клубок обезврежен. Он слишком много знал.'},
  {img:'assets/images/events/mouse.png',phrase:'Мышь внесла добровольный взнос и скрылась.'},
  {img:'assets/images/events/slipper.png',phrase:'Найден тапок. Второй объявлен в розыск.'},
  {img:'assets/images/events/feather.png',phrase:'Перо поймано. Шеф утверждает, что это была охота.'},
  {img:'assets/images/events/fish.png',phrase:'Рыбка сама пришла устраиваться на работу.'}
];
let roomEventTimer;
function scheduleRoomEvent(first=false){clearTimeout(roomEventTimer);roomEventTimer=setTimeout(()=>{const event=roomEvents[Math.floor(Math.random()*roomEvents.length)],toy=$('roomEvent');toy.innerHTML=`<img src="${event.img}" alt="">`;toy.dataset.phrase=event.phrase;toy.style.setProperty('--event-x',`${12+Math.random()*72}%`);toy.style.setProperty('--event-y',`${30+Math.random()*38}%`);toy.classList.add('show');setTimeout(()=>{if(toy.classList.contains('show')){toy.classList.remove('show');scheduleRoomEvent()}},9000)},first?5000:18000+Math.random()*18000)}
$('sound').addEventListener('click',()=>{state.sound=!state.sound;$('sound').textContent=state.sound?'🔊':'🔇';save()});
function save(){state.last=Date.now();localStorage.setItem('absurd8-save',JSON.stringify(state))}
const away=Math.min(4*3600,Math.max(0,(Date.now()-(state.last||Date.now()))/1000));if(away>10&&cps()>0){const bonus=Math.floor(away*cps());state.food+=bonus;state.total+=bonus;$('phrase').textContent=`Пока тебя не было, Шеф получил ${format(bonus)} рыбов.`}
setInterval(()=>{const gain=cps()/10;state.food+=gain;state.total+=gain;render()},100);setInterval(save,5000);addEventListener('beforeunload',save);render(true);scheduleRoomEvent(true);
