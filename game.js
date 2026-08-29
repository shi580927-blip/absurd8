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
  {at:500,name:'Диванный аристократ',scale:.96,img:'assets/images/shef-level-3.png'},
  {at:2500,name:'Ресторанный критик',scale:1.04,img:'assets/images/shef-level-4.png'},
  {at:12000,name:'Владелец кухни',scale:.95,img:'assets/images/shef-level-5.png'},
  {at:60000,name:'Рыбный магнат',scale:.98,img:'assets/images/shef-level-6.png'},
  {at:300000,name:'Герцог Диванный',scale:1.28,img:'assets/images/shef-level-7.png'},
  {at:1500000,name:'Лососевый барон',scale:1,img:'assets/images/shef-level-8.png'},
  {at:8000000,name:'Министр полной миски',scale:1.2,img:'assets/images/shef-level-9.png'},
  {at:40000000,name:'Император квартиры',scale:1.14,img:'assets/images/shef-level-10-v2.png'},
  {at:200000000,name:'Кот, купивший Луну',scale:1.1,img:'assets/images/shef-level-11.png'},
  {at:1000000000,name:'Хозяин Вселенной',scale:1.13,img:'assets/images/shef-level-12.png'}
];
const phrases=['Шеф требует второе первое.','Кот не толстый. Он стратегически запасливый.','Эта рыбка была недостаточно амбициозна.','Шеф одобряет. Молча и свысока.','В миске появилось дно. Кто ответит?','Кот съел бюджет. Буквально.','Теперь можно и перекусить.','Работай усерднее. Кот сам себя не накормит.','Уровень мурчания временно повышен.','Рыбка поступила в распоряжение руководства.'];
const achievements=[
  {icon:'🐾',name:'Первая лапа власти',desc:'Заработать 10 рыбов',done:()=>state.total>=10},
  {icon:'🥣',name:'У миски появился бюджет',desc:'Купить «Миску без дна»',done:()=>state.counts.bowl>0},
  {icon:'👵',name:'Бабушка одобрила комплекцию',desc:'Нанять бабушку-кормителя',done:()=>state.counts.grandma>0},
  {icon:'👨‍🍳',name:'Повар подал заявление',desc:'Нанять испуганного повара',done:()=>state.counts.chef>0},
  {icon:'🛵',name:'Рыбы особой срочности',desc:'Купить скоростную доставку',done:()=>state.counts.delivery>0},
  {icon:'👔',name:'Кот вышел в руководство',desc:'Достичь 5 уровня',done:()=>currentLevel()>=4},
  {icon:'💼',name:'Пассивная наглость',desc:'Получать 25 рыбов в секунду',done:()=>cps()>=25},
  {icon:'🏛️',name:'Миска государственного значения',desc:'Получить поддержку министерства',done:()=>state.counts.ministry>0},
  {icon:'💰',name:'Рыбовый миллионер',desc:'Заработать 1 000 000 рыбов',done:()=>state.total>=1000000},
  {icon:'🌌',name:'Вселенная оформлена на кота',desc:'Достичь 12 уровня',done:()=>currentLevel()>=11}
];
const outfits=levels.map((level,index)=>({id:`level-${index+1}`,name:level.name,img:level.img,unlock:index}));
const rooms=[
  'assets/images/rooms/room-stage-1.webp',
  'assets/images/rooms/room-stage-2.webp',
  'assets/images/rooms/room-stage-3.webp',
  'assets/images/rooms/room-stage-4.webp'
];
let state={food:0,total:0,counts:{},sound:true,last:Date.now(),outfit:null};
try{state={...state,...JSON.parse(localStorage.getItem('absurd8-save')||'{}')}}catch(e){}
upgrades.forEach(u=>state.counts[u.id]??=0);
const $=id=>document.getElementById(id);
const format=n=>Math.floor(n).toLocaleString('ru-RU');
const price=u=>Math.floor(u.base*Math.pow(1.55,state.counts[u.id]));
const perClick=()=>1+upgrades.reduce((n,u)=>n+(u.click||0)*state.counts[u.id],0);
const cps=()=>upgrades.reduce((n,u)=>n+(u.cps||0)*state.counts[u.id],0);
function currentLevel(){let i=0;levels.forEach((l,n)=>{if(state.total>=l.at)i=n});return i}
let renderedLevel=currentLevel();
function render(updatePanels=false){
  $('food').textContent=`${format(state.food)} рыбов`; $('perClick').textContent=`+${format(perClick())} рыбов`;
  $('income').textContent=format(cps()); const li=currentLevel();
  if(li>renderedLevel){state.outfit=null;renderedLevel=li;save();updatePanels=true}
  const level=levels[li],next=levels[li+1];
  const roomStage=li>=10?3:li>=8?2:li>=4?1:0;
  document.querySelector('.game').style.setProperty('--room-bg',`url("${rooms[roomStage]}")`);
  $('level').textContent=`${li+1} · ${level.name}`;
  const chosen=outfits.find(o=>o.id===state.outfit&&li>=o.unlock);
  const catImage=chosen?chosen.img:level.img;
  if($('catBody').getAttribute('src')!==catImage)$('catBody').src=catImage;
  $('catBody').style.transform=`scale(${level.scale})`;
  $('levelProgress').style.width=next?`${Math.min(100,(state.total-level.at)/(next.at-level.at)*100)}%`:'100%';
  if(updatePanels)$('upgrades').innerHTML=upgrades.map(u=>`<button class="upgrade ${state.food<price(u)?'locked':''}" data-id="${u.id}"><span class="icon">${u.icon}</span><span><b>${u.name} · ${state.counts[u.id]}</b><small>${u.desc}</small></span><span class="price">🐟 ${format(price(u))}</span></button>`).join('');
  $('bowl').classList.toggle('upgraded',state.counts.bowl>0);
  $('grandmaHelper').classList.toggle('visible',state.counts.grandma>0);
  $('chefHelper').classList.toggle('visible',state.counts.chef>0);
  $('deliveryHelper').classList.toggle('visible',state.counts.delivery>0);
  $('mouseDecor').classList.toggle('visible',state.counts.mouse>0);
  $('boxDecor').classList.toggle('visible',state.counts.box>0);
  $('laserDecor').classList.toggle('visible',state.counts.laser>0);
  if(updatePanels)$('outfits').innerHTML=outfits.map(o=>{const unlocked=li>=o.unlock,active=(chosen?chosen.id:null)===o.id;return `<button class="outfit-card ${unlocked?'':'locked'} ${active?'selected':''}" data-outfit="${o.id}"><img src="${o.img}" alt=""><b>${unlocked?o.name:'Секретный образ'}</b><small>${unlocked?(active?'Надето':'Надеть'):`Откроется на уровне ${o.unlock+1}`}</small></button>`}).join('');
  if(updatePanels)$('achievements').innerHTML=achievements.map(a=>`<article class="achievement ${a.done()?'earned':'locked'}"><span>${a.done()?a.icon:'❔'}</span><div><b>${a.name}</b><small>${a.desc}</small></div><strong>${a.done()?'Получено':'Не открыто'}</strong></article>`).join('');
}
function feed(e){if(document.querySelector('.game').classList.contains('layout-mode'))return;const before=currentLevel();state.food+=perClick();state.total+=perClick();const after=currentLevel();const cat=$('cat'),bowl=$('bowl');cat.classList.add('bop');bowl.classList.add('served');setTimeout(()=>{cat.classList.remove('bop');bowl.classList.remove('served')},180);if(after>before)$('phrase').textContent=`Новый статус: «${levels[after].name}». Шеф ожидал этого раньше.`;else if(Math.random()<.28)$('phrase').textContent=phrases[Math.floor(Math.random()*phrases.length)];const f=document.createElement('span');f.className='floater';f.textContent=`+${format(perClick())} 🐟`;f.style.left=`${e?.clientX||innerWidth/2}px`;f.style.top=`${e?.clientY||innerHeight/2}px`;$('floaters').append(f);setTimeout(()=>f.remove(),850);render(after>before)}
$('cat').addEventListener('click',feed);$('feed').addEventListener('click',feed);
$('cat').addEventListener('contextmenu',e=>e.preventDefault());
const panels=['shop','wardrobe','awards'];
const navButtons=['openFeed','openShop','openWardrobe','openAwards'];
function showPanel(panelId,buttonId){panels.forEach(id=>{$(id).classList.toggle('open',id===panelId);$(id).setAttribute('aria-hidden',id===panelId?'false':'true')});navButtons.forEach(id=>$(id).classList.toggle('active',id===buttonId));if(panelId)render(true)}
$('openFeed').addEventListener('click',()=>showPanel(null,'openFeed'));
$('openShop').addEventListener('click',()=>showPanel('shop','openShop'));
$('closeShop').addEventListener('click',()=>showPanel(null,'openFeed'));
$('openWardrobe').addEventListener('click',()=>showPanel('wardrobe','openWardrobe'));
$('closeWardrobe').addEventListener('click',()=>showPanel(null,'openFeed'));
$('openAwards').addEventListener('click',()=>showPanel('awards','openAwards'));
$('closeAwards').addEventListener('click',()=>showPanel(null,'openFeed'));
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
const layoutItems=[...document.querySelectorAll('.layout-item')];
const layoutStage=document.querySelector('.helper-stage');
function layoutProfile(){if(innerWidth>=1100)return'desktop';if(innerWidth>=760)return'tablet';if(innerWidth<=390)return'mobile-small';return'mobile-large'}
const layoutKey=()=>`absurd8-layout-v3-${layoutProfile()}`;
const defaultLayouts={
  desktop:{grandmaHelper:{left:8.31,top:1.71,width:24.09},mouseDecor:{left:85.34,top:54.99,width:12.82},boxDecor:{left:67.79,top:68,width:30.04},chefHelper:{left:60.79,top:6.81,width:36.33},deliveryHelper:{left:.46,top:52.87,width:26.2},laserDecor:{left:34.28,top:95.06,width:1.74},cat:{dx:-1.61,dy:2.92,scale:1},bowl:{dx:-.08,dy:.31,scale:1}},
  tablet:{grandmaHelper:{left:7.39,top:15.85,width:24.09},mouseDecor:{left:85.34,top:54.99,width:12.82},boxDecor:{left:67.8,top:75.84,width:30.04},chefHelper:{left:61.16,top:17.49,width:36.33},deliveryHelper:{left:0,top:53.93,width:30.22},laserDecor:{left:34.28,top:93.7,width:1.74},cat:{dx:-1.61,dy:2.92,scale:1},bowl:{dx:1.49,dy:.55,scale:1}},
  'mobile-small':{cat:{dx:-5.96,dy:7.75,scale:.7},bowl:{dx:-.3,dy:-1.17,scale:.7},mouseDecor:{left:85.85,top:58.69,width:12.82},boxDecor:{left:67.96,top:70.65,width:32.04},chefHelper:{left:59.68,top:29.64,width:40.32},grandmaHelper:{left:1.73,top:26.46,width:26.08},deliveryHelper:{left:0,top:66.93,width:34.2},laserDecor:{left:34.28,top:93.7,width:1.74}},
  'mobile-large':{cat:{dx:-2,dy:6.52,scale:.82},bowl:{dx:.76,dy:1.9,scale:.88},grandmaHelper:{left:0,top:19.31,width:28.85},chefHelper:{left:64.5,top:27.11,width:35.47},boxDecor:{left:77.76,top:68.64,width:23.43},mouseDecor:{left:85.85,top:58.69,width:12.82},deliveryHelper:{left:0,top:66.93,width:34.2},laserDecor:{left:34.28,top:93.7,width:1.74}}
};
let selectedLayoutItem=null;
function readLayout(){const profile=layoutProfile();try{return {...defaultLayouts[profile],...JSON.parse(localStorage.getItem(layoutKey())||'{}')}}catch(e){return {...defaultLayouts[profile]}}}
function applyLayout(){const saved=readLayout();layoutItems.forEach(item=>{const pos=saved[item.id];if(!pos)return;if(item.dataset.layoutMode==='offset'){item.style.setProperty('--layout-x',`${pos.dx||0}vw`);item.style.setProperty('--layout-y',`${pos.dy||0}dvh`);item.style.setProperty('--layout-scale',pos.scale||1);return}item.style.left=`${pos.left}%`;item.style.top=`${pos.top}%`;item.style.right='auto';item.style.bottom='auto';item.style.width=`${pos.width}%`;item.style.height=item.id==='laserDecor'?`${pos.width}%`:'auto'})}
function saveLayoutItem(item){const saved=readLayout();if(item.dataset.layoutMode==='offset'){saved[item.id]={dx:+(parseFloat(item.style.getPropertyValue('--layout-x'))||0).toFixed(2),dy:+(parseFloat(item.style.getPropertyValue('--layout-y'))||0).toFixed(2),scale:+(parseFloat(item.style.getPropertyValue('--layout-scale'))||1).toFixed(2)}}else{const stageRect=layoutStage.getBoundingClientRect(),rect=item.getBoundingClientRect();saved[item.id]={left:+((rect.left-stageRect.left)/stageRect.width*100).toFixed(2),top:+((rect.top-stageRect.top)/stageRect.height*100).toFixed(2),width:+(rect.width/stageRect.width*100).toFixed(2)}}localStorage.setItem(layoutKey(),JSON.stringify(saved))}
function selectLayoutItem(item){selectedLayoutItem=item;layoutItems.forEach(x=>x.classList.toggle('selected-layout',x===item));$('layoutStatus').textContent=item?item.dataset.layoutName:'перетащите объект'}
function setLayoutMode(on){document.querySelector('.game').classList.toggle('layout-mode',on);$('layoutTools').setAttribute('aria-hidden',on?'false':'true');if(!on)selectLayoutItem(null)}
$('layoutToggle').addEventListener('click',()=>setLayoutMode(!document.querySelector('.game').classList.contains('layout-mode')));
$('closeLayout').addEventListener('click',()=>setLayoutMode(false));
layoutItems.forEach(item=>item.addEventListener('pointerdown',e=>{if(!document.querySelector('.game').classList.contains('layout-mode'))return;e.preventDefault();e.stopPropagation();selectLayoutItem(item);item.setPointerCapture(e.pointerId);const stageRect=layoutStage.getBoundingClientRect(),itemRect=item.getBoundingClientRect(),startX=e.clientX,startY=e.clientY,startDx=parseFloat(item.style.getPropertyValue('--layout-x'))||0,startDy=parseFloat(item.style.getPropertyValue('--layout-y'))||0,grabX=e.clientX-itemRect.left,grabY=e.clientY-itemRect.top;const move=ev=>{if(item.dataset.layoutMode==='offset'){const dx=startDx+(ev.clientX-startX)/innerWidth*100,dy=startDy+(ev.clientY-startY)/innerHeight*100;item.style.setProperty('--layout-x',`${dx}vw`);item.style.setProperty('--layout-y',`${dy}dvh`);$('layoutStatus').textContent=`${item.dataset.layoutName}: ${Math.round(dx)}, ${Math.round(dy)}`;return}const rect=item.getBoundingClientRect(),left=Math.max(0,Math.min(stageRect.width-rect.width,ev.clientX-stageRect.left-grabX)),top=Math.max(0,Math.min(stageRect.height-rect.height,ev.clientY-stageRect.top-grabY));item.style.left=`${left/stageRect.width*100}%`;item.style.top=`${top/stageRect.height*100}%`;item.style.right='auto';item.style.bottom='auto';$('layoutStatus').textContent=`${item.dataset.layoutName}: ${Math.round(left/stageRect.width*100)}%, ${Math.round(top/stageRect.height*100)}%`};const done=()=>{item.removeEventListener('pointermove',move);saveLayoutItem(item)};item.addEventListener('pointermove',move);item.addEventListener('pointerup',done,{once:true});item.addEventListener('pointercancel',done,{once:true})}));
function resizeSelected(delta){if(!selectedLayoutItem)return;if(selectedLayoutItem.dataset.layoutMode==='offset'){const current=parseFloat(selectedLayoutItem.style.getPropertyValue('--layout-scale'))||1,next=Math.max(.5,Math.min(1.4,current+delta/20));selectedLayoutItem.style.setProperty('--layout-scale',next);saveLayoutItem(selectedLayoutItem);$('layoutStatus').textContent=`${selectedLayoutItem.dataset.layoutName}: размер ${Math.round(next*100)}%`;return}const stageWidth=layoutStage.getBoundingClientRect().width,current=selectedLayoutItem.getBoundingClientRect().width/stageWidth*100,next=Math.max(3,Math.min(55,current+delta));selectedLayoutItem.style.width=`${next}%`;selectedLayoutItem.style.height=selectedLayoutItem.id==='laserDecor'?`${next}%`:'auto';saveLayoutItem(selectedLayoutItem);$('layoutStatus').textContent=`${selectedLayoutItem.dataset.layoutName}: размер ${Math.round(next)}%`}
$('sizeDown').addEventListener('click',()=>resizeSelected(-2));$('sizeUp').addEventListener('click',()=>resizeSelected(2));
$('nextLayout').addEventListener('click',()=>{const next=layoutItems[(Math.max(-1,layoutItems.indexOf(selectedLayoutItem))+1)%layoutItems.length];selectLayoutItem(next);next.scrollIntoView({block:'center',inline:'center'})});
$('centerLayout').addEventListener('click',()=>{if(!selectedLayoutItem)return;if(selectedLayoutItem.dataset.layoutMode==='offset'){selectedLayoutItem.style.setProperty('--layout-x','0vw');selectedLayoutItem.style.setProperty('--layout-y','0dvh')}else{const rect=selectedLayoutItem.getBoundingClientRect(),stage=layoutStage.getBoundingClientRect();selectedLayoutItem.style.left=`${Math.max(0,(stage.width-rect.width)/2)/stage.width*100}%`;selectedLayoutItem.style.top=`${Math.max(0,(stage.height-rect.height)/2)/stage.height*100}%`;selectedLayoutItem.style.right='auto';selectedLayoutItem.style.bottom='auto'}saveLayoutItem(selectedLayoutItem);$('layoutStatus').textContent=`${selectedLayoutItem.dataset.layoutName}: перемещено в центр`});
$('copyLayout').addEventListener('click',async()=>{const value=JSON.stringify({device:layoutProfile(),positions:readLayout()},null,2);try{await navigator.clipboard.writeText(value);$('layoutStatus').textContent='координаты и размеры скопированы'}catch(e){prompt('Скопируйте координаты:',value)}});
$('resetLayout').addEventListener('click',()=>{localStorage.removeItem(layoutKey());layoutItems.forEach(item=>{['left','top','right','bottom','width','height'].forEach(prop=>item.style.removeProperty(prop));['--layout-x','--layout-y','--layout-scale'].forEach(prop=>item.style.removeProperty(prop))});applyLayout();selectLayoutItem(null);$('layoutStatus').textContent='возвращена стандартная расстановка'});
function save(){state.last=Date.now();localStorage.setItem('absurd8-save',JSON.stringify(state))}
const away=Math.min(4*3600,Math.max(0,(Date.now()-(state.last||Date.now()))/1000));if(away>10&&cps()>0){const bonus=Math.floor(away*cps());state.food+=bonus;state.total+=bonus;$('phrase').textContent=`Пока тебя не было, Шеф получил ${format(bonus)} рыбов.`}
setInterval(()=>{const gain=cps()/10;state.food+=gain;state.total+=gain;render()},100);setInterval(save,5000);addEventListener('beforeunload',save);render(true);applyLayout();scheduleRoomEvent(true);
