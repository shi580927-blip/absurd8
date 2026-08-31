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
  {at:0,name:'Голодный стратег',scale:.84,img:'assets/images/cat-level-01.png'},
  {at:100,name:'Кот с личной миской',scale:1,filter:'brightness(1.09) saturate(1.03)',img:'assets/images/cat-level-02.png'},
  {at:500,name:'Диванный аристократ',scale:1,img:'assets/images/cat-level-03.png'},
  {at:2500,name:'Ресторанный критик',scale:1,img:'assets/images/cat-level-04.png'},
  {at:12000,name:'Хозяин недвижимости',scale:1,img:'assets/images/cat-level-05.png'},
  {at:60000,name:'Рыбный магнат',scale:1,img:'assets/images/cat-level-06.png'},
  {at:300000,name:'Его Рыбное Величество',scale:1,img:'assets/images/cat-level-07.png'},
  {at:1500000,name:'Лососевый барон',scale:1,img:'assets/images/cat-level-08.png'},
  {at:8000000,name:'Министр полной миски',scale:1,img:'assets/images/cat-level-09.png'},
  {at:40000000,name:'Император квартиры',scale:1,img:'assets/images/cat-level-10.png?v=20260831-2'},
  {at:200000000,name:'Кот, купивший Луну',scale:1,img:'assets/images/cat-level-11.png'},
  {at:1000000000,name:'Хозяин Вселенной',scale:1,img:'assets/images/cat-level-12.png'},
  {at:5000000000,name:'Шефу пора отдохнуть',scale:1,img:'assets/images/cat-level-13.png'},
  {at:25000000000,name:'Шеф наконец наелся',scale:1,img:'assets/images/cat-level-14.png'}
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
  {icon:'🌌',name:'Вселенная оформлена на кота',desc:'Достичь 12 уровня',done:()=>currentLevel()>=11},
  {icon:'😴',name:'Можно и подремлю',desc:'Наконец накормить Шефа',done:()=>currentLevel()>=13}
];
const outfits=levels.map((level,index)=>({id:`level-${index+1}`,name:level.name,img:level.img,scale:level.scale,filter:level.filter||'',unlock:index}));
const rooms=[
  'assets/images/rooms/room-stage-1.webp',
  'assets/images/rooms/room-stage-2.webp',
  'assets/images/rooms/room-stage-3.webp',
  'assets/images/rooms/room-stage-4.webp'
];
const bowlImages=[
  'assets/images/bowl-empty.png',
  'assets/images/bowl-stage-2.png',
  'assets/images/bowl-stage-3.png',
  'assets/images/bowl-stage-4.png',
  'assets/images/bowl-stage-5.png',
  'assets/images/bowl-stage-6.png',
  'assets/images/bowl-stage-7.png',
  'assets/images/bowl-stage-8.png',
  'assets/images/bowl-stage-9.png'
];
const carpetFood=[
  {img:4,name:'Икра для важных переговоров',minutes:3,cost:14,x:3,y:68,w:13},
  {img:16,name:'Стратегический запас консервов',minutes:4,cost:20,x:82,y:69,w:13},
  {img:12,name:'Консерва особой важности',minutes:4,cost:24,x:15,y:76,w:12},
  {img:11,name:'Дорада по высшему разряду',minutes:5,cost:32,x:70,y:77,w:16},
  {img:6,name:'Парадная курица',minutes:5,cost:38,x:2,y:52,w:14},
  {img:10,name:'Большая рыбная тарелка',minutes:6,cost:48,x:85,y:53,w:12},
  {img:3,name:'Фиолетовая консерва',minutes:4,cost:28,x:24,y:66,w:11},
  {img:8,name:'Лосось для руководства',minutes:6,cost:60,x:63,y:65,w:14},
  {img:9,name:'Фуршет «Девять жизней»',minutes:7,cost:75,x:40,y:74,w:13}
];
let state={saveVersion:6,food:0,total:0,counts:{},helperUntil:{},treatUntil:{},earnedAchievements:null,music:true,sfx:true,last:Date.now(),outfit:null,care:null,adBonusUntil:0};
try{state={...state,...JSON.parse(localStorage.getItem('absurd8-save')||'{}')}}catch(e){}
upgrades.forEach(u=>state.counts[u.id]??=0);
state.helperUntil??={};
state.treatUntil??={};
if((state.saveVersion||0)<3&&state.counts.ministry>0)state.helperUntil.ministry=Date.now()+15*60*1000;
if((state.saveVersion||0)<4&&state.counts.mouse>0)state.helperUntil.mouse=Date.now()+5*60*1000;
if((state.saveVersion||0)<5&&state.counts.laser>0)state.helperUntil.laser=Date.now()+5*60*1000;
if((state.saveVersion||0)<6&&state.counts.box>0)state.helperUntil.box=Date.now()+10*60*1000;
if(typeof state.music!=='boolean')state.music=state.sound!==false;
if(typeof state.sfx!=='boolean')state.sfx=state.sound!==false;
state.saveVersion=6;
const freshCare={hunger:82,mood:78,rest:80,last:Date.now(),nextRequest:Date.now(),request:null,bonusUntil:0};
state.care={...freshCare,...(state.care||{})};
if(state.artVersion!==2){state.outfit=null;state.artVersion=2}
const $=id=>document.getElementById(id);
$('foodDecor').innerHTML=carpetFood.map((item,index)=>`<img id="foodProp${index+1}" data-layout-name="Еда ${index+1}" class="food-prop layout-item" src="assets/images/food-${item.img}.png" style="left:${item.x}%;top:${item.y}%;width:${item.w}%" alt="">`).join('');
const format=n=>Math.floor(n).toLocaleString('ru-RU');
const price=u=>Math.floor(u.base*Math.pow(1.55,state.counts[u.id]));
const boostMultiplier=()=>Math.max(state.care.bonusUntil>Date.now()?2:1,state.adBonusUntil>Date.now()?3:1);
const rawPerClick=()=>1+upgrades.reduce((n,u)=>n+(u.click||0)*state.counts[u.id],0);
const perClick=()=>Math.floor(rawPerClick()*boostMultiplier());
const treatPrice=treat=>Math.max(12,Math.floor(rawPerClick()*treat.cost));
const cps=()=>upgrades.reduce((n,u)=>n+(u.cps||0)*state.counts[u.id],0)*boostMultiplier();
const adRewardAmount=()=>Math.max(100,Math.floor(cps()*180),rawPerClick()*30);
if(!Array.isArray(state.earnedAchievements))state.earnedAchievements=achievements.filter(a=>a.done()).map(a=>a.name);
let ysdk=null,gameplayActive=false,loadingReady=false;
let adPlaying=false,adRequestPending=false;
const soundExt=(()=>{const audio=document.createElement('audio');return audio.canPlayType('audio/ogg; codecs="vorbis"')?'ogg':'mp3'})();
const soundNames=['ui-click','feed','buy','error','level','reward','cat-food','cat-happy','cat-happy-2','cat-soft','cat-purr-15','toy-yarn','toy-mouse','toy-slipper','toy-feather','toy-fish'];
const soundBank=Object.fromEntries(soundNames.map(name=>{const audio=new Audio(`assets/audio/${name}.${soundExt}?v=20260831-9`);audio.preload='auto';return[name,audio]}));
const backgroundMusic=new Audio(`assets/audio/chef-theme.${soundExt}?v=20260831-2`);backgroundMusic.loop=true;backgroundMusic.preload='auto';backgroundMusic.volume=.16;
const activeSounds=new Set();
const MUSIC_VOLUME=.16,MUSIC_DUCK_VOLUME=.045;
let musicRampTimer,duckRestoreTimer,duckUntil=0;
function rampMusic(target,duration=220){clearInterval(musicRampTimer);const start=backgroundMusic.volume,steps=10,delta=(target-start)/steps;let step=0;musicRampTimer=setInterval(()=>{step++;backgroundMusic.volume=Math.max(0,Math.min(1,start+delta*step));if(step>=steps)clearInterval(musicRampTimer)},duration/steps)}
function duckMusic(duration){duckUntil=Math.max(duckUntil,Date.now()+duration);rampMusic(MUSIC_DUCK_VOLUME);clearTimeout(duckRestoreTimer);duckRestoreTimer=setTimeout(()=>{const wait=duckUntil-Date.now();if(wait>20)duckRestoreTimer=setTimeout(()=>rampMusic(MUSIC_VOLUME,500),wait);else rampMusic(MUSIC_VOLUME,500)},duration)}
function ensureMusic(){if(state.music&&!adPlaying&&document.visibilityState!=='hidden'&&backgroundMusic.paused)backgroundMusic.play().catch(()=>{})}
function playSound(name,volume=1){if(!state.sfx||adPlaying)return;ensureMusic();const source=soundBank[name];if(!source)return;if(name.startsWith('cat-')&&name!=='cat-food')duckMusic(name==='cat-purr-15'?15000:2200);const player=source.cloneNode();player.volume=volume;activeSounds.add(player);const done=()=>activeSounds.delete(player);player.addEventListener('ended',done,{once:true});player.addEventListener('error',done,{once:true});player.play().catch(done)}
let lastFeedSound=0;
function playFeedSound(){if(Date.now()-lastFeedSound<3200)return;lastFeedSound=Date.now();playSound('feed',.72)}
let lastPurr=0;
function playPurr(force=false){if(!force&&Date.now()-lastPurr<18000)return;lastPurr=Date.now();playSound('cat-purr-15',.82)}
function stopEffects(){activeSounds.forEach(audio=>{audio.pause();audio.currentTime=0});activeSounds.clear()}
function stopAllSounds(){backgroundMusic.pause();activeSounds.forEach(audio=>{audio.pause();audio.currentTime=0});activeSounds.clear()}
function trackEvent(name,params={}){try{window.dataLayer?.push({event:name,...params});if(window.YM_COUNTER_ID&&typeof window.ym==='function')window.ym(window.YM_COUNTER_ID,'reachGoal',name,params)}catch(error){}}
function startGameplay(){if(gameplayActive||adPlaying||document.visibilityState==='hidden')return;gameplayActive=true;ysdk?.features?.GameplayAPI?.start?.()}
function stopGameplay(){if(!gameplayActive)return;gameplayActive=false;ysdk?.features?.GameplayAPI?.stop?.()}
async function initYandexSDK(){try{if(window.YaGames){ysdk=await YaGames.init();if(!loadingReady){ysdk?.features?.LoadingAPI?.ready?.();loadingReady=true}startGameplay()}}catch(error){ysdk=null}}
initYandexSDK();
const careRequests={
  hunger:{icon:'🐟',title:'Шеф требует особый перекус',text:'Обычное кормление считается работой. А это — забота.',action:'Подать особый перекус'},
  mood:{icon:'🪶',title:'Шеф желает развлечений',text:'Перо уже уведомлено о неизбежном поражении.',action:'Поиграть с пером'},
  rest:{icon:'💤',title:'Шеф устал руководить',text:'Нужно обеспечить тишину государственного значения.',action:'Уложить Шефа'}
};
function updateCare(){const now=Date.now(),hours=Math.min(24,Math.max(0,now-state.care.last)/3600000);state.care.hunger=Math.max(18,state.care.hunger-hours*3);state.care.mood=Math.max(18,state.care.mood-hours*2);state.care.rest=Math.max(18,state.care.rest-hours*2.5);state.care.last=now;if(!state.care.request&&now>=state.care.nextRequest){const types=Object.keys(careRequests);state.care.request=types[Math.floor(Math.random()*types.length)]}}
function adButton(title,subtitle){return `<span class="action-copy"><b>${title}</b><small>${subtitle}</small></span>`}
function renderAd(){const remaining=Math.max(0,state.adBonusUntil-Date.now()),button=$('rewardedAd');button.classList.toggle('active',remaining>0);button.disabled=remaining>0||adRequestPending;if(remaining>0)button.innerHTML=adButton('Наедание ×3',`Осталось ${Math.ceil(remaining/60000)} мин.`);else if(adRequestPending)button.innerHTML=adButton('Загружаем рекламу…','Награда после просмотра');else button.innerHTML=adButton(`Получить ${format(adRewardAmount())} рыбов`,'Сразу + доход ×3 на 5 минут')}
function renderCare(updateTreats=false){updateCare();['hunger','mood','rest'].forEach(key=>{const value=Math.round(state.care[key]);$(`${key}Bar`).style.width=`${value}%`;$(`${key}Value`).textContent=`${value}%`});const request=state.care.request?careRequests[state.care.request]:null;$('openCare').classList.toggle('has-request',!!request);$('careRequestIcon').textContent=request?.icon||'🐾';$('careRequestTitle').textContent=request?.title||'Шеф обдумывает пожелания';$('careRequestText').textContent=request?.text||'Он сообщит, когда потребуется персонал.';$('careAction').textContent=request?.action||'Ожидаем распоряжений';$('careAction').disabled=!request;const remaining=Math.max(0,state.care.bonusUntil-Date.now());$('careBonus').classList.toggle('active',remaining>0);$('careBonus').textContent=remaining>0?`Забота одобрена: доход ×2 ещё ${Math.ceil(remaining/60000)} мин.`:'Бонус заботы пока не действует.';if(updateTreats||!$('treats').children.length)$('treats').innerHTML=carpetFood.map((treat,index)=>{const left=Math.max(0,(state.treatUntil[index]||0)-Date.now()),cost=treatPrice(treat);return `<button class="treat-card ${state.food<cost?'locked':''}" data-treat="${index}"><img src="assets/images/food-${treat.img}.png" alt=""><span><b>${treat.name}</b><small>${left?`На ковре ещё ${Math.ceil(left/60000)} мин.`:`Эффект на ${treat.minutes} мин.`}</small></span><strong>🐟 ${format(cost)}</strong></button>`}).join('')}
function currentLevel(){let i=0;levels.forEach((l,n)=>{if(state.total>=l.at)i=n});return i}
const achievementQueue=[];
let achievementShowing=false,achievementDelayTimer;
function showNextAchievement(){if(achievementShowing||!achievementQueue.length)return;if($('levelCelebration').classList.contains('show')){if(!achievementDelayTimer)achievementDelayTimer=setTimeout(()=>{achievementDelayTimer=null;showNextAchievement()},2850);return}achievementShowing=true;const award=achievementQueue.shift();$('achievementToastIcon').textContent=award.icon;$('achievementToastTitle').textContent=award.name;$('achievementToastText').textContent=award.desc;$('achievementToast').classList.add('show');setTimeout(()=>playSound('reward',.62),350);setTimeout(()=>{$('achievementToast').classList.remove('show');setTimeout(()=>{achievementShowing=false;showNextAchievement()},350)},3600)}
function checkAchievements(){achievements.forEach(award=>{if(award.done()&&!state.earnedAchievements.includes(award.name)){state.earnedAchievements.push(award.name);achievementQueue.push(award);trackEvent('achievement_unlocked',{achievement:award.name})}});if(achievementQueue.length){save();showNextAchievement()}}
let levelCelebrationTimer;
function showLevelCelebration(levelIndex){clearTimeout(levelCelebrationTimer);$('levelCelebrationTitle').textContent=`${levelIndex+1} · ${levels[levelIndex].name}`;$('levelCelebration').classList.remove('show');void $('levelCelebration').offsetWidth;$('levelCelebration').classList.add('show');levelCelebrationTimer=setTimeout(()=>$('levelCelebration').classList.remove('show'),2700)}
let renderedLevel=currentLevel();
function render(updatePanels=false){
  $('food').textContent=format(state.food); $('perClick').textContent=`+${format(perClick())} рыбов`;
  renderAd();
  $('income').textContent=format(cps()); const li=currentLevel();
  if(li>renderedLevel){state.outfit=null;renderedLevel=li;trackEvent(`level_${li+1}`);save();updatePanels=true}
  const level=levels[li],next=levels[li+1];
  const roomStage=li>=10?3:li>=8?2:li>=4?1:0;
  document.querySelector('.game').style.setProperty('--room-bg',`url("${rooms[roomStage]}")`);
  $('level').textContent=`${li+1} · ${level.name}`;
  const chosen=outfits.find(o=>o.id===state.outfit&&li>=o.unlock);
  const catImage=chosen?chosen.img:level.img;
  if($('catBody').getAttribute('src')!==catImage)$('catBody').src=catImage;
  const bowlImage=bowlImages[Math.min(li,bowlImages.length-1)];
  if($('bowl').getAttribute('src')!==bowlImage)$('bowl').src=bowlImage;
  $('catBody').style.transform=`scale(${chosen?.scale??level.scale})`;
  $('catBody').style.filter=chosen?.filter??level.filter??'';
  $('levelProgress').style.width=next?`${Math.min(100,(state.total-level.at)/(next.at-level.at)*100)}%`:'100%';
  if(updatePanels)$('upgrades').innerHTML=upgrades.map(u=>`<button class="upgrade ${state.food<price(u)?'locked':''}" data-id="${u.id}"><span class="icon">${u.icon}</span><span><b>${u.name} · ${state.counts[u.id]}</b><small>${u.desc}</small></span><span class="price">🐟 ${format(price(u))}</span></button>`).join('');
  $('bowl').classList.toggle('upgraded',state.counts.bowl>0);
  [...$('foodDecor').children].forEach((item,index)=>item.classList.toggle('visible',(state.treatUntil[index]||0)>Date.now()));
  $('grandmaHelper').classList.toggle('visible',(state.helperUntil.grandma||0)>Date.now());
  const chefStage=state.counts.chef>=10?4:state.counts.chef>=6?3:state.counts.chef>=3?2:1;
  const chefImage=`assets/images/helpers/chef-stage-${chefStage}.png`;
  if($('chefHelper').getAttribute('src')!==chefImage)$('chefHelper').src=chefImage;
  $('chefHelper').classList.toggle('visible',(state.helperUntil.chef||0)>Date.now());
  $('deliveryHelper').classList.toggle('visible',(state.helperUntil.delivery||0)>Date.now());
  $('mouseDecor').classList.toggle('visible',(state.helperUntil.mouse||0)>Date.now());
  $('boxDecor').classList.toggle('visible',(state.helperUntil.box||0)>Date.now());
  $('laserDecor').classList.toggle('visible',(state.helperUntil.laser||0)>Date.now());
  const hasMinistry=(state.helperUntil.ministry||0)>Date.now();
  $('certificateDecor').classList.toggle('visible',hasMinistry);
  $('foodPileDecor').classList.toggle('visible',hasMinistry);
  if(updatePanels)$('outfits').innerHTML=outfits.map(o=>{const unlocked=li>=o.unlock,active=(chosen?chosen.id:null)===o.id;return `<button class="outfit-card ${unlocked?'':'locked'} ${active?'selected':''}" data-outfit="${o.id}"><img src="${o.img}" alt=""><b>${unlocked?o.name:'Секретный образ'}</b><small>${unlocked?(active?'Надето':'Надеть'):`Откроется на уровне ${o.unlock+1}`}</small></button>`}).join('');
  if(updatePanels)$('achievements').innerHTML=achievements.map(a=>`<article class="achievement ${a.done()?'earned':'locked'}"><span>${a.done()?a.icon:'❔'}</span><div><b>${a.name}</b><small>${a.desc}</small></div><strong>${a.done()?'Получено':'Не открыто'}</strong></article>`).join('');
  if(updatePanels||$('care').classList.contains('open'))renderCare(updatePanels);
  checkAchievements();
}
let lastClickPhrase=0;
function feed(e){if(adPlaying||document.querySelector('.game').classList.contains('layout-mode'))return;const before=currentLevel();state.food+=perClick();state.total+=perClick();const after=currentLevel();if(after>before){playSound('level',.9);showLevelCelebration(after);setTimeout(()=>playPurr(true),2100)}else{playFeedSound();if(after===levels.length-1)playPurr()}const cat=$('cat'),bowl=$('bowl');cat.classList.add('bop');bowl.classList.add('served');setTimeout(()=>{cat.classList.remove('bop');bowl.classList.remove('served')},180);if(after>before){$('phrase').textContent=after===12?'Шеф устал. Государственные дела и рыбов лучше продолжить после отдыха.':after===13?'Шеф наконец наелся. Тишина: руководитель спит.':`Новый статус: «${levels[after].name}». Шеф ожидал этого раньше.`;lastClickPhrase=Date.now()}else if(Date.now()-lastClickPhrase>18000&&Math.random()<.06){$('phrase').textContent=phrases[Math.floor(Math.random()*phrases.length)];lastClickPhrase=Date.now()}const f=document.createElement('span');f.className='floater';f.textContent=`+${format(perClick())} 🐟`;f.style.left=`${e?.clientX||innerWidth/2}px`;f.style.top=`${e?.clientY||innerHeight/2}px`;$('floaters').append(f);setTimeout(()=>f.remove(),850);render(after>before)}
$('cat').addEventListener('click',feed);$('feed').addEventListener('click',feed);
$('cat').addEventListener('contextmenu',e=>e.preventDefault());
const panels=['shop','wardrobe','awards','care','settings'];
const navButtons=['openFeed','openShop','openWardrobe','openAwards'];
function showPanel(panelId,buttonId){playSound('ui-click',.65);panels.forEach(id=>{$(id).classList.toggle('open',id===panelId);$(id).setAttribute('aria-hidden',id===panelId?'false':'true')});navButtons.forEach(id=>$(id).classList.toggle('active',id===buttonId));if(panelId)render(true)}
$('openFeed').addEventListener('click',()=>showPanel(null,'openFeed'));
$('openShop').addEventListener('click',()=>showPanel('shop','openShop'));
$('closeShop').addEventListener('click',()=>showPanel(null,'openFeed'));
$('openWardrobe').addEventListener('click',()=>showPanel('wardrobe','openWardrobe'));
$('closeWardrobe').addEventListener('click',()=>showPanel(null,'openFeed'));
$('openAwards').addEventListener('click',()=>showPanel('awards','openAwards'));
$('closeAwards').addEventListener('click',()=>showPanel(null,'openFeed'));
$('openCare').addEventListener('click',()=>showPanel('care'));
$('closeCare').addEventListener('click',()=>showPanel(null,'openFeed'));
function renderSettings(){const music=$('toggleMusic'),effects=$('toggleEffects');music.classList.toggle('enabled',state.music);effects.classList.toggle('enabled',state.sfx);music.querySelector('strong').textContent=state.music?'ВКЛ':'ВЫКЛ';effects.querySelector('strong').textContent=state.sfx?'ВКЛ':'ВЫКЛ'}
$('openSettings').addEventListener('click',()=>{showPanel('settings');renderSettings()});
$('closeSettings').addEventListener('click',()=>showPanel(null,'openFeed'));
$('toggleMusic').addEventListener('click',()=>{state.music=!state.music;if(state.music){backgroundMusic.volume=MUSIC_VOLUME;ensureMusic()}else{clearInterval(musicRampTimer);clearTimeout(duckRestoreTimer);backgroundMusic.pause()}renderSettings();save()});
$('toggleEffects').addEventListener('click',()=>{state.sfx=!state.sfx;if(!state.sfx)stopEffects();renderSettings();save()});
$('treats').addEventListener('click',e=>{const button=e.target.closest('.treat-card');if(!button)return;updateCare();const index=+button.dataset.treat,treat=carpetFood[index],cost=treatPrice(treat);if(state.food<cost){playSound('error',.45);$('phrase').textContent=`Для «${treat.name}» не хватает ${format(cost-state.food)} рыбов.`;return}if(state.care.hunger>75&&Math.random()<.18){playSound('cat-soft',.6);$('cat').classList.add('refuses');$('bowl').classList.add('refused');$('phrase').textContent='Шеф отвернулся: сейчас он сыт даже для собственного аппетита. Рыбовы не списаны.';setTimeout(()=>{$('cat').classList.remove('refuses');$('bowl').classList.remove('refused')},850);trackEvent('treat_refused',{treat:treat.name});return}state.food-=cost;state.care.hunger=Math.min(100,state.care.hunger+10);state.care.mood=Math.min(100,state.care.mood+4);state.treatUntil[index]=Math.max(Date.now(),state.treatUntil[index]||0)+treat.minutes*60000;$('cat').classList.add('feasting');$('bowl').classList.add('served');setTimeout(()=>{$('cat').classList.remove('feasting');$('bowl').classList.remove('served')},650);playFeedSound();setTimeout(()=>playPurr(),450);$('phrase').textContent=`«${treat.name}» подано. Ковёр временно стал фуршетным залом.`;trackEvent('treat_served',{treat:treat.name,minutes:treat.minutes});save();render(true)});
$('careAction').addEventListener('click',()=>{updateCare();const type=state.care.request;if(!type)return;if(type==='hunger'){const cost=Math.max(10,perClick()*8);if(state.food<cost){playSound('error');$('careRequestText').textContent=`Для особого перекуса не хватает ${format(cost-state.food)} рыбов.`;return}state.food-=cost}state.care[type]=Math.min(100,state.care[type]+32);state.care.request=null;state.care.bonusUntil=Date.now()+5*60*1000;state.care.nextRequest=Date.now()+(2+Math.random())*3600000;playSound('reward',.75);if(type==='hunger')playPurr();else playSound(type==='mood'?'cat-happy-2':'cat-soft',.72);$('phrase').textContent=type==='hunger'?'Особый перекус принят. Шеф великодушно не оставил ни крошки.':type==='mood'?'Перо побеждено. Настроение руководства улучшилось.':'Тишина объявлена государственной необходимостью.';save();render(true)});
const AD_WATCH_COOLDOWN=120000,AD_DRAWER_INTERVAL=300000;
let lastAdWatch=+(localStorage.getItem('absurd8-last-ad-watch')||0),adDrawerTimer,adAutoPeekTimer;
function peekAdDrawer(){clearTimeout(adAutoPeekTimer);$('adDrawer').classList.add('peek')}
function showAdDrawer(){if(adPlaying||state.adBonusUntil>Date.now())return false;clearTimeout(adAutoPeekTimer);$('adDrawer').classList.remove('peek');adAutoPeekTimer=setTimeout(peekAdDrawer,10000);return true}
function scheduleAdDrawer(delay=AD_DRAWER_INTERVAL){clearTimeout(adDrawerTimer);adDrawerTimer=setTimeout(()=>{showAdDrawer();scheduleAdDrawer()},delay)}
$('rewardedAd').addEventListener('click',()=>{if(state.adBonusUntil>Date.now()||adRequestPending)return;const remaining=AD_WATCH_COOLDOWN-(Date.now()-lastAdWatch);if(remaining>0){playSound('error',.45);$('phrase').textContent='Рекламу можно смотреть раз в 2 минуты.';$('adStatus').textContent='Реклама пока недоступна: действует ограничение в 2 минуты.';return}if(!ysdk?.adv){playSound('error');$('phrase').textContent='Реклама будет доступна после запуска игры на Яндекс Играх.';return}const instantReward=adRewardAmount();adRequestPending=true;trackEvent('ad_clicked',{reward:instantReward});peekAdDrawer();renderAd();$('phrase').textContent='Шеф выбирает рекламный ролик, достойный его аппетита…';let rewarded=false;ysdk.adv.showRewardedVideo({callbacks:{onOpen:()=>{lastAdWatch=Date.now();localStorage.setItem('absurd8-last-ad-watch',String(lastAdWatch));pauseGameForAd();$('adStatus').textContent='Просмотр начался. Ускорение будет выдано после завершения.'},onRewarded:()=>{rewarded=true;state.food+=instantReward;state.total+=instantReward;state.adBonusUntil=Date.now()+5*60*1000;trackEvent('ad_rewarded',{reward:instantReward});save()},onClose:()=>{adRequestPending=false;resumeGameAfterAd();if(rewarded)playSound('reward');$('phrase').textContent=rewarded?`Спонсор выделил ${format(instantReward)} рыбов. Доход ×3 на 5 минут.`:'Просмотр не завершён — добавку не выдали.';render(true)},onError:()=>{adRequestPending=false;resumeGameAfterAd();playSound('error');$('phrase').textContent='Сейчас реклама недоступна. Попробуйте немного позже.';renderAd()}}})});
$('adClose').addEventListener('click',e=>{e.stopPropagation();peekAdDrawer()});
$('adPeek').addEventListener('click',()=>{$('adDrawer').classList.contains('peek')?showAdDrawer():peekAdDrawer()});
$('outfits').addEventListener('click',e=>{const card=e.target.closest('.outfit-card');if(!card)return;const outfit=outfits.find(o=>o.id===card.dataset.outfit);if(currentLevel()<outfit.unlock){$('phrase').textContent='Шеф ещё не заслужил этот наряд. Хотя он с этим не согласен.';return}state.outfit=outfit.id;$('phrase').textContent=`Шеф выбрал: «${outfit.name}». Публика может аплодировать.`;save();render(true)});
$('upgrades').addEventListener('click',e=>{const b=e.target.closest('.upgrade');if(!b)return;const u=upgrades.find(x=>x.id===b.dataset.id),p=price(u);if(state.food>=p){state.food-=p;state.counts[u.id]++;playSound('buy',.7);if(['grandma','chef','delivery','mouse','laser'].includes(u.id))state.helperUntil[u.id]=Math.max(Date.now(),state.helperUntil[u.id]||0)+5*60*1000;if(u.id==='box')state.helperUntil.box=Math.max(Date.now(),state.helperUntil.box||0)+10*60*1000;if(u.id==='ministry')state.helperUntil.ministry=Math.max(Date.now(),state.helperUntil.ministry||0)+15*60*1000;const message=u.id==='ministry'?`Министерский запас и сертификат выданы на ${Math.ceil((state.helperUntil.ministry-Date.now())/60000)} мин.`:`Куплено: «${u.name}» · уровень ${state.counts[u.id]}.`;$('phrase').textContent=message;$('shopMessage').textContent=message;$('shopMessage').className='panel-message success';trackEvent('upgrade_bought',{upgrade:u.id,level:state.counts[u.id]});save();render(true);if(['grandma','chef','delivery'].includes(u.id)){$('shop').classList.remove('open');$('shop').setAttribute('aria-hidden','true')}}else{playSound('error');const message=`Не хватает ${format(p-state.food)} рыбов.`;$('phrase').textContent=message;$('shopMessage').textContent=message;$('shopMessage').className='panel-message warning';showAdDrawer();b.classList.add('nope');setTimeout(()=>b.classList.remove('nope'),300)}});
$('roomEvent').addEventListener('click',()=>{const toy=$('roomEvent');if(!toy.classList.contains('show'))return;const reward=Math.max(10,perClick()*12);state.food+=reward;state.total+=reward;playSound(toy.dataset.sound||'reward',.9);if(Math.random()<.45)playSound(Math.random()<.5?'cat-happy-2':'cat-soft',.68);$('phrase').textContent=toy.dataset.phrase;toy.classList.remove('show');save();render();scheduleRoomEvent()});
$('roomEvent').addEventListener('contextmenu',e=>e.preventDefault());
const roomEvents=[
  {img:'assets/images/events/yarn.png',sound:'toy-yarn',phrase:'Клубок обезврежен. Он слишком много знал.'},
  {img:'assets/images/events/mouse.png',sound:'toy-mouse',phrase:'Мышь внесла добровольный взнос и скрылась.'},
  {img:'assets/images/events/slipper.png',sound:'toy-slipper',phrase:'Найден тапок. Второй объявлен в розыск.'},
  {img:'assets/images/events/feather-v2.png',sound:'toy-feather',phrase:'Перо поймано. Шеф утверждает, что это была охота.'},
  {img:'assets/images/events/fish.png',sound:'toy-fish',phrase:'Рыбка сама пришла устраиваться на работу.'}
];
let roomEventTimer;
function pauseGameForAd(){adPlaying=true;stopGameplay();stopAllSounds();clearTimeout(roomEventTimer);$('roomEvent').classList.remove('show')}
function resumeGameAfterAd(){if(!adPlaying)return;adPlaying=false;startGameplay();ensureMusic();scheduleRoomEvent()}
function scheduleRoomEvent(first=false){clearTimeout(roomEventTimer);roomEventTimer=setTimeout(()=>{const event=roomEvents[Math.floor(Math.random()*roomEvents.length)],toy=$('roomEvent');toy.innerHTML=`<img src="${event.img}" alt="">`;toy.dataset.phrase=event.phrase;toy.dataset.sound=event.sound;toy.style.setProperty('--event-x',`${12+Math.random()*72}%`);toy.style.setProperty('--event-y',`${30+Math.random()*38}%`);toy.classList.add('show');setTimeout(()=>{if(toy.classList.contains('show')){toy.classList.remove('show');scheduleRoomEvent()}},9000)},first?5000:18000+Math.random()*18000)}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){trackEvent('game_hidden',{level:currentLevel()+1,total:Math.floor(state.total)});stopGameplay();stopAllSounds()}else{startGameplay();ensureMusic()}});
document.addEventListener('contextmenu',e=>e.preventDefault());
const layoutItems=[...document.querySelectorAll('.layout-item')];
const layoutStage=document.querySelector('.helper-stage');
function layoutProfile(){if(innerWidth>=1100)return'desktop';if(innerWidth>=760)return'tablet';if(innerWidth<=390)return'mobile-small';return'mobile-large'}
const layoutKey=()=>`absurd8-layout-v4-${layoutProfile()}`;
const defaultLayouts={
  desktop:{certificateDecor:{left:62.35,top:0,width:21.99},grandmaHelper:{left:8.31,top:1.71,width:24.09},mouseDecor:{left:0,top:0,width:12.02},boxDecor:{left:69.96,top:68.11,width:30.04},chefHelper:{left:63.67,top:7.09,width:36.33},deliveryHelper:{left:0,top:52.68,width:26.2},laserDecor:{left:34.28,top:95.06,width:3},cat:{dx:-1.61,dy:2.92,scale:1},bowl:{dx:.04,dy:-1.67,scale:1.4},foodProp1:{left:12.9,top:63.29,width:11},foodProp2:{left:0,top:56.45,width:11},foodProp3:{left:8.14,top:67.45,width:10},foodProp4:{left:53.95,top:77.35,width:20},foodProp5:{left:18.02,top:76.35,width:21.99},foodProp6:{left:0,top:82.67,width:19.99},foodProp7:{left:87.6,top:50.02,width:11},foodProp8:{left:64.45,top:58.79,width:17.99},foodProp9:{left:39.42,top:80.07,width:15},foodPileDecor:{left:25.68,top:0,width:46.98}},
  tablet:{certificateDecor:{left:52.79,top:.32,width:19.99},grandmaHelper:{left:6.84,top:13.35,width:24.09},mouseDecor:{left:0,top:12.51,width:12},boxDecor:{left:69.96,top:75.19,width:30.04},chefHelper:{left:63.67,top:17.82,width:36.33},deliveryHelper:{left:1.64,top:54.73,width:34.21},laserDecor:{left:34.28,top:93.7,width:1.74},cat:{dx:-1.61,dy:2.92,scale:1},bowl:{dx:1.49,dy:.55,scale:1.1},foodProp2:{left:82.36,top:59.04,width:13},foodProp4:{left:49.29,top:79.11,width:22},foodProp5:{left:2,top:52,width:20},foodProp6:{left:5.88,top:75.6,width:26},foodProp7:{left:70.85,top:57.92,width:11},foodProp8:{left:62.44,top:71.75,width:18},foodProp9:{left:32.66,top:80.41,width:15},foodPileDecor:{left:26.78,top:7.49,width:48.98}},
  'mobile-small':{certificateDecor:{left:39.93,top:2.69,width:36},cat:{dx:-5.96,dy:7.75,scale:.7},bowl:{dx:-1.25,dy:-2.05,scale:.8},mouseDecor:{left:0,top:19.07,width:16.29},boxDecor:{left:67.96,top:68.17,width:32.04},chefHelper:{left:59.68,top:20.16,width:40.32},grandmaHelper:{left:6.71,top:25.44,width:26.08},deliveryHelper:{left:0,top:60.3,width:36.2},laserDecor:{left:34.28,top:93.7,width:1.74},foodProp3:{left:4.36,top:80.08,width:12},foodProp4:{left:75.34,top:88.12,width:24},foodProp5:{left:0,top:55.61,width:20},foodProp6:{left:11.97,top:72.72,width:26},foodProp7:{left:82.15,top:56.11,width:11},foodProp8:{left:64.13,top:67.31,width:18},foodProp9:{left:54.82,top:79.15,width:21},foodPileDecor:{left:27.49,top:20,width:51}},
  'mobile-large':{certificateDecor:{left:43,top:1.5,width:32},cat:{dx:-2,dy:6.52,scale:.82},bowl:{dx:.76,dy:1.9,scale:.88},mouseDecor:{left:0,top:16.5,width:14.5},boxDecor:{left:70,top:68,width:30},chefHelper:{left:62,top:20,width:38},grandmaHelper:{left:7,top:25,width:25},deliveryHelper:{left:0,top:60,width:34},laserDecor:{left:34.28,top:93.7,width:1.74},foodProp3:{left:4,top:80,width:10},foodProp4:{left:76,top:87,width:22},foodProp5:{left:0,top:54,width:18},foodProp6:{left:12,top:72,width:24},foodProp7:{left:81,top:55,width:10},foodProp8:{left:64,top:67,width:17},foodProp9:{left:55,top:79,width:19},foodPileDecor:{left:28.5,top:17,width:49}}
};
let selectedLayoutItem=null;
function readLayout(){const profile=layoutProfile();try{return {...defaultLayouts[profile],...JSON.parse(localStorage.getItem(layoutKey())||'{}')}}catch(e){return {...defaultLayouts[profile]}}}
function applyLayout(){const saved=readLayout();layoutItems.forEach(item=>{const pos=saved[item.id];if(!pos)return;if(item.dataset.layoutMode==='offset'){item.style.setProperty('--layout-x',`${pos.dx||0}vw`);item.style.setProperty('--layout-y',`${pos.dy||0}dvh`);item.style.setProperty('--layout-scale',pos.scale||1);return}const isFood=item.classList.contains('food-prop'),safeLeft=isFood?Math.max(0,Math.min(100-(pos.width||10),pos.left)):pos.left,safeTop=isFood?Math.max(5,Math.min(90,pos.top)):pos.top;item.style.left=`${safeLeft}%`;item.style.top=`${safeTop}%`;item.style.right='auto';item.style.bottom='auto';item.style.width=`${pos.width}%`;item.style.height=item.id==='laserDecor'?`${pos.width}%`:'auto'})}
function saveLayoutItem(item){const saved=readLayout();if(item.dataset.layoutMode==='offset'){saved[item.id]={dx:+(parseFloat(item.style.getPropertyValue('--layout-x'))||0).toFixed(2),dy:+(parseFloat(item.style.getPropertyValue('--layout-y'))||0).toFixed(2),scale:+(parseFloat(item.style.getPropertyValue('--layout-scale'))||1).toFixed(2)}}else{const stageRect=layoutStage.getBoundingClientRect(),rect=item.getBoundingClientRect();saved[item.id]={left:+((rect.left-stageRect.left)/stageRect.width*100).toFixed(2),top:+((rect.top-stageRect.top)/stageRect.height*100).toFixed(2),width:+(rect.width/stageRect.width*100).toFixed(2)}}localStorage.setItem(layoutKey(),JSON.stringify(saved))}
function selectLayoutItem(item){selectedLayoutItem=item;layoutItems.forEach(x=>x.classList.toggle('selected-layout',x===item));$('layoutStatus').textContent=item?item.dataset.layoutName:'перетащите объект'}
function setLayoutMode(on){document.querySelector('.game').classList.toggle('layout-mode',on);$('layoutTools').setAttribute('aria-hidden',on?'false':'true');if(!on)selectLayoutItem(null)}
$('layoutToggle').addEventListener('click',()=>{playSound('ui-click');setLayoutMode(!document.querySelector('.game').classList.contains('layout-mode'))});
$('closeLayout').addEventListener('click',()=>setLayoutMode(false));
layoutItems.forEach(item=>item.addEventListener('pointerdown',e=>{if(!document.querySelector('.game').classList.contains('layout-mode'))return;e.preventDefault();e.stopPropagation();selectLayoutItem(item);item.setPointerCapture(e.pointerId);const stageRect=layoutStage.getBoundingClientRect(),itemRect=item.getBoundingClientRect(),startX=e.clientX,startY=e.clientY,startDx=parseFloat(item.style.getPropertyValue('--layout-x'))||0,startDy=parseFloat(item.style.getPropertyValue('--layout-y'))||0,grabX=e.clientX-itemRect.left,grabY=e.clientY-itemRect.top;const move=ev=>{if(item.dataset.layoutMode==='offset'){const dx=startDx+(ev.clientX-startX)/innerWidth*100,dy=startDy+(ev.clientY-startY)/innerHeight*100;item.style.setProperty('--layout-x',`${dx}vw`);item.style.setProperty('--layout-y',`${dy}dvh`);$('layoutStatus').textContent=`${item.dataset.layoutName}: ${Math.round(dx)}, ${Math.round(dy)}`;return}const rect=item.getBoundingClientRect(),left=Math.max(0,Math.min(stageRect.width-rect.width,ev.clientX-stageRect.left-grabX)),top=Math.max(0,Math.min(stageRect.height-rect.height,ev.clientY-stageRect.top-grabY));item.style.left=`${left/stageRect.width*100}%`;item.style.top=`${top/stageRect.height*100}%`;item.style.right='auto';item.style.bottom='auto';$('layoutStatus').textContent=`${item.dataset.layoutName}: ${Math.round(left/stageRect.width*100)}%, ${Math.round(top/stageRect.height*100)}%`};const done=()=>{item.removeEventListener('pointermove',move);saveLayoutItem(item)};item.addEventListener('pointermove',move);item.addEventListener('pointerup',done,{once:true});item.addEventListener('pointercancel',done,{once:true})}));
function resizeSelected(delta){if(!selectedLayoutItem)return;if(selectedLayoutItem.dataset.layoutMode==='offset'){const current=parseFloat(selectedLayoutItem.style.getPropertyValue('--layout-scale'))||1,next=Math.max(.5,Math.min(1.4,current+delta/20));selectedLayoutItem.style.setProperty('--layout-scale',next);saveLayoutItem(selectedLayoutItem);$('layoutStatus').textContent=`${selectedLayoutItem.dataset.layoutName}: размер ${Math.round(next*100)}%`;return}const stageWidth=layoutStage.getBoundingClientRect().width,current=selectedLayoutItem.getBoundingClientRect().width/stageWidth*100,next=Math.max(3,Math.min(55,current+delta));selectedLayoutItem.style.width=`${next}%`;selectedLayoutItem.style.height=selectedLayoutItem.id==='laserDecor'?`${next}%`:'auto';saveLayoutItem(selectedLayoutItem);$('layoutStatus').textContent=`${selectedLayoutItem.dataset.layoutName}: размер ${Math.round(next)}%`}
$('sizeDown').addEventListener('click',()=>resizeSelected(-2));$('sizeUp').addEventListener('click',()=>resizeSelected(2));
$('nextLayout').addEventListener('click',()=>{const next=layoutItems[(Math.max(-1,layoutItems.indexOf(selectedLayoutItem))+1)%layoutItems.length];selectLayoutItem(next)});
$('centerLayout').addEventListener('click',()=>{if(!selectedLayoutItem)return;if(selectedLayoutItem.dataset.layoutMode==='offset'){selectedLayoutItem.style.setProperty('--layout-x','0vw');selectedLayoutItem.style.setProperty('--layout-y','0dvh')}else{const rect=selectedLayoutItem.getBoundingClientRect(),stage=layoutStage.getBoundingClientRect();selectedLayoutItem.style.left=`${Math.max(0,(stage.width-rect.width)/2)/stage.width*100}%`;selectedLayoutItem.style.top=`${Math.max(0,(stage.height-rect.height)/2)/stage.height*100}%`;selectedLayoutItem.style.right='auto';selectedLayoutItem.style.bottom='auto'}saveLayoutItem(selectedLayoutItem);$('layoutStatus').textContent=`${selectedLayoutItem.dataset.layoutName}: перемещено в центр`});
$('copyLayout').addEventListener('click',async()=>{const value=JSON.stringify({device:layoutProfile(),positions:readLayout()},null,2);try{await navigator.clipboard.writeText(value);$('layoutStatus').textContent='координаты и размеры скопированы'}catch(e){prompt('Скопируйте координаты:',value)}});
$('resetLayout').addEventListener('click',()=>{localStorage.removeItem(layoutKey());layoutItems.forEach(item=>{['left','top','right','bottom','width','height'].forEach(prop=>item.style.removeProperty(prop));['--layout-x','--layout-y','--layout-scale'].forEach(prop=>item.style.removeProperty(prop))});applyLayout();selectLayoutItem(null);$('layoutStatus').textContent='возвращена стандартная расстановка'});
function save(){state.last=Date.now();localStorage.setItem('absurd8-save',JSON.stringify(state))}
const away=Math.min(4*3600,Math.max(0,(Date.now()-(state.last||Date.now()))/1000));if(away>10&&cps()>0){const bonus=Math.floor(away*cps());state.food+=bonus;state.total+=bonus;$('phrase').textContent=`Пока тебя не было, Шеф получил ${format(bonus)} рыбов.`}
setInterval(()=>{if(adPlaying)return;const gain=cps()/10;state.food+=gain;state.total+=gain;render()},100);setInterval(()=>{if(adPlaying)return;updateCare();save();if($('care').classList.contains('open'))renderCare();else $('openCare').classList.toggle('has-request',!!state.care.request)},60000);setInterval(save,5000);addEventListener('beforeunload',save);updateCare();render(true);applyLayout();scheduleRoomEvent(true);scheduleAdDrawer();trackEvent('game_start',{level:currentLevel()+1});setTimeout(()=>trackEvent('session_30_sec'),30000);setTimeout(()=>trackEvent('session_1_min'),60000);setTimeout(()=>trackEvent('session_3_min'),180000);setTimeout(()=>trackEvent('session_5_min'),300000);setTimeout(()=>$('introSplash').classList.add('hide'),3000);setTimeout(()=>$('introSplash').remove(),3900);
