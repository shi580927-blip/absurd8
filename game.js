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
  {at:5000000000,name:'Повелитель заслуженного отдыха',scale:1,img:'assets/images/cat-level-13.png'},
  {at:25000000000,name:'Абсолютно сытый Шеф',scale:1,img:'assets/images/cat-level-14.png'}
];
const phrases=['Шеф требует второе первое.','Кот не толстый. Он стратегически запасливый.','Эта рыбка была недостаточно амбициозна.','Шеф одобряет. Молча и свысока.','В миске появилось дно. Кто ответит?','Кот съел бюджет. Буквально.','Теперь можно и перекусить.','Работай усерднее. Кот сам себя не накормит.','Уровень мурчания временно повышен.','Рыбка поступила в распоряжение руководства.'];
const englishPhrases=['Chef demands a second first course.','The cat is not fat. He is strategically stocked.','That fish lacked ambition.','Chef approves. Silently and from above.','The bottom of the bowl is visible. Who is responsible?','The cat ate the budget. Literally.','Now we may have a little snack.','Work harder. The cat will not feed himself.','Purring level temporarily increased.','The fish has been transferred to management.'];
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
  {icon:'😴',name:'Можно и подремать',desc:'Довести Шефа до абсолютной сытости',done:()=>currentLevel()>=13}
];
const outfits=levels.map((level,index)=>({id:`level-${index+1}`,name:level.name,img:level.img,scale:level.scale,filter:level.filter||'',unlock:index}));
const rooms=[
  'assets/images/rooms/room-stage-1.webp',
  'assets/images/rooms/room-stage-2.webp',
  'assets/images/rooms/room-stage-3.webp',
  'assets/images/rooms/room-stage-4.webp',
  'assets/images/rooms/room-stage-5.webp'
];
const desktopRooms=rooms.map((_,index)=>`assets/images/rooms/desktop/room-stage-${index+1}-desktop-v1.webp`);
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
  {img:9,name:'Фуршет «Девять жизней»',minutes:7,cost:75,x:40,y:74,w:13},
  {img:'buffets/sushi-ship-full',name:'Суши-корабль Его Наглейшества',minutes:3,cost:140,buffet:true,clickMultiplier:2,stageClicks:[14,34],revealLevel:8,adLevel:9}
];
const treatUnlockLevels=[1,1,2,2,3,4,6,8,10,11];
const queryParams=new URLSearchParams(location.search);
const testMode=queryParams.get('test')==='1';
const layoutEditorMode=queryParams.get('layout')==='1';
const cleanTestMode=testMode&&queryParams.get('clean')==='1';
const forcedTestLevel=testMode?Math.max(0,Math.min(levels.length-1,(parseInt(queryParams.get('level'),10)||0)-1)):-1;
const saveKey=testMode?'absurd8-test-save':'absurd8-save';
const storedSave=localStorage.getItem(saveKey);
let hasValidLocalSave=false;
let state={saveVersion:9,food:0,total:0,counts:{},helperUntil:{},treatUntil:{},buffetClicks:{},adTreatUnlocks:[],treatWish:null,nextTreatWish:0,earnedAchievements:null,music:true,sfx:true,last:Date.now(),outfit:null,care:null,adBonusUntil:0};
try{const saved=JSON.parse(storedSave||'null');if(saved&&typeof saved==='object'){state={...state,...saved};hasValidLocalSave=true}}catch(e){}
upgrades.forEach(u=>state.counts[u.id]??=0);
state.helperUntil??={};
state.treatUntil??={};
state.buffetClicks??={};
if(!Array.isArray(state.adTreatUnlocks))state.adTreatUnlocks=[];
if(!Number.isFinite(state.nextTreatWish)||state.nextTreatWish<=0)state.nextTreatWish=Date.now()+(90+Math.random()*60)*1000;
if((state.saveVersion||0)<3&&state.counts.ministry>0)state.helperUntil.ministry=Date.now()+15*60*1000;
if((state.saveVersion||0)<4&&state.counts.mouse>0)state.helperUntil.mouse=Date.now()+5*60*1000;
if((state.saveVersion||0)<5&&state.counts.laser>0)state.helperUntil.laser=Date.now()+5*60*1000;
if((state.saveVersion||0)<6&&state.counts.box>0)state.helperUntil.box=Date.now()+10*60*1000;
if(typeof state.music!=='boolean')state.music=state.sound!==false;
if(typeof state.sfx!=='boolean')state.sfx=state.sound!==false;
state.saveVersion=9;
if(forcedTestLevel>=0){state.total=levels[forcedTestLevel].at;state.food=Math.max(state.food,state.total);state.outfit=null}
const freshCare={hunger:82,mood:78,rest:80,last:Date.now(),nextRequest:Date.now(),request:null,bonusUntil:0};
state.care={...freshCare,...(state.care||{})};
if(state.artVersion!==2){state.outfit=null;state.artVersion=2}
const $=id=>document.getElementById(id);
if(cleanTestMode)document.documentElement.classList.add('clean-test');
$('foodDecor').innerHTML=carpetFood.map((item,index)=>item.buffet?'':`<img id="foodProp${index+1}" data-treat-index="${index}" data-layout-name="Еда ${index+1}" class="food-prop layout-item" src="assets/images/food-${item.img}.png" style="left:${item.x}%;top:${item.y}%;width:${item.w}%" alt="">`).join('');
const SUPPORTED_LANGUAGES=new Set(['ru','en']);
const NUMBER_LOCALES={ru:'ru-RU',en:'en-US'};
let gameLanguage='ru';
const L=(ru,en)=>gameLanguage==='en'?en:ru;
const englishNames={
  'Миска без дна':'Bottomless Bowl','Бабушка-кормитель':'Feeder Grandma','Повар, боящийся кота':'Chef Who Fears the Cat','Доставка со скоростью света':'Lightspeed Delivery','Министерство кошачьей еды':'Ministry of Feline Cuisine','Лазерная точка с амбициями':'Ambitious Laser Dot','Мышь на удалённой работе':'Remote-Working Mouse','Коробка дороже квартиры':'Box Pricier Than an Apartment',
  'Голодный стратег':'Hungry Strategist','Кот с личной миской':'Cat with a Personal Bowl','Диванный аристократ':'Sofa Aristocrat','Ресторанный критик':'Restaurant Critic','Хозяин недвижимости':'Property Owner','Рыбный магнат':'Fish Tycoon','Его Рыбное Величество':'His Fishy Majesty','Лососевый барон':'Salmon Baron','Министр полной миски':'Minister of the Full Bowl','Император квартиры':'Emperor of the Apartment','Кот, купивший Луну':'The Cat Who Bought the Moon','Хозяин Вселенной':'Master of the Universe','Повелитель заслуженного отдыха':'Lord of Well-Earned Rest','Абсолютно сытый Шеф':'Absolutely Satisfied Chef',
  'Икра для важных переговоров':'Caviar for Important Negotiations','Стратегический запас консервов':'Strategic Canned Food Reserve','Консерва особой важности':'Can of Special Importance','Дорада по высшему разряду':'Top-Rank Dorado','Парадная курица':'Ceremonial Chicken','Большая рыбная тарелка':'Grand Fish Platter','Фиолетовая консерва':'Purple Can','Лосось для руководства':'Executive Salmon','Фуршет «Девять жизней»':'Nine Lives Buffet','Суши-корабль Его Наглейшества':'His Audaciousness’s Sushi Ship',
  'Первая лапа власти':'The First Paw of Power','У миски появился бюджет':'The Bowl Got a Budget','Бабушка одобрила комплекцию':'Grandma Approved the Figure','Повар подал заявление':'The Chef Filed His Notice','Рыбы особой срочности':'Priority Fish Delivery','Кот вышел в руководство':'The Cat Joined Management','Пассивная наглость':'Passive Audacity','Миска государственного значения':'Bowl of National Importance','Рыбовый миллионер':'Fish Millionaire','Вселенная оформлена на кота':'The Universe Is in the Cat’s Name','Можно и подремать':'Time for a Nap'
};
const englishDescriptions={
  '+1 рыбов за нажатие':'+1 fish per click','+1 рыбов в секунду':'+1 fish per second','+5 рыбов в секунду':'+5 fish per second','+20 рыбов в секунду':'+20 fish per second','+100 рыбов в секунду':'+100 fish per second','+3 рыбов за нажатие':'+3 fish per click','+12 рыбов в секунду':'+12 fish per second','+250 рыбов в секунду':'+250 fish per second',
  'Заработать 10 рыбов':'Earn 10 fish','Купить «Миску без дна»':'Buy the Bottomless Bowl','Нанять бабушку-кормителя':'Hire Feeder Grandma','Нанять испуганного повара':'Hire the frightened chef','Купить скоростную доставку':'Buy lightspeed delivery','Достичь 5 уровня':'Reach level 5','Получать 25 рыбов в секунду':'Earn 25 fish per second','Получить поддержку министерства':'Secure ministry support','Заработать 1 000 000 рыбов':'Earn 1,000,000 fish','Достичь 12 уровня':'Reach level 12','Довести Шефа до абсолютной сытости':'Bring Chef to absolute satisfaction'
};
const itemName=item=>gameLanguage==='en'?(englishNames[item.name]||item.name):item.name;
const itemDesc=item=>gameLanguage==='en'?(englishDescriptions[item.desc]||item.desc):item.desc;
const staticTranslations={
  pageTitle:['Кот, который слишком хорошо живёт','The Cat Who Lives Too Well'],phrase:['В этой миске подозрительно видно дно.','The bottom of this bowl is suspiciously visible.'],feedLabel:['ПОКОРМИТЬ','FEED'],feedHint:['Можно нажимать на кота или на кнопку','Tap the cat or press the button'],levelLabel:['Уровень наглости','Audacity level'],incomeLabel:['Доход','Income'],incomeUnit:['рыбов/сек.','fish/sec.'],navFeed:['Кормить','Feed'],navShop:['Привилегии','Privileges'],navWardrobe:['Шкаф','Wardrobe'],navAwards:['Награды','Awards'],shopTitle:['👑 Привилегии Шефа','👑 Chef’s Privileges'],shopMessage:['Выберите привилегию для Шефа.','Choose a privilege for Chef.'],wardrobeTitle:['👕 Гардероб Шефа','👕 Chef’s Wardrobe'],wardrobeMessage:['Одежда меняет вид, но не уменьшает наглость.','Clothes change his look, not his audacity.'],awardsTitle:['🏆 Награды Шефа','🏆 Chef’s Awards'],awardsMessage:['Шеф не хвастается. Он официально информирует.','Chef does not brag. He issues official updates.'],careTitle:['🐾 Как поживает Шеф','🐾 How Is Chef Doing?'],careMessage:['Шеф не нуждается в заботе. Он разрешает её проявить.','Chef needs no care. He merely permits it.'],hungerLabel:['🐟 Сытость','🐟 Fullness'],moodLabel:['🧶 Настроение','🧶 Mood'],restLabel:['💤 Отдых','💤 Rest'],careRequestTitle:['Шеф обдумывает пожелания','Chef Is Considering His Demands'],careRequestText:['Он сообщит, когда потребуется персонал.','He will notify the staff when needed.'],careAction:['Ожидаем распоряжений','Awaiting orders'],careBonus:['Бонус заботы пока не действует.','Care bonus is not active.'],treatTitle:['🍽️ Вкусняшки на ковёр','🍽️ Treats on the Carpet'],treatIntro:['Купленное блюдо появляется в комнате на несколько минут. Сытый Шеф иногда имеет собственное мнение.','A purchased dish appears in the room for several minutes. A full Chef may still have opinions.'],careNote:['Показатели снижаются очень медленно. Шеф не болеет, не убегает и никого не наказывает. Почти.','Stats decrease very slowly. Chef never gets sick, runs away, or punishes anyone. Almost.'],settingsTitle:['⚙️ Настройки','⚙️ Settings'],settingsMessage:['Шеф разрешает настроить акустику кабинета.','Chef permits adjustments to the office acoustics.'],musicLabel:['Фоновая музыка','Background music'],musicHint:['Музыка играет во время кормления','Music plays while you feed Chef'],effectsLabel:['Звуки игры','Game sounds'],effectsHint:['Кормление, кот, награды и игрушки','Feeding, cat, rewards, and toys'],developerLabel:['Разработчик','Developer'],presentsLabel:['представляет','presents'],newLevelLabel:['✨ НОВЫЙ УРОВЕНЬ ✨','✨ NEW LEVEL ✨'],congratsLabel:['Шеф принимает поздравления.','Chef accepts your congratulations.'],achievementReceivedLabel:['НАГРАДА ПОЛУЧЕНА','AWARD UNLOCKED'],rewardConfirmTitle:['Открыть за просмотр рекламы?','Unlock by watching an ad?'],rewardConfirmText:['Посмотрите ролик полностью — награда будет выдана после просмотра.','Watch the full video to receive the reward.'],rewardConfirmCancel:['Не сейчас','Not now'],rewardConfirmWatch:['Смотреть рекламу','Watch ad']
};
function applyStaticTranslations(){
  Object.entries(staticTranslations).forEach(([id,texts])=>{const element=$(id);if(element)element.textContent=texts[gameLanguage==='en'?1:0]});
  document.title=L('Кот, который слишком хорошо живёт','The Cat Who Lives Too Well');
  $('openCare').ariaLabel=L('Состояние Шефа','Chef’s status');$('openSettings').ariaLabel=L('Настройки','Settings');$('cat').ariaLabel=L('Покормить кота','Feed the cat');$('roomEvent').ariaLabel=L('Собрать случайный бонус','Collect a random bonus');$('adPeek').ariaLabel=L('Показать предложение','Show offer');$('adClose').ariaLabel=L('Скрыть предложение','Hide offer');
  document.querySelectorAll('.close').forEach(button=>button.ariaLabel=L('Закрыть','Close'));
  $('catBody').alt=L('Рыжий кот Шеф','Chef, the orange cat');$('bowl').alt=L('Пустая миска','Empty bowl');
  const english=gameLanguage==='en';$('introTitleImage').hidden=english;$('introTitleEnglish').hidden=!english;$('certificateDecor').src=english?'assets/images/certificate-en.png?v=20260906-1':'assets/images/certificate.png?v=20260831-2';$('introSplash').ariaLabel=L('Кот, который слишком хорошо живёт','The Cat Who Lives Too Well');
}
function applyGameLanguage(language){
  const normalized=String(language||'').toLowerCase().split('-')[0];
  gameLanguage=SUPPORTED_LANGUAGES.has(normalized)?normalized:'ru';
  document.documentElement.lang=gameLanguage;
  applyStaticTranslations();
  if(typeof render==='function'){render(true);renderSettings()}
}
const format=n=>Math.floor(n).toLocaleString(NUMBER_LOCALES[gameLanguage]||NUMBER_LOCALES.ru);
const price=u=>Math.floor(u.base*Math.pow(1.55,state.counts[u.id]));
const boostMultiplier=()=>Math.max(state.care.bonusUntil>Date.now()?2:1,state.adBonusUntil>Date.now()?3:1);
const rawPerClick=()=>1+upgrades.reduce((n,u)=>n+(u.click||0)*state.counts[u.id],0);
const perClick=()=>Math.floor(rawPerClick()*boostMultiplier());
const treatPrice=treat=>Math.max(12,Math.floor(rawPerClick()*treat.cost));
const cps=()=>upgrades.reduce((n,u)=>n+(u.cps||0)*state.counts[u.id],0)*boostMultiplier();
const adRewardAmount=()=>Math.max(100,Math.floor(cps()*180),rawPerClick()*30);
if(!Array.isArray(state.earnedAchievements))state.earnedAchievements=achievements.filter(a=>a.done()).map(a=>a.name);
const CLOUD_SAVE_KEY='absurd8State';
let ysdk=null,yandexPlayer=null,cloudSaveReady=false,cloudSaveTimer=null,cloudSaveInFlight=false;
let gameplayActive=false,loadingReady=false,brandIntroFinished=false,platformPaused=false;
let initialDataReady=!window.YaGames||testMode,introMinElapsed=false,introFinishStarted=false;
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
function gameIsPaused(){return adPlaying||platformPaused||!brandIntroFinished||document.visibilityState==='hidden'}
function ensureMusic(){if(state.music&&!gameIsPaused()&&backgroundMusic.paused)backgroundMusic.play().catch(()=>{})}
function playSound(name,volume=1){if(!state.sfx||adPlaying)return;ensureMusic();const source=soundBank[name];if(!source)return;if(name.startsWith('cat-')&&name!=='cat-food')duckMusic(name==='cat-purr-15'?15000:2200);const player=source.cloneNode();player.volume=volume;activeSounds.add(player);const done=()=>activeSounds.delete(player);player.addEventListener('ended',done,{once:true});player.addEventListener('error',done,{once:true});player.play().catch(done)}
let lastFeedSound=0;
function playFeedSound(){if(Date.now()-lastFeedSound<3200)return;lastFeedSound=Date.now();playSound('feed',.72)}
let lastPurr=0;
function playPurr(force=false){if(!force&&Date.now()-lastPurr<18000)return;lastPurr=Date.now();playSound('cat-purr-15',.82)}
let thoughtTimer,thoughtSide=false,previousThoughtMessage='',thoughtBatchTimer,thoughtBatch={count:0,refused:false};
function showCatThought(kind,text){clearTimeout(thoughtTimer);thoughtSide=!thoughtSide;const thought=$('catThought');$('catThoughtImage').src=kind==='happy'?'assets/images/reaction-happy.webp':'assets/images/reaction-fussy.webp';$('catThoughtImage').alt=kind==='happy'?L('Довольный Шеф','Satisfied Chef'):L('Привередливый Шеф','Fussy Chef');$('catThoughtText').textContent=text;thought.className=`cat-thought ${kind} ${thoughtSide?'from-left':'from-right'}`;void thought.offsetWidth;thought.classList.add('show');thoughtTimer=setTimeout(()=>thought.classList.remove('show'),4000)}
function queueCatThought(refused){thoughtBatch.count++;thoughtBatch.refused||=refused;clearTimeout(thoughtBatchTimer);thoughtBatchTimer=setTimeout(()=>{const batch=thoughtBatch;thoughtBatch={count:0,refused:false};if(batch.count>1)showCatThought(batch.refused?'fussy':'happy',batch.refused?L('Шеф ознакомился с меню. Некоторые позиции велел унести.','Chef reviewed the menu. Several items were ordered out.'):L('Шеф ознакомился с меню и одобрил выбор.','Chef reviewed the menu and approved the selection.'));else if(batch.refused)showCatThought('fussy',Math.random()<.22?L('Ой, бабочка… Шеф уже забыл, что заказывал.','Oh, a butterfly… Chef has forgotten what he ordered.'):L('Шеф передумал. Унесите это немедленно.','Chef changed his mind. Remove this at once.'));else showCatThought('happy',L('Котик доволен. Можно продолжать обслуживание.','The kitty is pleased. Service may continue.'))},800)}
function initCatThoughts(){['assets/images/reaction-happy.webp','assets/images/reaction-fussy.webp'].forEach(src=>{const preload=new Image();preload.src=src});new MutationObserver(()=>{const message=$('phrase').textContent;if(message===previousThoughtMessage)return;previousThoughtMessage=message;if(message.startsWith('Шеф отвернулся')||message.startsWith('Шеф демонстративно')||message.startsWith('Chef turned away')||message.startsWith('Chef made a show'))queueCatThought(true);else if(message.includes('подано. Ковёр')||message.startsWith('Шеф принял блюдо')||message.includes('has been served')||message.startsWith('Chef accepted'))queueCatThought(false)}).observe($('phrase'),{childList:true,characterData:true,subtree:true})}
function stopEffects(){activeSounds.forEach(audio=>{audio.pause();audio.currentTime=0});activeSounds.clear()}
function stopAllSounds(){backgroundMusic.pause();activeSounds.forEach(audio=>{audio.pause();audio.currentTime=0});activeSounds.clear()}
function trackEvent(name,params={}){try{window.dataLayer?.push({event:name,...params});if(window.YM_COUNTER_ID&&typeof window.ym==='function')window.ym(window.YM_COUNTER_ID,'reachGoal',name,params)}catch(error){}}
function startGameplay(){if(gameplayActive||gameIsPaused())return;gameplayActive=true;ysdk?.features?.GameplayAPI?.start?.()}
function stopGameplay(){if(!gameplayActive)return;gameplayActive=false;ysdk?.features?.GameplayAPI?.stop?.()}
function announceGameReady(){if(!brandIntroFinished||loadingReady||!ysdk)return;ysdk.features?.LoadingAPI?.ready?.();loadingReady=true;startGameplay()}
function finishIntroWhenReady(){if(introFinishStarted||!introMinElapsed||!initialDataReady)return;introFinishStarted=true;const splash=$('introSplash');splash?.classList.add('hide');setTimeout(()=>{splash?.remove();brandIntroFinished=true;announceGameReady();trackEvent('game_start',{level:currentLevel()+1,test_mode:testMode})},900)}
function handlePlatformPause(){platformPaused=true;stopGameplay();stopAllSounds();clearTimeout(roomEventTimer);$('roomEvent').classList.remove('show')}
function handlePlatformResume(){platformPaused=false;startGameplay();ensureMusic();scheduleRoomEvent()}
function normalizeCloudState(){
  upgrades.forEach(u=>state.counts[u.id]??=0);
  state.helperUntil??={};
  state.treatUntil??={};
  if(!Array.isArray(state.adTreatUnlocks))state.adTreatUnlocks=[];
  if(!Array.isArray(state.earnedAchievements))state.earnedAchievements=achievements.filter(a=>a.done()).map(a=>a.name);
  if(typeof state.music!=='boolean')state.music=true;
  if(typeof state.sfx!=='boolean')state.sfx=true;
  state.care={hunger:82,mood:78,rest:80,last:Date.now(),nextRequest:Date.now(),request:null,bonusUntil:0,...(state.care||{})};
  state.saveVersion=8;
}
function queueCloudSave(delay=12000){
  if(!cloudSaveReady||!yandexPlayer||testMode||suppressSave||cloudSaveTimer)return;
  cloudSaveTimer=setTimeout(async()=>{
    cloudSaveTimer=null;
    if(cloudSaveInFlight)return queueCloudSave(3000);
    cloudSaveInFlight=true;
    try{await yandexPlayer.setData({[CLOUD_SAVE_KEY]:JSON.parse(JSON.stringify(state))},true)}catch(error){}
    finally{cloudSaveInFlight=false}
  },delay);
}
async function initCloudSave(){
  if(!ysdk||testMode){initialDataReady=true;finishIntroWhenReady();return}
  try{
    yandexPlayer=await ysdk.getPlayer();
    const cloudData=await yandexPlayer.getData([CLOUD_SAVE_KEY]);
    const cloudState=cloudData?.[CLOUD_SAVE_KEY];
    if(cloudState&&typeof cloudState==='object'&&(!hasValidLocalSave||(cloudState.last||0)>(state.last||0))){
      state={...state,...cloudState};
      normalizeCloudState();
      localStorage.setItem(saveKey,JSON.stringify(state));
      renderedLevel=currentLevel();
      updateCare();
      render(true);
      applyLayout();
    }
    cloudSaveReady=true;
    queueCloudSave(1000);
  }catch(error){yandexPlayer=null;cloudSaveReady=false}
  finally{initialDataReady=true;finishIntroWhenReady()}
}
async function initYandexSDK(){try{if(window.YaGames){ysdk=await YaGames.init();const sdkLanguage=ysdk.environment.i18n.lang;applyGameLanguage(queryParams.get('lang')||sdkLanguage);ysdk.on?.('game_api_pause',handlePlatformPause);ysdk.on?.('game_api_resume',handlePlatformResume);await initCloudSave();announceGameReady()}}catch(error){ysdk=null;initialDataReady=true;finishIntroWhenReady()}}
initYandexSDK();
const careRequests={
  hunger:{icon:'🐟',title:'Шеф требует особый перекус',enTitle:'Chef Demands a Special Snack',text:'Обычное кормление считается работой. А это — забота.',enText:'Regular feeding is work. This is personal care.',action:'Подать особый перекус',enAction:'Serve a special snack'},
  mood:{icon:'🪶',title:'Шеф желает развлечений',enTitle:'Chef Requires Entertainment',text:'Перо уже уведомлено о неизбежном поражении.',enText:'The feather has been notified of its inevitable defeat.',action:'Поиграть с пером',enAction:'Play with the feather'},
  rest:{icon:'💤',title:'Шеф устал руководить',enTitle:'Chef Is Tired of Managing',text:'Нужно обеспечить тишину государственного значения.',enText:'Provide silence of national importance.',action:'Уложить Шефа',enAction:'Put Chef to bed'}
};
function updateCare(){const now=Date.now(),hours=Math.min(24,Math.max(0,now-state.care.last)/3600000);state.care.hunger=Math.max(18,state.care.hunger-hours*3);state.care.mood=Math.max(18,state.care.mood-hours*2);state.care.rest=Math.max(18,state.care.rest-hours*2.5);state.care.last=now;if(!state.care.request&&now>=state.care.nextRequest){const types=Object.keys(careRequests);state.care.request=types[Math.floor(Math.random()*types.length)]}}
function updateTreatWish(){const now=Date.now();if(state.treatWish&&(isTreatUnlocked(state.treatWish.index)||now>=state.treatWish.until)){state.treatWish=null;state.nextTreatWish=now+(5+Math.random()*3)*60000}if(!state.treatWish&&now>=state.nextTreatWish){const locked=carpetFood.map((_,index)=>index).filter(index=>index<9&&!isTreatUnlocked(index));if(locked.length){const index=locked[Math.floor(Math.random()*locked.length)],name=itemName(carpetFood[index]);state.treatWish={index,until:now+2*60000};state.nextTreatWish=now+(6+Math.random()*4)*60000;$('phrase').textContent=L(`Шеф требует «${name}». Уровень ждать он, разумеется, не намерен.`,`Chef demands “${name}”. Waiting for the required level is beneath him.`);save()}}}
function adButton(title,subtitle){return `<span class="action-copy"><b>${title}</b><small>${subtitle}</small></span>`}
function renderAd(){const cooldown=Math.max(0,AD_WATCH_COOLDOWN-(Date.now()-lastAdWatch)),boost=Math.max(0,state.adBonusUntil-Date.now()),button=$('rewardedAd');button.classList.toggle('active',boost>0);button.disabled=adRequestPending;if(adRequestPending)button.innerHTML=adButton(L('Загружаем рекламу…','Loading ad…'),L('Награда после просмотра','Reward after viewing'));else if(cooldown>0)button.innerHTML=adButton(L(`До просмотра рекламы: ${Math.ceil(cooldown/1000)} сек.`,`Ad available in ${Math.ceil(cooldown/1000)} sec.`),boost>0?L(`Доход ×3 ещё ${Math.ceil(boost/60000)} мин.`,`Income ×3 for ${Math.ceil(boost/60000)} more min.`):L('Общий таймер для всех наград','Shared timer for all rewards'));else button.innerHTML=adButton(L('🎬 Смотреть рекламу','🎬 Watch ad'),L(`+${format(adRewardAmount())} рыбов · доход ×3 на 5 мин.`,`+${format(adRewardAmount())} fish · income ×3 for 5 min.`))}
function isTreatUnlocked(index){return currentLevel()+1>=treatUnlockLevels[index]||state.adTreatUnlocks.includes(index)}
function isPremiumTreat(index){return index>=9}
function isTreatVisible(index){const treat=carpetFood[index];return !isPremiumTreat(index)||currentLevel()+1>=(treat.revealLevel||1)}
function canUnlockTreatWithAd(index){const treat=carpetFood[index];return currentLevel()+1>=(treat.adLevel||1)}
function activeBuffet(){const now=Date.now(),index=carpetFood.findIndex((treat,i)=>treat.buffet&&(state.treatUntil[i]||0)>now);return index<0?null:{index,treat:carpetFood[index]}}
function buffetImage(active){if(!active)return null;const clicks=state.buffetClicks[active.index]||0,[halfAt,emptyAt]=active.treat.stageClicks;const stage=clicks>=emptyAt?'empty':clicks>=halfAt?'half':'full';return `assets/images/buffets/sushi-ship-${stage}.webp`}
function treatCardImage(treat){return treat.buffet?'assets/images/buffets/sushi-ship-full.webp':`assets/images/food-${treat.img}.png`}
function renderTreatWish(){const wish=state.treatWish;$('openCare').classList.toggle('has-request',!!state.care.request||!!wish);$('treats').querySelectorAll('.treat-card').forEach(button=>{const index=+button.dataset.treat;if(isTreatUnlocked(index))return;button.classList.remove('wished');button.querySelector('b').textContent=isPremiumTreat(index)?L('Секретное блюдо','Secret dish'):itemName(carpetFood[index]);button.querySelector('strong').textContent=L('🎬 ОТКРЫТЬ ЗА РЕКЛАМУ','🎬 UNLOCK WITH AD')});if(!wish)return;const button=$('treats').querySelector(`[data-treat="${wish.index}"]`);if(!button)return;button.classList.add('wished');button.querySelector('b').textContent=itemName(carpetFood[wish.index]);button.querySelector('strong').textContent=L('ШЕФ ПРОСИТ · 🎬 ЗА РЕКЛАМУ','CHEF WANTS IT · 🎬 WATCH AD')}
function renderCare(updateTreats=false){updateCare();['hunger','mood','rest'].forEach(key=>{const value=Math.round(state.care[key]);$(`${key}Bar`).style.width=`${value}%`;$(`${key}Value`).textContent=`${value}%`});const request=state.care.request?careRequests[state.care.request]:null;$('openCare').classList.toggle('has-request',!!request);$('careRequestIcon').textContent=request?.icon||'🐾';$('careRequestTitle').textContent=request?(gameLanguage==='en'?request.enTitle:request.title):L('Шеф обдумывает пожелания','Chef Is Considering His Demands');$('careRequestText').textContent=request?(gameLanguage==='en'?request.enText:request.text):L('Он сообщит, когда потребуется персонал.','He will notify the staff when needed.');$('careAction').textContent=request?(gameLanguage==='en'?request.enAction:request.action):L('Ожидаем распоряжений','Awaiting orders');$('careAction').disabled=!request;const remaining=Math.max(0,state.care.bonusUntil-Date.now());$('careBonus').classList.toggle('active',remaining>0);$('careBonus').textContent=remaining>0?L(`Забота одобрена: доход ×2 ещё ${Math.ceil(remaining/60000)} мин.`,`Care approved: income ×2 for ${Math.ceil(remaining/60000)} more min.`):L('Бонус заботы пока не действует.','Care bonus is not active.');if(updateTreats||!$('treats').children.length)$('treats').innerHTML=carpetFood.map((treat,index)=>{if(!isTreatVisible(index))return'';const left=Math.max(0,(state.treatUntil[index]||0)-Date.now()),active=left>0,unlocked=isTreatUnlocked(index),premium=isPremiumTreat(index),adReady=canUnlockTreatWithAd(index),cost=treatPrice(treat);return `<button class="treat-card ${active?'active':!unlocked?`ad-locked ${premium?'secret':''}`:state.food<cost?'locked':''}" data-treat="${index}"><img src="${treatCardImage(treat)}" alt=""><span><b>${unlocked||!premium?itemName(treat):L('Секретное блюдо','Secret dish')}</b><small>${left?L(`На ковре ещё ${Math.ceil(left/60000)} мин.`,`${Math.ceil(left/60000)} min. left on the carpet`):unlocked?L(`Эффект на ${treat.minutes} мин.`,`Effect for ${treat.minutes} min.`):!adReady?L(`Реклама откроется на уровне ${treat.adLevel}`,`Ad unlock available at level ${treat.adLevel}`):L(`Автоматически на уровне ${treatUnlockLevels[index]}`,`Automatic at level ${treatUnlockLevels[index]}`)}</small></span><strong>${active?L('УЖЕ ПОДАНО','ALREADY SERVED'):unlocked?`🐟 ${format(cost)}`:adReady?L('🎬 ОТКРЫТЬ ЗА РЕКЛАМУ','🎬 UNLOCK WITH AD'):L('ПОКА СКРЫТО','STILL HIDDEN')}</strong></button>`}).join('')}
function currentLevel(){let i=0;levels.forEach((l,n)=>{if(state.total>=l.at)i=n});return i}
const achievementQueue=[];
let achievementShowing=false,achievementDelayTimer;
function showNextAchievement(){if(achievementShowing||!achievementQueue.length)return;if($('levelCelebration').classList.contains('show')){if(!achievementDelayTimer)achievementDelayTimer=setTimeout(()=>{achievementDelayTimer=null;showNextAchievement()},2850);return}achievementShowing=true;const award=achievementQueue.shift();$('achievementToastIcon').textContent=award.icon;$('achievementToastTitle').textContent=itemName(award);$('achievementToastText').textContent=itemDesc(award);$('achievementToast').classList.add('show');setTimeout(()=>playSound('reward',.62),350);setTimeout(()=>{$('achievementToast').classList.remove('show');setTimeout(()=>{achievementShowing=false;showNextAchievement()},350)},3600)}
function checkAchievements(){achievements.forEach(award=>{if(award.done()&&!state.earnedAchievements.includes(award.name)){state.earnedAchievements.push(award.name);achievementQueue.push(award);trackEvent('achievement_unlocked',{achievement:award.name})}});if(achievementQueue.length){save();showNextAchievement()}}
let levelCelebrationTimer;
function showLevelCelebration(levelIndex){clearTimeout(levelCelebrationTimer);$('levelCelebrationTitle').textContent=`${levelIndex+1} · ${itemName(levels[levelIndex])}`;$('levelCelebration').classList.remove('show');void $('levelCelebration').offsetWidth;$('levelCelebration').classList.add('show');levelCelebrationTimer=setTimeout(()=>$('levelCelebration').classList.remove('show'),2700)}
function returnToSceneForLevel(levelIndex){document.querySelectorAll('.shop.open').forEach(panel=>{panel.classList.remove('open');panel.setAttribute('aria-hidden','true')});document.querySelectorAll('.nav-button').forEach(button=>button.classList.toggle('active',button.id==='openFeed'));playSound('level',.9);showLevelCelebration(levelIndex);setTimeout(()=>playPurr(true),2100)}
let renderedLevel=currentLevel();
function render(updatePanels=false){
  $('food').textContent=format(state.food); $('perClick').textContent=L(`+${format(perClick())} рыбов`,`+${format(perClick())} fish`);
  renderAd();
  updateTreatWish();
  $('income').textContent=format(cps()); const li=currentLevel();
  if(li!==renderedLevel){state.outfit=null;const advanced=li>renderedLevel;renderedLevel=li;if(advanced)returnToSceneForLevel(li);trackEvent(`level_${li+1}`);save();updatePanels=true}
  const level=levels[li],next=levels[li+1];
  const roomStage=li===levels.length-1?4:li>=10?3:li>=8?2:li>=4?1:0;
  document.querySelector('.game').style.setProperty('--room-bg',`url("${rooms[roomStage]}")`);
  document.querySelector('.game').style.setProperty('--room-bg-desktop',`url("${desktopRooms[roomStage]}")`);
  document.querySelector('.game').classList.toggle('cosmic-final',li===levels.length-1);
  $('level').textContent=`${li+1} · ${itemName(level)}`;
  const chosen=outfits.find(o=>o.id===state.outfit&&li>=o.unlock);
  const catImage=chosen?chosen.img:level.img;
  if($('catBody').getAttribute('src')!==catImage)$('catBody').src=catImage;
  const buffet=activeBuffet();
  const bowlImage=buffetImage(buffet)||bowlImages[Math.min(li,bowlImages.length-1)];
  if($('bowl').getAttribute('src')!==bowlImage)$('bowl').src=bowlImage;
  $('bowl').classList.toggle('buffet-active',!!buffet);
  $('catBody').style.transform=`scale(${chosen?.scale??level.scale})`;
  $('catBody').style.filter=chosen?.filter??level.filter??'';
  $('levelProgress').style.width=next?`${Math.min(100,(state.total-level.at)/(next.at-level.at)*100)}%`:'100%';
  if(updatePanels)$('upgrades').innerHTML=upgrades.map(u=>`<button class="upgrade ${state.food<price(u)?'locked':''}" data-id="${u.id}"><span class="icon">${u.icon}</span><span><b>${itemName(u)} · ${state.counts[u.id]}</b><small>${itemDesc(u)}</small></span><span class="price">🐟 ${format(price(u))}</span></button>`).join('');
  $('bowl').classList.toggle('upgraded',state.counts.bowl>0);
  [...$('foodDecor').children].forEach(item=>item.classList.toggle('visible',(state.treatUntil[+item.dataset.treatIndex]||0)>Date.now()));
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
  if(updatePanels)$('outfits').innerHTML=outfits.map(o=>{const unlocked=li>=o.unlock,active=(chosen?chosen.id:null)===o.id;return `<button class="outfit-card ${unlocked?'':'locked'} ${active?'selected':''}" data-outfit="${o.id}"><img src="${o.img}" alt=""><b>${unlocked?itemName(o):L('Секретный образ','Secret outfit')}</b><small>${unlocked?(active?L('Надето','Equipped'):L('Надеть','Wear')):L(`Откроется на уровне ${o.unlock+1}`,`Unlocks at level ${o.unlock+1}`)}</small></button>`}).join('');
  if(updatePanels)$('achievements').innerHTML=achievements.map(a=>`<article class="achievement ${a.done()?'earned':'locked'}"><span>${a.done()?a.icon:'❔'}</span><div><b>${itemName(a)}</b><small>${itemDesc(a)}</small></div><strong>${a.done()?L('Получено','Earned'):L('Не открыто','Locked')}</strong></article>`).join('');
  if(updatePanels||$('care').classList.contains('open'))renderCare(updatePanels);
  renderTreatWish();
  checkAchievements();
}
let lastClickPhrase=0;
function feed(e){if(gameIsPaused()||document.querySelector('.game').classList.contains('layout-mode'))return;const buffet=activeBuffet(),gain=perClick()*(buffet?.treat.clickMultiplier||1),before=currentLevel();state.food+=gain;state.total+=gain;if(buffet){state.buffetClicks[buffet.index]=(state.buffetClicks[buffet.index]||0)+1;const clicks=state.buffetClicks[buffet.index];if(clicks===1){$('phrase').textContent=L('Корабль принят. Экипаж свободен.','The ship is accepted. The crew may leave.');showCatThought('happy',L('О, любимая рыбка.','Oh, my favorite fish.'))}else if(clicks===buffet.treat.stageClicks[1]){$('phrase').textContent=L('Шеф проявил умеренность. Почти.','Chef has shown restraint. Almost.');showCatThought('happy',L('Корабль пропал без вести.','The ship has gone missing.'))}}const after=currentLevel();if(after<=before){playFeedSound();if(after===levels.length-1)playPurr()}const cat=$('cat'),bowl=$('bowl');cat.classList.add('bop');bowl.classList.add('served');setTimeout(()=>{cat.classList.remove('bop');bowl.classList.remove('served')},180);if(after>before){$('phrase').textContent=after===12?L('Шеф официально перешёл к заслуженному отдыху. Государственные дела подождут.','Chef has officially entered well-earned retirement. Affairs of state can wait.'):after===13?L('Достигнута абсолютная сытость. Шеф доволен и продолжает принимать рыбов.','Absolute satisfaction achieved. Chef is pleased and continues accepting fish.'):L(`Новый статус: «${itemName(levels[after])}». Шеф ожидал этого раньше.`,`New status: “${itemName(levels[after])}”. Chef expected it sooner.`);lastClickPhrase=Date.now()}else if(!buffet&&Date.now()-lastClickPhrase>18000&&Math.random()<.06){const pool=gameLanguage==='en'?englishPhrases:phrases;$('phrase').textContent=pool[Math.floor(Math.random()*pool.length)];lastClickPhrase=Date.now()}const f=document.createElement('span');f.className='floater';f.textContent=`+${format(gain)} 🐟`;f.style.left=`${e?.clientX||innerWidth/2}px`;f.style.top=`${e?.clientY||innerHeight/2}px`;$('floaters').append(f);setTimeout(()=>f.remove(),850);render(after>before)}
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
function renderSettings(){const music=$('toggleMusic'),effects=$('toggleEffects');music.classList.toggle('enabled',state.music);effects.classList.toggle('enabled',state.sfx);music.querySelector('strong').textContent=state.music?L('ВКЛ','ON'):L('ВЫКЛ','OFF');effects.querySelector('strong').textContent=state.sfx?L('ВКЛ','ON'):L('ВЫКЛ','OFF')}
$('openSettings').addEventListener('click',()=>{showPanel('settings');renderSettings()});
$('closeSettings').addEventListener('click',()=>showPanel(null,'openFeed'));
$('toggleMusic').addEventListener('click',()=>{state.music=!state.music;if(state.music){backgroundMusic.volume=MUSIC_VOLUME;ensureMusic()}else{clearInterval(musicRampTimer);clearTimeout(duckRestoreTimer);backgroundMusic.pause()}renderSettings();save()});
$('toggleEffects').addEventListener('click',()=>{state.sfx=!state.sfx;if(!state.sfx)stopEffects();renderSettings();save()});
let pendingRewardedAction=null;
function closeRewardConfirm(){pendingRewardedAction=null;$('rewardConfirm').classList.remove('show');$('rewardConfirm').setAttribute('aria-hidden','true')}
function confirmRewardedAction(title,text,action){pendingRewardedAction=action;$('rewardConfirmTitle').textContent=title;$('rewardConfirmText').textContent=text;$('rewardConfirm').classList.add('show');$('rewardConfirm').setAttribute('aria-hidden','false');$('rewardConfirmWatch').focus()}
$('rewardConfirmCancel').addEventListener('click',closeRewardConfirm);
$('rewardConfirmWatch').addEventListener('click',()=>{const action=pendingRewardedAction;closeRewardConfirm();action?.()});
$('rewardConfirm').addEventListener('click',e=>{if(e.target===$('rewardConfirm'))closeRewardConfirm()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('rewardConfirm').classList.contains('show'))closeRewardConfirm()});
$('treats').addEventListener('click',e=>{const button=e.target.closest('.treat-card');if(!button)return;const index=+button.dataset.treat;if(isTreatUnlocked(index))return;e.stopImmediatePropagation();const treat=carpetFood[index],name=itemName(treat);if(!canUnlockTreatWithAd(index)){$('phrase').textContent=L(`Секретное блюдо пока не раскрывает условий. Возвращайтесь на уровне ${treat.adLevel}.`,`The secret dish is not revealing its terms yet. Return at level ${treat.adLevel}.`);playSound('error',.4);return}const hiddenName=isPremiumTreat(index)?L('секретное блюдо','secret dish'):name;confirmRewardedAction(L(`Открыть «${hiddenName}» за рекламу?`,`Unlock “${hiddenName}” by watching an ad?`),L('Посмотрите ролик полностью — блюдо откроется навсегда, и его можно будет покупать за рыбов.','Watch the full video to unlock this dish permanently. You can then buy it with fish.'),()=>showRewardedAction({event:'treat_unlock',onReward:()=>{state.adTreatUnlocks.push(index);if(state.treatWish?.index===index){state.treatWish=null;state.nextTreatWish=Date.now()+(6+Math.random()*4)*60000}},success:L(`«${name}» открыто навсегда. Теперь его можно купить за рыбов.`,`“${name}” is permanently unlocked. You can now buy it with fish.`)}))},true);
$('treats').addEventListener('click',e=>{const button=e.target.closest('.treat-card');if(!button)return;updateCare();const index=+button.dataset.treat,treat=carpetFood[index],name=itemName(treat),cost=treatPrice(treat);if((state.treatUntil[index]||0)>Date.now()){$('phrase').textContent=L(`«${name}» уже подано. Сначала Шеф должен закончить трапезу.`,`“${name}” is already served. Chef must finish this course first.`);return}if(treat.buffet&&activeBuffet()){$('phrase').textContent=L('Один фуршет за раз. Шеф настаивает на порядке подачи.','One buffet at a time. Chef insists on proper service.');return}if(state.food<cost){playSound('error',.45);$('phrase').textContent=L(`Для «${name}» не хватает ${format(cost-state.food)} рыбов.`,`You need ${format(cost-state.food)} more fish for “${name}”.`);return}if(!treat.buffet&&state.care.hunger>75&&Math.random()<.18){playSound('cat-soft',.6);$('cat').classList.add('refuses');$('bowl').classList.add('refused');$('phrase').textContent=L('Шеф отвернулся: сейчас он сыт даже для собственного аппетита. Рыбов не списано.','Chef turned away: he is too full even for his own appetite. No fish were spent.');setTimeout(()=>{$('cat').classList.remove('refuses');$('bowl').classList.remove('refused')},850);trackEvent('treat_refused',{treat:treat.name});return}state.food-=cost;state.care.hunger=Math.min(100,state.care.hunger+10);state.care.mood=Math.min(100,state.care.mood+4);state.treatUntil[index]=Date.now()+treat.minutes*60000;if(treat.buffet)state.buffetClicks[index]=0;$('cat').classList.add('feasting');$('bowl').classList.add('served');setTimeout(()=>{$('cat').classList.remove('feasting');$('bowl').classList.remove('served')},650);playFeedSound();if(treat.buffet){playSound('cat-soft',.62);$('phrase').textContent=L('Это всё мне? Можете не отвечать.','Is all this for me? No need to answer.')}else{$('phrase').textContent=L(`«${name}» подано. Ковёр временно стал фуршетным залом.`,`“${name}” has been served. The carpet is now a temporary banquet hall.`);setTimeout(()=>playPurr(),450)}trackEvent('treat_served',{treat:treat.name,minutes:treat.minutes});save();render(true)});
$('careAction').addEventListener('click',()=>{updateCare();const type=state.care.request;if(!type)return;if(type==='hunger'){const cost=Math.max(10,perClick()*8);if(state.food<cost){playSound('error');$('careRequestText').textContent=L(`Для особого перекуса не хватает ${format(cost-state.food)} рыбов.`,`The special snack needs ${format(cost-state.food)} more fish.`);return}state.food-=cost}state.care[type]=Math.min(100,state.care[type]+32);state.care.request=null;state.care.bonusUntil=Date.now()+5*60*1000;state.care.nextRequest=Date.now()+(2+Math.random())*3600000;playSound('reward',.75);if(type==='hunger')playPurr();else playSound(type==='mood'?'cat-happy-2':'cat-soft',.72);$('phrase').textContent=type==='hunger'?L('Особый перекус принят. Шеф великодушно не оставил ни крошки.','Special snack accepted. Chef generously left no crumbs.'):type==='mood'?L('Перо побеждено. Настроение руководства улучшилось.','The feather was defeated. Management morale improved.'):L('Тишина объявлена государственной необходимостью.','Silence has been declared a matter of national importance.');save();render(true)});
const AD_WATCH_COOLDOWN=120000,AD_DRAWER_INTERVAL=120000;
let lastAdWatch=+(localStorage.getItem('absurd8-last-ad-watch')||0),adDrawerTimer,adAutoPeekTimer;
function peekAdDrawer(){clearTimeout(adAutoPeekTimer);$('adDrawer').classList.add('peek')}
function showAdDrawer(){if(gameIsPaused())return false;clearTimeout(adAutoPeekTimer);$('adDrawer').classList.remove('peek');adAutoPeekTimer=setTimeout(peekAdDrawer,10000);return true}
function scheduleAdDrawer(delay=AD_DRAWER_INTERVAL){clearTimeout(adDrawerTimer);adDrawerTimer=setTimeout(()=>{showAdDrawer();scheduleAdDrawer()},delay)}
function showRewardedAction({event,onReward,success}){if(adRequestPending)return;const remaining=AD_WATCH_COOLDOWN-(Date.now()-lastAdWatch);if(remaining>0){playSound('error',.45);const message=L(`Следующая реклама будет доступна через ${Math.ceil(remaining/1000)} сек.`,`The next ad will be available in ${Math.ceil(remaining/1000)} sec.`);$('phrase').textContent=message;$('adStatus').textContent=message;return}if(!ysdk?.adv){playSound('error');const message=L('Реклама будет доступна после запуска игры на Яндекс Играх.','Ads will be available after launching the game on Yandex Games.');$('phrase').textContent=message;$('adStatus').textContent=message;return}adRequestPending=true;trackEvent(`${event}_clicked`);renderAd();let rewarded=false;const fail=()=>{adRequestPending=false;resumeGameAfterAd();playSound('error');const message=L('Сейчас реклама недоступна. Попробуйте немного позже.','Ads are unavailable right now. Please try again later.');$('phrase').textContent=message;$('adStatus').textContent=message;render(true)};try{const result=ysdk.adv.showRewardedVideo({callbacks:{onOpen:()=>{lastAdWatch=Date.now();localStorage.setItem('absurd8-last-ad-watch',String(lastAdWatch));pauseGameForAd();$('adStatus').textContent=L('Просмотр начался. Награда будет выдана после завершения.','Video started. The reward will be granted after completion.')},onRewarded:()=>{rewarded=true;onReward();trackEvent(`${event}_rewarded`);save()},onClose:()=>{adRequestPending=false;resumeGameAfterAd();if(rewarded)playSound('reward');const message=rewarded?success:L('Просмотр не завершён — награда не выдана.','Video not completed — no reward was granted.');$('phrase').textContent=message;$('adStatus').textContent=message;render(true)},onError:fail}});result?.catch?.(fail)}catch(error){fail()}}
function mainRewardedAdClick(){if(adRequestPending)return;const cooldown=AD_WATCH_COOLDOWN-(Date.now()-lastAdWatch);if(cooldown>0){const message=L(`Следующая реклама будет доступна через ${Math.ceil(cooldown/1000)} сек.`,`The next ad will be available in ${Math.ceil(cooldown/1000)} sec.`);$('phrase').textContent=message;$('adStatus').textContent=message;return}const instantReward=adRewardAmount();confirmRewardedAction(L('Получить добавку за просмотр рекламы?','Get a bonus for watching an ad?'),L(`Посмотрите ролик полностью — Шеф получит ${format(instantReward)} рыбов, а доход увеличится в 3 раза на 5 минут.`,`Watch the full video — Chef will receive ${format(instantReward)} fish and income will be tripled for 5 minutes.`),()=>{peekAdDrawer();showRewardedAction({event:'ad',onReward:()=>{state.food+=instantReward;state.total+=instantReward;state.adBonusUntil=Date.now()+5*60*1000},success:L(`Спонсор выделил ${format(instantReward)} рыбов. Доход ×3 на 5 минут.`,`The sponsor allocated ${format(instantReward)} fish. Income ×3 for 5 minutes.`)})})}
$('adDrawer').addEventListener('click',e=>{
  if(e.target.closest('#adClose')){e.stopPropagation();peekAdDrawer();return}
  if($('adDrawer').classList.contains('peek'))showAdDrawer();
  else mainRewardedAdClick();
});
$('outfits').addEventListener('click',e=>{const card=e.target.closest('.outfit-card');if(!card)return;const outfit=outfits.find(o=>o.id===card.dataset.outfit);if(currentLevel()<outfit.unlock){$('phrase').textContent=L('Шеф ещё не заслужил этот наряд. Хотя он с этим не согласен.','Chef has not earned this outfit yet. He strongly disagrees.');return}state.outfit=outfit.id;$('phrase').textContent=L(`Шеф выбрал: «${itemName(outfit)}». Публика может аплодировать.`,`Chef chose “${itemName(outfit)}”. The audience may applaud.`);save();render(true)});
$('upgrades').addEventListener('click',e=>{const b=e.target.closest('.upgrade');if(!b)return;const u=upgrades.find(x=>x.id===b.dataset.id),p=price(u);if(state.food>=p){state.food-=p;state.counts[u.id]++;playSound('buy',.7);if(['grandma','chef','delivery','mouse','laser'].includes(u.id))state.helperUntil[u.id]=Math.max(Date.now(),state.helperUntil[u.id]||0)+5*60*1000;if(u.id==='box')state.helperUntil.box=Math.max(Date.now(),state.helperUntil.box||0)+10*60*1000;if(u.id==='ministry')state.helperUntil.ministry=Math.max(Date.now(),state.helperUntil.ministry||0)+15*60*1000;const message=u.id==='ministry'?L(`Министерский запас и сертификат выданы на ${Math.ceil((state.helperUntil.ministry-Date.now())/60000)} мин.`,`Ministry reserves and certificate issued for ${Math.ceil((state.helperUntil.ministry-Date.now())/60000)} min.`):L(`Куплено: «${itemName(u)}» · уровень ${state.counts[u.id]}.`,`Purchased: “${itemName(u)}” · level ${state.counts[u.id]}.`);$('phrase').textContent=message;$('shopMessage').textContent=message;$('shopMessage').className='panel-message success';trackEvent('upgrade_bought',{upgrade:u.id,level:state.counts[u.id]});save();render(true);if(['grandma','chef','delivery'].includes(u.id)){$('shop').classList.remove('open');$('shop').setAttribute('aria-hidden','true')}}else{playSound('error');const message=L(`Не хватает ${format(p-state.food)} рыбов.`,`You need ${format(p-state.food)} more fish.`);$('phrase').textContent=message;$('shopMessage').textContent=message;$('shopMessage').className='panel-message warning';showAdDrawer();b.classList.add('nope');setTimeout(()=>b.classList.remove('nope'),300)}});
$('roomEvent').addEventListener('click',()=>{const toy=$('roomEvent');if(!toy.classList.contains('show'))return;const reward=Math.max(10,perClick()*12);state.food+=reward;state.total+=reward;playSound(toy.dataset.sound||'reward',.9);if(Math.random()<.45)playSound(Math.random()<.5?'cat-happy-2':'cat-soft',.68);$('phrase').textContent=toy.dataset.phrase;toy.classList.remove('show');save();render();scheduleRoomEvent()});
$('roomEvent').addEventListener('contextmenu',e=>e.preventDefault());
const roomEvents=[
  {img:'assets/images/events/yarn.png',sound:'toy-yarn',phrase:'Клубок обезврежен. Он слишком много знал.',enPhrase:'The yarn has been neutralized. It knew too much.'},
  {img:'assets/images/events/mouse.png',sound:'toy-mouse',phrase:'Мышь внесла добровольный взнос и скрылась.',enPhrase:'The mouse made a voluntary contribution and vanished.'},
  {img:'assets/images/events/slipper.png',sound:'toy-slipper',phrase:'Найден тапок. Второй объявлен в розыск.',enPhrase:'One slipper found. The other is now wanted.'},
  {img:'assets/images/events/feather-v2.png',sound:'toy-feather',phrase:'Перо поймано. Шеф утверждает, что это была охота.',enPhrase:'Feather captured. Chef insists it was a hunt.'},
  {img:'assets/images/events/fish.png',sound:'toy-fish',phrase:'Рыбка сама пришла устраиваться на работу.',enPhrase:'The fish reported for duty on its own.'}
];
let roomEventTimer;
function pauseGameForAd(){adPlaying=true;stopGameplay();stopAllSounds();clearTimeout(roomEventTimer);$('roomEvent').classList.remove('show')}
function resumeGameAfterAd(){if(!adPlaying)return;adPlaying=false;startGameplay();ensureMusic();scheduleRoomEvent()}
function scheduleRoomEvent(first=false){clearTimeout(roomEventTimer);roomEventTimer=setTimeout(()=>{const event=roomEvents[Math.floor(Math.random()*roomEvents.length)],toy=$('roomEvent');toy.innerHTML=`<img src="${event.img}" alt="">`;toy.dataset.phrase=gameLanguage==='en'?event.enPhrase:event.phrase;toy.dataset.sound=event.sound;toy.style.setProperty('--event-x',`${12+Math.random()*72}%`);toy.style.setProperty('--event-y',`${30+Math.random()*38}%`);toy.classList.add('show');setTimeout(()=>{if(toy.classList.contains('show')){toy.classList.remove('show');scheduleRoomEvent()}},9000)},first?5000:18000+Math.random()*18000)}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){trackEvent('game_hidden',{level:currentLevel()+1,total:Math.floor(state.total)});stopGameplay();stopAllSounds()}else{startGameplay();ensureMusic()}});
document.addEventListener('contextmenu',e=>e.preventDefault());
const layoutItems=[...document.querySelectorAll('.layout-item')];
const layoutStage=document.querySelector('.helper-stage');
function layoutProfile(){if(innerWidth>=1100)return'desktop';if(innerWidth>=760)return'tablet';if(innerWidth<=390)return'mobile-small';return'mobile-large'}
const layoutKey=()=>`absurd8-layout-v4-${layoutProfile()}`;
const defaultLayouts={
  desktop:{certificateDecor:{z:-5,hidden:false,left:55.19,top:13.5,width:9.99},grandmaHelper:{z:0,hidden:false,left:24.71,top:23.21,width:10.09},mouseDecor:{z:0,hidden:false,left:1.44,top:0,width:4.91},boxDecor:{z:-5,hidden:false,left:9.78,top:58.09,width:11.65},chefHelper:{z:0,hidden:false,left:80.23,top:22.64,width:18.32},deliveryHelper:{z:2,hidden:false,left:0,top:43.01,width:18.19},laserDecor:{z:0,hidden:false,left:21.9,top:97,width:3},cat:{z:0,hidden:false,dx:-1.25,dy:5.67,scale:.8},bowl:{z:0,hidden:false,dx:-.38,dy:2.14,scale:1.4},foodProp1:{z:0,hidden:false,left:23.48,top:87.11,width:5},foodProp2:{z:0,hidden:false,left:21.74,top:70.8,width:5},foodProp3:{z:0,hidden:false,left:70.8,top:85.78,width:4},foodProp4:{z:-1,hidden:false,left:76.76,top:82.89,width:14},foodProp5:{z:0,hidden:false,left:27.53,top:62.85,width:15.99},foodProp6:{z:0,hidden:false,left:60.26,top:62.74,width:13.99},foodProp7:{z:0,hidden:false,left:17.62,top:75.47,width:5},foodProp8:{z:-1,hidden:false,left:3.39,top:83.35,width:9.99},foodProp9:{z:0,hidden:false,left:55.71,top:69.24,width:13},foodPileDecor:{z:-5,hidden:false,left:47.37,top:26.02,width:16.97},roomEvent:{z:0,hidden:false,dx:-14.43,dy:-25.29,scale:1},phrase:{z:-1,hidden:false,dx:0,dy:0,scale:1}},
  tablet:{certificateDecor:{left:52.79,top:.32,width:19.99},grandmaHelper:{left:6.84,top:13.35,width:24.09},mouseDecor:{left:0,top:12.51,width:12},boxDecor:{left:69.96,top:75.19,width:30.04},chefHelper:{left:63.67,top:17.82,width:36.33},deliveryHelper:{left:1.64,top:54.73,width:34.21},laserDecor:{left:34.28,top:93.7,width:1.74},cat:{dx:-1.61,dy:2.92,scale:1},bowl:{dx:1.49,dy:.55,scale:1.1},foodProp2:{left:82.36,top:59.04,width:13},foodProp4:{left:49.29,top:79.11,width:22},foodProp5:{left:2,top:52,width:20},foodProp6:{left:5.88,top:75.6,width:26},foodProp7:{left:70.85,top:57.92,width:11},foodProp8:{left:62.44,top:71.75,width:18},foodProp9:{left:32.66,top:80.41,width:15},foodPileDecor:{left:26.78,top:7.49,width:48.98}},
  'mobile-small':{certificateDecor:{left:39.93,top:2.69,width:36},cat:{dx:-5.96,dy:7.75,scale:.7},bowl:{dx:-1.25,dy:-2.05,scale:.8},mouseDecor:{left:0,top:19.07,width:16.29},boxDecor:{left:67.96,top:68.17,width:32.04},chefHelper:{left:59.68,top:20.16,width:40.32},grandmaHelper:{left:6.71,top:25.44,width:26.08},deliveryHelper:{left:0,top:60.3,width:36.2},laserDecor:{left:34.28,top:93.7,width:1.74},foodProp3:{left:4.36,top:80.08,width:12},foodProp4:{left:75.34,top:88.12,width:24},foodProp5:{left:0,top:55.61,width:20},foodProp6:{left:11.97,top:72.72,width:26},foodProp7:{left:82.15,top:56.11,width:11},foodProp8:{left:64.13,top:67.31,width:18},foodProp9:{left:54.82,top:79.15,width:21},foodPileDecor:{left:27.49,top:20,width:51}},
  'mobile-large':{certificateDecor:{left:43,top:1.5,width:32},cat:{dx:-2,dy:6.52,scale:.82},bowl:{dx:.76,dy:1.9,scale:.88},mouseDecor:{left:0,top:16.5,width:14.5},boxDecor:{left:70,top:68,width:30},chefHelper:{left:62,top:20,width:38},grandmaHelper:{left:7,top:25,width:25},deliveryHelper:{left:0,top:60,width:34},laserDecor:{left:34.28,top:93.7,width:1.74},foodProp3:{left:4,top:80,width:10},foodProp4:{left:76,top:87,width:22},foodProp5:{left:0,top:54,width:18},foodProp6:{left:12,top:72,width:24},foodProp7:{left:81,top:55,width:10},foodProp8:{left:64,top:67,width:17},foodProp9:{left:55,top:79,width:19},foodPileDecor:{left:28.5,top:17,width:49}}
};
let selectedLayoutItem=null;
function readLayout(){const profile=layoutProfile();try{return {...defaultLayouts[profile],...JSON.parse(localStorage.getItem(layoutKey())||'{}')}}catch(e){return {...defaultLayouts[profile]}}}
function itemStage(item){return item.dataset.layoutMode==='offset'?document.querySelector('.game'):(item.closest('.food-decor,.helper-stage')||layoutStage)}
function applyLayout(){const saved=readLayout();layoutItems.forEach(item=>{const pos=saved[item.id];if(!pos)return;item.style.zIndex=pos.z??'';item.style.visibility=pos.hidden?'hidden':'';if(item.dataset.layoutMode==='offset'){item.style.setProperty('--layout-x',`${pos.dx||0}vw`);item.style.setProperty('--layout-y',`${pos.dy||0}dvh`);item.style.setProperty('--layout-scale',pos.scale||1);return}const isFood=item.classList.contains('food-prop'),safeLeft=isFood?Math.max(0,Math.min(100-(pos.width||10),pos.left)):pos.left,safeTop=isFood?Math.max(5,Math.min(90,pos.top)):pos.top;item.style.left=`${safeLeft}%`;item.style.top=`${safeTop}%`;item.style.right='auto';item.style.bottom='auto';item.style.width=`${pos.width}%`;item.style.height=item.id==='laserDecor'?`${pos.width}%`:'auto'})}
function saveLayoutItem(item){const saved=readLayout(),previous=saved[item.id]||{},common={z:+item.style.zIndex||previous.z||0,hidden:previous.hidden||false};if(item.dataset.layoutMode==='offset'){saved[item.id]={...common,dx:+(parseFloat(item.style.getPropertyValue('--layout-x'))||0).toFixed(2),dy:+(parseFloat(item.style.getPropertyValue('--layout-y'))||0).toFixed(2),scale:+(parseFloat(item.style.getPropertyValue('--layout-scale'))||1).toFixed(2)}}else{const stageRect=itemStage(item).getBoundingClientRect(),rect=item.getBoundingClientRect();saved[item.id]={...common,left:+((rect.left-stageRect.left)/stageRect.width*100).toFixed(2),top:+((rect.top-stageRect.top)/stageRect.height*100).toFixed(2),width:+(rect.width/stageRect.width*100).toFixed(2)}}localStorage.setItem(layoutKey(),JSON.stringify(saved))}
function updateLayoutControls(){if(!selectedLayoutItem){$('layoutStatus').textContent='выберите предмет';$('layoutLayer').textContent='Слой: —';return}const pos=readLayout()[selectedLayoutItem.id]||{},z=+selectedLayoutItem.style.zIndex||pos.z||0;$('layoutStatus').textContent=`${selectedLayoutItem.dataset.layoutName} · перетащите мышью`;$('layoutLayer').textContent=`Слой: ${z}`;$('toggleLayoutVisibility').textContent=pos.hidden?'Показать':'Скрыть';$('layoutSelect').value=selectedLayoutItem.id}
function selectLayoutItem(item){selectedLayoutItem=item;layoutItems.forEach(x=>{x.classList.toggle('selected-layout',x===item);x.classList.toggle('layout-editing',x===item)});updateLayoutControls()}
function setLayoutMode(on){document.querySelector('.game').classList.toggle('layout-mode',on);$('layoutTools').setAttribute('aria-hidden',on?'false':'true');if(on&&!selectedLayoutItem)selectLayoutItem(layoutItems[0]);if(!on)selectLayoutItem(null)}
$('layoutSelect').innerHTML=layoutItems.map(item=>`<option value="${item.id}">${item.dataset.layoutName}</option>`).join('');
$('layoutSelect').addEventListener('change',e=>selectLayoutItem($(e.target.value)));
$('layoutToggle').addEventListener('click',()=>{playSound('ui-click');setLayoutMode(!document.querySelector('.game').classList.contains('layout-mode'))});
$('closeLayout').addEventListener('click',()=>setLayoutMode(false));
layoutItems.forEach(item=>item.addEventListener('pointerdown',e=>{if(!document.querySelector('.game').classList.contains('layout-mode'))return;e.preventDefault();e.stopPropagation();selectLayoutItem(item);item.setPointerCapture(e.pointerId);const stageRect=itemStage(item).getBoundingClientRect(),itemRect=item.getBoundingClientRect(),startX=e.clientX,startY=e.clientY,startDx=parseFloat(item.style.getPropertyValue('--layout-x'))||0,startDy=parseFloat(item.style.getPropertyValue('--layout-y'))||0,grabX=e.clientX-itemRect.left,grabY=e.clientY-itemRect.top;const move=ev=>{if(item.dataset.layoutMode==='offset'){const dx=startDx+(ev.clientX-startX)/innerWidth*100,dy=startDy+(ev.clientY-startY)/innerHeight*100;item.style.setProperty('--layout-x',`${dx}vw`);item.style.setProperty('--layout-y',`${dy}dvh`);$('layoutStatus').textContent=`${item.dataset.layoutName}: ${Math.round(dx)}, ${Math.round(dy)}`;return}const rect=item.getBoundingClientRect(),left=Math.max(0,Math.min(stageRect.width-rect.width,ev.clientX-stageRect.left-grabX)),top=Math.max(0,Math.min(stageRect.height-rect.height,ev.clientY-stageRect.top-grabY));item.style.left=`${left/stageRect.width*100}%`;item.style.top=`${top/stageRect.height*100}%`;item.style.right='auto';item.style.bottom='auto';$('layoutStatus').textContent=`${item.dataset.layoutName}: ${Math.round(left/stageRect.width*100)}%, ${Math.round(top/stageRect.height*100)}%`};const done=()=>{item.removeEventListener('pointermove',move);saveLayoutItem(item);updateLayoutControls()};item.addEventListener('pointermove',move);item.addEventListener('pointerup',done,{once:true});item.addEventListener('pointercancel',done,{once:true})}));
function resizeSelected(delta){if(!selectedLayoutItem)return;if(selectedLayoutItem.dataset.layoutMode==='offset'){const current=parseFloat(selectedLayoutItem.style.getPropertyValue('--layout-scale'))||1,next=Math.max(.5,Math.min(1.4,current+delta/20));selectedLayoutItem.style.setProperty('--layout-scale',next);saveLayoutItem(selectedLayoutItem);$('layoutStatus').textContent=`${selectedLayoutItem.dataset.layoutName}: размер ${Math.round(next*100)}%`;return}const stageWidth=layoutStage.getBoundingClientRect().width,current=selectedLayoutItem.getBoundingClientRect().width/stageWidth*100,next=Math.max(3,Math.min(55,current+delta));selectedLayoutItem.style.width=`${next}%`;selectedLayoutItem.style.height=selectedLayoutItem.id==='laserDecor'?`${next}%`:'auto';saveLayoutItem(selectedLayoutItem);$('layoutStatus').textContent=`${selectedLayoutItem.dataset.layoutName}: размер ${Math.round(next)}%`}
$('sizeDown').addEventListener('click',()=>resizeSelected(-2));$('sizeUp').addEventListener('click',()=>resizeSelected(2));
$('nextLayout').addEventListener('click',()=>{const next=layoutItems[(Math.max(-1,layoutItems.indexOf(selectedLayoutItem))+1)%layoutItems.length];selectLayoutItem(next)});
$('previousLayout').addEventListener('click',()=>{const index=Math.max(0,layoutItems.indexOf(selectedLayoutItem)),previous=layoutItems[(index-1+layoutItems.length)%layoutItems.length];selectLayoutItem(previous)});
$('layerDown').addEventListener('click',()=>changeSelectedLayer(-1));$('layerUp').addEventListener('click',()=>changeSelectedLayer(1));
function changeSelectedLayer(delta){if(!selectedLayoutItem)return;selectedLayoutItem.style.zIndex=String(Math.max(-5,Math.min(100,(+selectedLayoutItem.style.zIndex||readLayout()[selectedLayoutItem.id]?.z||0)+delta)));saveLayoutItem(selectedLayoutItem);updateLayoutControls()}
$('toggleLayoutVisibility').addEventListener('click',()=>{if(!selectedLayoutItem)return;const saved=readLayout();saveLayoutItem(selectedLayoutItem);saved[selectedLayoutItem.id]={...readLayout()[selectedLayoutItem.id],hidden:!(readLayout()[selectedLayoutItem.id]?.hidden)};localStorage.setItem(layoutKey(),JSON.stringify(saved));selectedLayoutItem.style.visibility=saved[selectedLayoutItem.id].hidden?'hidden':'';updateLayoutControls()});
$('centerLayout').addEventListener('click',()=>{if(!selectedLayoutItem)return;if(selectedLayoutItem.dataset.layoutMode==='offset'){selectedLayoutItem.style.setProperty('--layout-x','0vw');selectedLayoutItem.style.setProperty('--layout-y','0dvh')}else{const rect=selectedLayoutItem.getBoundingClientRect(),stage=layoutStage.getBoundingClientRect();selectedLayoutItem.style.left=`${Math.max(0,(stage.width-rect.width)/2)/stage.width*100}%`;selectedLayoutItem.style.top=`${Math.max(0,(stage.height-rect.height)/2)/stage.height*100}%`;selectedLayoutItem.style.right='auto';selectedLayoutItem.style.bottom='auto'}saveLayoutItem(selectedLayoutItem);$('layoutStatus').textContent=`${selectedLayoutItem.dataset.layoutName}: перемещено в центр`});
$('copyLayout').addEventListener('click',async()=>{const value=JSON.stringify({device:layoutProfile(),positions:readLayout()},null,2);try{await navigator.clipboard.writeText(value);$('layoutStatus').textContent='координаты и размеры скопированы'}catch(e){prompt('Скопируйте координаты:',value)}});
$('resetLayout').addEventListener('click',()=>{localStorage.removeItem(layoutKey());layoutItems.forEach(item=>{['left','top','right','bottom','width','height','z-index','visibility'].forEach(prop=>item.style.removeProperty(prop));['--layout-x','--layout-y','--layout-scale'].forEach(prop=>item.style.removeProperty(prop))});applyLayout();selectLayoutItem(layoutItems[0]);$('layoutStatus').textContent='возвращена стандартная расстановка'});
function testDishReaction(refuse){showPanel(null,'openFeed');const cat=$('cat'),bowl=$('bowl'),message=refuse?'Шеф демонстративно отвернулся. Блюдо осталось на месте, рыбов не списано.':'Шеф принял блюдо. Ковёр официально получил статус ресторана.';cat.classList.add(refuse?'refuses':'feasting');bowl.classList.add(refuse?'refused':'served');playSound(refuse?'cat-soft':'cat-happy',.7);previousThoughtMessage=message;$('phrase').textContent=message;showCatThought(refuse?'fussy':'happy',refuse?(Math.random()<.22?'Ой, бабочка… Шеф уже забыл, что заказывал.':'Шеф передумал. Унесите это немедленно.'):'Котик доволен. Можно продолжать обслуживание.');setTimeout(()=>{cat.classList.remove('refuses','feasting');bowl.classList.remove('refused','served')},900)}
function initTestMode(){if(!testMode)return;const panel=$('testPanel'),select=$('testLevel');panel.hidden=false;select.innerHTML=levels.map((level,index)=>`<option value="${index}">${index+1} · ${level.name}</option>`).join('');select.value=String(currentLevel());$('testClose').addEventListener('click',()=>panel.classList.toggle('compact'));panel.addEventListener('click',e=>{const action=e.target.closest('[data-test]')?.dataset.test;if(!action)return;const selected=+select.value,now=Date.now();if(action==='set-level'){state.total=levels[selected].at;state.food=Math.max(state.food,levels[selected].at);renderedLevel=selected;render(true)}if(action==='next-level'){const next=Math.min(levels.length-1,currentLevel()+1);state.total=levels[next].at;state.food=Math.max(state.food,levels[next].at);render(true);select.value=String(next)}if(action==='fish'){const amount=Math.max(1000,levels[Math.min(levels.length-1,currentLevel()+1)].at-state.total);state.food+=amount;state.total+=amount;render(true)}if(action==='reward'){const award=achievements.find(item=>!state.earnedAchievements.includes(item.name))||achievements.at(-1);achievementQueue.push(award);showNextAchievement()}if(action==='items'){upgrades.forEach(item=>{state.counts[item.id]=Math.max(1,state.counts[item.id]);state.helperUntil[item.id]=now+15*60000});render(true)}if(action==='end-items'){state.helperUntil={};render(true)}if(action==='dishes'){carpetFood.forEach((item,index)=>state.treatUntil[index]=now+item.minutes*60000);state.adTreatUnlocks=carpetFood.map((_,index)=>index);render(true)}if(action==='end-dishes'){state.treatUntil={};render(true)}if(action==='accept')testDishReaction(false);if(action==='refuse')testDishReaction(true);if(action==='ad-success'){const reward=adRewardAmount();state.food+=reward;state.total+=reward;state.adBonusUntil=now+5*60000;playSound('reward');$('phrase').textContent=`Тест рекламы: начислено ${format(reward)} рыбов, доход ×3 на 5 минут.`;render(true)}if(action==='ad-cancel'){$('phrase').textContent='Тест рекламы: ролик закрыт, награда не начислена.';playSound('error',.45)}if(action==='reset'){localStorage.removeItem(saveKey);location.reload()}save()})}
let suppressSave=false;
$('testReset').addEventListener('click',e=>{if(!testMode)return;e.stopPropagation();suppressSave=true;localStorage.removeItem(saveKey);location.reload()});
function save(){if(suppressSave)return;state.last=Date.now();localStorage.setItem(saveKey,JSON.stringify(state));queueCloudSave()}
const away=Math.min(4*3600,Math.max(0,(Date.now()-(state.last||Date.now()))/1000));if(away>10&&cps()>0){const bonus=Math.floor(away*cps());state.food+=bonus;state.total+=bonus;$('phrase').textContent=L(`Пока тебя не было, Шеф получил ${format(bonus)} рыбов.`,`While you were away, Chef received ${format(bonus)} fish.`)}
setInterval(()=>{if(gameIsPaused())return;const gain=cps()/10;state.food+=gain;state.total+=gain;render()},100);setInterval(()=>{if(gameIsPaused())return;updateCare();save();if($('care').classList.contains('open'))renderCare();else $('openCare').classList.toggle('has-request',!!state.care.request)},60000);setInterval(save,5000);addEventListener('beforeunload',save);applyGameLanguage(queryParams.get('lang')||'ru');updateCare();render(true);applyLayout();addEventListener('resize',applyLayout);addEventListener('load',applyLayout,{once:true});initTestMode();if(testMode||layoutEditorMode){$('layoutToggle').hidden=false;$('layoutToggle').setAttribute('aria-hidden','false')}if(layoutEditorMode)setLayoutMode(true);initCatThoughts();scheduleRoomEvent(true);scheduleAdDrawer();setTimeout(()=>trackEvent('session_30_sec'),30000);setTimeout(()=>trackEvent('session_1_min'),60000);setTimeout(()=>trackEvent('session_3_min'),180000);setTimeout(()=>trackEvent('session_5_min'),300000);setTimeout(()=>{introMinElapsed=true;finishIntroWhenReady()},3000);setTimeout(()=>{initialDataReady=true;finishIntroWhenReady()},8000);
