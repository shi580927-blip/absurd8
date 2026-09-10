const upgrades = [
  {id:'bowl', icon:'🥣', iconAsset:'assets/images/ui/perk-bowl.png', name:'Миска без дна', desc:'+1 рыбов за нажатие', base:25, click:1},
  {id:'grandma', icon:'👵', iconAsset:'assets/images/ui/perk-grandma.png', name:'Бабушка-кормитель', desc:'+1 рыбов в секунду', base:60, cps:1},
  {id:'chef', icon:'👨‍🍳', iconAsset:'assets/images/ui/perk-chef.png', name:'Повар, боящийся кота', desc:'+5 рыбов в секунду', base:260, cps:5},
  {id:'delivery', icon:'🛵', iconAsset:'assets/images/ui/perk-delivery.png', name:'Доставка со скоростью света', desc:'+20 рыбов в секунду', base:1100, cps:20},
  {id:'ministry', icon:'🏛️', iconAsset:'assets/images/ui/perk-ministry.png', name:'Министерство кошачьей еды', desc:'+100 рыбов в секунду', base:6000, cps:100},
  {id:'laser', icon:'🔴', iconAsset:'assets/images/ui/perk-laser.png', name:'Лазерная точка с амбициями', desc:'+3 рыбов за нажатие', base:180, click:3},
  {id:'mouse', icon:'🐭', iconAsset:'assets/images/ui/perk-mouse.png', name:'Мышь на удалённой работе', desc:'+12 рыбов в секунду', base:720, cps:12},
  {id:'box', icon:'📦', iconAsset:'assets/images/ui/perk-box.png', name:'Коробка дороже квартиры', desc:'+250 рыбов в секунду', base:18000, cps:250}
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
achievements.forEach((achievement,index)=>achievement.iconAsset=`assets/images/ui/reward-gift-${index+1}.png`);
const outfits=levels.map((level,index)=>({id:`level-${index+1}`,name:level.name,img:level.img,scale:level.scale,filter:level.filter||'',unlock:index}));
const rooms=[
  'assets/images/rooms/room-stage-1.webp',
  'assets/images/rooms/room-stage-2.webp',
  'assets/images/rooms/room-stage-3.webp',
  'assets/images/rooms/room-stage-4.webp',
  'assets/images/rooms/room-stage-5.webp'
];
const desktopRooms=rooms.map((_,index)=>`assets/images/rooms/desktop/room-stage-${index+1}-desktop-v1.webp`);
const boxStages=[
  {level:1,name:['Коробка эконом-класса','Economy-Class Box'],img:'assets/images/houses/house-stage-1.png?v=20260909-1'},
  {level:3,name:['Однокомнатная премиум-класса','One-Room Purr-mium Home'],img:'assets/images/houses/house-stage-2.png?v=20260909-1'},
  {level:5,name:['Домик с личной когтеточкой','Home with a Private Scratcher'],img:'assets/images/houses/house-stage-3.png?v=20260909-1'},
  {level:7,name:['Вертикальная недвижимость','Vertical Real Estate'],img:'assets/images/houses/house-stage-4.png?v=20260909-1'},
  {level:9,name:['Трон-резиденция Шефа','Chef’s Throne Residence'],img:'assets/images/houses/house-stage-5.png?v=20260909-1'},
  {level:11,name:['Дворец Повелителя отдыха','Palace of the Lord of Rest'],img:'assets/images/houses/house-stage-6.png?v=20260909-1'}
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
  {img:4,name:'Икра для важных переговоров',minutes:3,cost:14,x:3,y:68,w:13,reaction:'judging',serve:['Икра соответствует должности.','The caviar is appropriate for my position.'],refuseReaction:'fussy',refuse:['Без хлеба. И без свидетелей.','No bread. And no witnesses.']},
  {img:16,name:'Стратегический запас консервов',minutes:4,cost:20,x:82,y:69,w:13,reaction:'innocent',serve:['Я ничего не трогал.','I did not touch anything.'],refuseReaction:'fussy',refuse:['Это запас. Его нельзя просто так съесть.','These are reserves. One cannot simply eat them.']},
  {img:12,name:'Консерва особой важности',minutes:4,cost:24,x:15,y:76,w:12,reaction:'stunned',serve:['Одна? Смелое решение.','Only one? A bold decision.'],refuseReaction:'fussy',refuse:['Важность есть. Аппетита нет.','It is important. It is not appetizing.']},
  {img:11,name:'Дорада по высшему разряду',minutes:5,cost:32,x:70,y:77,w:16,reaction:'hunting',serve:['О, а вот любимая рыбка.','Oh, my favorite fish.'],refuseReaction:'fussy',refuse:['Она ещё на меня смотрит. Уберите.','It is still looking at me. Take it away.']},
  {img:6,name:'Парадная курица',minutes:5,cost:38,x:2,y:52,w:14,reaction:'happy',serve:['Люблю курочку. Можно было сразу нести две.','I love chicken. You could have brought two.'],refuseReaction:'fussy',refuse:['Какая жареная курица? Впервые слышу.','What roast chicken? Never heard of it.']},
  {img:10,name:'Большая рыбная тарелка',minutes:6,cost:48,x:85,y:53,w:12,reaction:'hunting',serve:['Рыба хорошая. А вторая где?','The fish is good. Where is the second one?'],refuseReaction:'fussy',refuse:['Большая тарелка не делает рыбу больше.','A large plate does not make the fish larger.']},
  {img:3,name:'Фиолетовая консерва',minutes:4,cost:28,x:24,y:66,w:11,reaction:'stunned',serve:['Фиолетовая. Значит, секретная.','Purple. Therefore classified.'],refuseReaction:'fussy',refuse:['Фу, уберите. Бэ-э.','Ew, take it away. Yuck.']},
  {img:8,name:'Лосось для руководства',minutes:6,cost:60,x:63,y:65,w:14,reaction:'hunting',serve:['Шеф одобряет улов. Оставьте целиком.','Chef approves the catch. Leave it whole.'],refuseReaction:'fussy',refuse:['Руководство ожидало другой лосось.','Management expected a different salmon.']},
  {img:9,name:'Фуршет «Девять жизней»',minutes:7,cost:75,x:40,y:74,w:13,reaction:'shock',serve:['Это всё мне? Можете не отвечать.','Is all this for me? No need to answer.'],refuseReaction:'fussy',refuse:['Девять жизней, а желудок один. Какая несправедливость.','Nine lives, but only one stomach. How unfair.']},
  {img:'buffets/sushi-ship-full',asset:'assets/images/buffets/sushi-ship-full.webp',buffetKey:'sushi-ship',name:'Суши-корабль Его Наглейшества',minutes:3,cost:140,buffet:true,premium:true,clickMultiplier:2,stageClicks:[14,34],revealLevel:8,adLevel:8,reaction:'shock',serve:['Это всё мне? Можете не отвечать.','Is all this for me? No need to answer.']},
  {asset:'assets/images/premium-dishes/royal-lobster.webp',name:'Королевский омар',minutes:6,cost:190,premium:true,revealLevel:9,adLevel:9,reaction:'hunting',serve:['Омар прибыл. Корона остаётся у меня.','The lobster has arrived. The crown stays with me.'],refuseReaction:'fussy',refuse:['Королевский — это про меня. Омар может подождать.','Royal refers to me. The lobster can wait.']},
  {asset:'assets/images/premium-dishes/imperial-sturgeon.webp',name:'Императорский осётр',minutes:7,cost:250,premium:true,revealLevel:10,adLevel:10,reaction:'judging',serve:['Осётр принят в высшее общество.','The sturgeon has been admitted to high society.'],refuseReaction:'fussy',refuse:['Императорский? Предъявите родословную.','Imperial? Show me its pedigree.']},
  {asset:'assets/images/premium-dishes/shrimp-caviar-tower.webp',name:'Башня из креветок с икрой',minutes:7,cost:330,premium:true,revealLevel:11,adLevel:11,reaction:'shock',serve:['Башня устойчива. Пока я не начал.','The tower is stable. Until I begin.'],refuseReaction:'fussy',refuse:['Слишком высокая. Подвиньте поближе.','Too tall. Move it closer.']},
  {asset:'assets/images/buffets/pearl-shell-full.webp',buffetKey:'pearl-shell',name:'Перламутровая раковина',minutes:8,cost:430,buffet:true,premium:true,clickMultiplier:2.5,stageClicks:[18,42],revealLevel:11,adLevel:11,reaction:'stunned',serve:['Жемчуг оставьте. Я веду учёт.','Leave the pearls. I keep records.']},
  {asset:'assets/images/premium-dishes/crystal-sashimi-fish.webp',name:'Хрустальная рыба с сашими',minutes:8,cost:560,premium:true,revealLevel:13,adLevel:13,reaction:'hunting',serve:['Хрусталь не есть. Сашими — дважды.','Do not eat the crystal. Double the sashimi.'],refuseReaction:'fussy',refuse:['Она прозрачная. Это подозрительно.','It is transparent. Suspicious.']},
  {asset:'assets/images/premium-dishes/golden-tier-stand.webp',name:'Золотая этажерка',minutes:9,cost:720,premium:true,revealLevel:12,adLevel:12,reaction:'stunned',serve:['Три этажа. Наконец разумная порция.','Three tiers. Finally, a sensible portion.'],refuseReaction:'fussy',refuse:['Золото одобряю. Комплектацию — нет.','Gold approved. Assortment rejected.']},
  {asset:'assets/images/premium-dishes/caviar-palace.webp',name:'Икорный дворец',minutes:10,cost:920,premium:true,revealLevel:13,adLevel:13,reaction:'shock',serve:['Дворец принят. Заселяюсь немедленно.','Palace accepted. Moving in immediately.'],refuseReaction:'fussy',refuse:['Дворец маловат. Я похож на арендатора?','The palace is too small. Do I look like a tenant?']},
  {asset:'assets/images/premium-dishes/truffle-tuna.webp',name:'Тунец с трюфелями',minutes:10,cost:1180,premium:true,revealLevel:13,adLevel:13,reaction:'hunting',serve:['Тунец найден. Трюфели тоже не пропадут.','Tuna found. The truffles will not go to waste either.'],refuseReaction:'fussy',refuse:['Трюфели отвлекают от главного.','The truffles distract from what matters.']},
  {asset:'assets/images/premium-dishes/royal-seafood-feast.webp',name:'Королевский морской фуршет',minutes:12,cost:1500,premium:true,revealLevel:14,adLevel:14,reaction:'shock',serve:['Закройте двери. Начинается государственный приём.','Close the doors. The state reception is beginning.'],refuseReaction:'fussy',refuse:['Гостей не будет? Тогда придётся справляться самому.','No guests? Then I shall have to manage alone.']}
];
const treatUnlockLevels=[1,1,2,2,3,4,6,8,10,9,10,11,12,12,13,13,14,14,14];
// Uploaded three-stage luxury dishes keep their existing prices and earnings.
carpetFood.filter(treat=>treat.premium&&!treat.buffet).forEach(treat=>{
  const key=treat.asset.split('/').pop().replace('.webp','');
  treat.buffet=true;treat.buffetKey=key;treat.stageClicks=[18,42];
  treat.stageAssets=Object.fromEntries(['full','half','empty'].map(stage=>[stage,`assets/images/premium-dishes/${key}-${key==='truffle-tuna'&&stage==='empty'?'half-empty':stage}-converted.webp`]));
  treat.asset=treat.stageAssets.full;
});
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
$('foodDecor').innerHTML=carpetFood.map((item,index)=>(item.buffet||item.premium)?'':`<img id="foodProp${index+1}" data-treat-index="${index}" data-layout-name="Еда ${index+1}" class="food-prop layout-item" src="assets/images/food-${item.img}.png" style="left:${item.x}%;top:${item.y}%;width:${item.w}%" alt="">`).join('');
const SUPPORTED_LANGUAGES=new Set(['ru','en']);
const NUMBER_LOCALES={ru:'ru-RU',en:'en-US'};
let gameLanguage='ru';
const L=(ru,en)=>gameLanguage==='en'?en:ru;
const englishNames={
  'Миска без дна':'Bottomless Bowl','Бабушка-кормитель':'Feeder Grandma','Повар, боящийся кота':'Chef Who Fears the Cat','Доставка со скоростью света':'Lightspeed Delivery','Министерство кошачьей еды':'Ministry of Feline Cuisine','Лазерная точка с амбициями':'Ambitious Laser Dot','Мышь на удалённой работе':'Remote-Working Mouse','Коробка дороже квартиры':'Box Pricier Than an Apartment',
  'Голодный стратег':'Hungry Strategist','Кот с личной миской':'Cat with a Personal Bowl','Диванный аристократ':'Sofa Aristocrat','Ресторанный критик':'Restaurant Critic','Хозяин недвижимости':'Property Owner','Рыбный магнат':'Fish Tycoon','Его Рыбное Величество':'His Fishy Majesty','Лососевый барон':'Salmon Baron','Министр полной миски':'Minister of the Full Bowl','Император квартиры':'Emperor of the Apartment','Кот, купивший Луну':'The Cat Who Bought the Moon','Хозяин Вселенной':'Master of the Universe','Повелитель заслуженного отдыха':'Lord of Well-Earned Rest','Абсолютно сытый Шеф':'Absolutely Satisfied Chef',
  'Икра для важных переговоров':'Caviar for Important Negotiations','Стратегический запас консервов':'Strategic Canned Food Reserve','Консерва особой важности':'Can of Special Importance','Дорада по высшему разряду':'Top-Rank Dorado','Парадная курица':'Ceremonial Chicken','Большая рыбная тарелка':'Grand Fish Platter','Фиолетовая консерва':'Purple Can','Лосось для руководства':'Executive Salmon','Фуршет «Девять жизней»':'Nine Lives Buffet','Суши-корабль Его Наглейшества':'His Audaciousness’s Sushi Ship',
  'Королевский омар':'Royal Lobster','Императорский осётр':'Imperial Sturgeon','Башня из креветок с икрой':'Shrimp and Caviar Tower','Перламутровая раковина':'Pearlescent Shell','Хрустальная рыба с сашими':'Crystal Fish with Sashimi','Золотая этажерка':'Golden Tiered Stand','Икорный дворец':'Caviar Palace','Тунец с трюфелями':'Truffle Tuna','Королевский морской фуршет':'Royal Seafood Feast',
  'Первая лапа власти':'The First Paw of Power','У миски появился бюджет':'The Bowl Got a Budget','Бабушка одобрила комплекцию':'Grandma Approved the Figure','Повар подал заявление':'The Chef Filed His Notice','Рыбы особой срочности':'Priority Fish Delivery','Кот вышел в руководство':'The Cat Joined Management','Пассивная наглость':'Passive Audacity','Миска государственного значения':'Bowl of National Importance','Рыбовый миллионер':'Fish Millionaire','Вселенная оформлена на кота':'The Universe Is in the Cat’s Name','Можно и подремать':'Time for a Nap'
};
const englishDescriptions={
  '+1 рыбов за нажатие':'+1 fish per click','+1 рыбов в секунду':'+1 fish per second','+5 рыбов в секунду':'+5 fish per second','+20 рыбов в секунду':'+20 fish per second','+100 рыбов в секунду':'+100 fish per second','+3 рыбов за нажатие':'+3 fish per click','+12 рыбов в секунду':'+12 fish per second','+250 рыбов в секунду':'+250 fish per second',
  'Заработать 10 рыбов':'Earn 10 fish','Купить «Миску без дна»':'Buy the Bottomless Bowl','Нанять бабушку-кормителя':'Hire Feeder Grandma','Нанять испуганного повара':'Hire the frightened chef','Купить скоростную доставку':'Buy lightspeed delivery','Достичь 5 уровня':'Reach level 5','Получать 25 рыбов в секунду':'Earn 25 fish per second','Получить поддержку министерства':'Secure ministry support','Заработать 1 000 000 рыбов':'Earn 1,000,000 fish','Достичь 12 уровня':'Reach level 12','Довести Шефа до абсолютной сытости':'Bring Chef to absolute satisfaction'
};
const itemName=item=>gameLanguage==='en'?(englishNames[item.name]||item.name):item.name;
const itemDesc=item=>gameLanguage==='en'?(englishDescriptions[item.desc]||item.desc):item.desc;
const staticTranslations={
  pageTitle:['Кот, который слишком хорошо живёт','The Cat Who Lives Too Well'],phrase:['В этой миске подозрительно видно дно.','The bottom of this bowl is suspiciously visible.'],feedLabel:['ПОКОРМИТЬ','FEED'],feedHint:['Можно нажимать на кота или на кнопку','Tap the cat or press the button'],levelLabel:['Уровень наглости','Audacity level'],incomeLabel:['Доход','Income'],incomeUnit:['рыбов/сек.','fish/sec.'],navFeed:['Еда','Food'],navShop:['Привилегии','Privileges'],navWardrobe:['Шкаф','Wardrobe'],navAwards:['Награды','Awards'],shopTitle:['👑 Привилегии Шефа','👑 Chef’s Privileges'],shopMessage:['Выберите привилегию для Шефа.','Choose a privilege for Chef.'],wardrobeTitle:['👕 Гардероб Шефа','👕 Chef’s Wardrobe'],wardrobeMessage:['Одежда меняет вид, но не уменьшает наглость.','Clothes change his look, not his audacity.'],awardsTitle:['🏆 Награды Шефа','🏆 Chef’s Awards'],awardsMessage:['Шеф не хвастается. Он официально информирует.','Chef does not brag. He issues official updates.'],careTitle:['🐾 Как поживает Шеф','🐾 How Is Chef Doing?'],careMessage:['Шеф не нуждается в заботе. Он разрешает её проявить.','Chef needs no care. He merely permits it.'],hungerLabel:['🐟 Сытость','🐟 Fullness'],moodLabel:['🧶 Настроение','🧶 Mood'],restLabel:['💤 Отдых','💤 Rest'],careRequestTitle:['Шеф обдумывает пожелания','Chef Is Considering His Demands'],careRequestText:['Он сообщит, когда потребуется персонал.','He will notify the staff when needed.'],careAction:['Ожидаем распоряжений','Awaiting orders'],careBonus:['Бонус заботы пока не действует.','Care bonus is not active.'],treatTitle:['🍽️ Еда для Шефа','🍽️ Food for Chef'],treatIntro:['Купленное блюдо появляется в комнате на несколько минут. Сытый Шеф иногда имеет собственное мнение.','A purchased dish appears in the room for several minutes. A full Chef may still have opinions.'],careNote:['Показатели снижаются очень медленно. Шеф не болеет, не убегает и никого не наказывает. Почти.','Stats decrease very slowly. Chef never gets sick, runs away, or punishes anyone. Almost.'],settingsTitle:['⚙️ Настройки','⚙️ Settings'],settingsMessage:['Управление и звуки кабинета Шефа.','Controls and sounds in Chef’s office.'],musicLabel:['Фоновая музыка','Background music'],musicHint:['Музыка играет во время кормления','Music plays while you feed Chef'],effectsLabel:['Звуки игры','Game sounds'],effectsHint:['Кормление, кот, награды и игрушки','Feeding, cat, rewards, and toys'],developerLabel:['Разработчик','Developer'],presentsLabel:['представляет','presents'],newLevelLabel:['✨ НОВЫЙ УРОВЕНЬ ✨','✨ NEW LEVEL ✨'],congratsLabel:['Шеф принимает поздравления.','Chef accepts your congratulations.'],achievementReceivedLabel:['НАГРАДА ПОЛУЧЕНА','AWARD UNLOCKED'],rewardConfirmTitle:['Открыть за просмотр рекламы?','Unlock by watching an ad?'],rewardConfirmText:['Посмотрите ролик полностью — награда будет выдана после просмотра.','Watch the full video to receive the reward.'],rewardConfirmCancel:['Не сейчас','Not now'],rewardConfirmWatch:['Смотреть рекламу','Watch ad']
};
function applyStaticTranslations(){
  Object.entries(staticTranslations).forEach(([id,texts])=>{const element=$(id);if(element)element.textContent=texts[gameLanguage==='en'?1:0]});
  document.title=L('Кот, который слишком хорошо живёт','The Cat Who Lives Too Well');
  $('openCare').ariaLabel=L('Желание Шефа','Chef’s wish');$('openSettings').ariaLabel=L('Настройки','Settings');$('cat').ariaLabel=L('Покормить кота','Feed the cat');$('roomEvent').ariaLabel=L('Собрать случайный бонус','Collect a random bonus');$('rewardedAd').ariaLabel=L('Показать предложение или посмотреть рекламу','Show offer or watch ad');
  document.querySelectorAll('.close').forEach(button=>button.ariaLabel=L('Закрыть','Close'));
  $('catBody').alt=L('Рыжий кот Шеф','Chef, the orange cat');$('bowl').alt=L('Пустая миска','Empty bowl');
  const english=gameLanguage==='en';$('introTitleImage').hidden=english;$('introTitleEnglish').hidden=!english;$('certificateDecor').src=english?'assets/images/certificate-en.png?v=20260906-1':'assets/images/certificate.png?v=20260831-2';if($('introSplash'))$('introSplash').ariaLabel=L('Кот, который слишком хорошо живёт','The Cat Who Lives Too Well');
}
function applyGameLanguage(language){
  const normalized=String(language||'').toLowerCase().split('-')[0];
  gameLanguage=SUPPORTED_LANGUAGES.has(normalized)?normalized:'ru';
  document.documentElement.lang=gameLanguage;
  if(parent!==window)parent.postMessage({type:'game-language',language:gameLanguage},location.origin);
  applyStaticTranslations();
  if(typeof render==='function'){render(true);renderSettings()}
}
const format=n=>Math.floor(n).toLocaleString(NUMBER_LOCALES[gameLanguage]||NUMBER_LOCALES.ru);
function rememberCompletedWish(){if(state.treatWish)state.lastCompletedTreatWish={...state.treatWish,completed:true}}
function renderChefWish(markSeen=false){
  const active=state.treatWish&&Date.now()<state.treatWish.until?state.treatWish:null;
  const wish=active||state.lastCompletedTreatWish;
  const valid=wish&&carpetFood[wish.index];
  const completed=!!(valid&&(wish.completed||isTreatUnlocked(wish.index)));
  if(valid&&!wish.id)wish.id=wish.until;
  const signature=valid?`${wish.index}:${wish.id}:${completed?'done':'new'}`:'';
  const opened=$('chefWish').classList.contains('open');
  if(markSeen||opened)state.seenTreatWish=signature;
  $('openCare').classList.toggle('has-request',!!signature&&state.seenTreatWish!==signature);
  $('chefWishTitle').textContent=L('Желание Шефа','Chef’s wish');
  $('wishCare').textContent=L('Состояние Шефа','Chef’s care');
  $('wishFood').textContent=L('Открыть еду','Open food');
  $('wishFood').hidden=!valid||completed;
  $('chefWishName').textContent=valid?L(`Хочет: ${itemName(carpetFood[wish.index])}`,`Wants: ${itemName(carpetFood[wish.index])}`):L('Сейчас желаний по еде нет.','No food wishes right now.');
  $('chefWishTask').textContent=valid?L(`Задача: открыть блюдо «${itemName(carpetFood[wish.index])}».`,`Task: unlock “${itemName(carpetFood[wish.index])}”.`):L('Новое желание появится здесь, когда Шеф его загадает.','Chef’s next wish will appear here.');
  $('chefWishProgress').textContent=valid?(completed?L('Выполнено · 1/1','Completed · 1/1'):L('Прогресс: 0/1','Progress: 0/1')):'';
  $('chefWishProgress').classList.toggle('completed',completed);
}
function compactNumber(n){
  const value=Math.max(0,Math.floor(Number(n)||0));
  const units=[[1e12,'трлн','T'],[1e9,'млрд','B'],[1e6,'млн','M'],[1e3,'тыс.','K']];
  const unit=units.find(([base])=>value>=base);
  if(!unit)return String(value);
  const amount=Math.floor(value/unit[0]*10)/10;
  return amount.toLocaleString(gameLanguage==='en'?'en-US':'ru-RU',{minimumFractionDigits:1,maximumFractionDigits:1})+(gameLanguage==='en'?unit[2]:' '+unit[1]);
}
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
let parentSdkPromise=null;
try{if(parent!==window)parentSdkPromise=parent.yandexSdkPromise||null}catch(error){}
let initialDataReady=(!window.YaGames&&!parentSdkPromise)||testMode,introMinElapsed=false,introFinishStarted=false;
let adPlaying=false,adRequestPending=false;
const soundExt=(()=>{const audio=document.createElement('audio');return audio.canPlayType('audio/ogg; codecs="vorbis"')?'ogg':'mp3'})();
const zoomiesAudioTracks=[1,2].map(number=>{const audio=new Audio(`assets/audio/zoomies-carpet-${number}.${soundExt}?v=20260910-1`);audio.preload='auto';audio.volume=.65;audio.loop=true;return audio});
let zoomiesAudio=zoomiesAudioTracks[0];
let zoomiesAudioStarted=false;
function pauseZoomiesAudio(){zoomiesAudioTracks.forEach(audio=>audio.pause());zoomiesAudioStarted=false}
function syncZoomiesAudio(){
  if(!state.sfx||zoomiesElapsed<0||zoomiesBlocked()){pauseZoomiesAudio();return}
  if(zoomiesAudioStarted||zoomiesAudio.readyState<2)return;
  zoomiesAudioStarted=true;zoomiesAudio.currentTime=(zoomiesElapsed/1000)%(zoomiesAudio.duration||4);
  zoomiesAudio.play().catch(()=>{});
}
const soundNames=['ui-click','feed','buy','error','level','reward','cat-food','cat-happy','cat-happy-2','cat-soft','cat-purr-15','toy-yarn','toy-mouse','toy-slipper','toy-feather','toy-fish'];
const soundBank=Object.fromEntries(soundNames.map(name=>{const audio=new Audio(`assets/audio/${name}.${soundExt}?v=20260831-9`);audio.preload='auto';return[name,audio]}));
const backgroundMusic=new Audio(`assets/audio/chef-theme.${soundExt}?v=20260910-2`);backgroundMusic.loop=true;backgroundMusic.preload='auto';backgroundMusic.volume=.42;
const activeSounds=new Set();
const MUSIC_VOLUME=.42,MUSIC_DUCK_VOLUME=.08;
let musicRampTimer,duckRestoreTimer,duckUntil=0;
function rampMusic(target,duration=220){clearInterval(musicRampTimer);const start=backgroundMusic.volume,steps=10,delta=(target-start)/steps;let step=0;musicRampTimer=setInterval(()=>{step++;backgroundMusic.volume=Math.max(0,Math.min(1,start+delta*step));if(step>=steps)clearInterval(musicRampTimer)},duration/steps)}
function duckMusic(duration){duckUntil=Math.max(duckUntil,Date.now()+duration);rampMusic(MUSIC_DUCK_VOLUME);clearTimeout(duckRestoreTimer);duckRestoreTimer=setTimeout(()=>{const wait=duckUntil-Date.now();if(wait>20)duckRestoreTimer=setTimeout(()=>rampMusic(MUSIC_VOLUME,500),wait);else rampMusic(MUSIC_VOLUME,500)},duration)}
const needsLandscape=()=>matchMedia('(orientation:portrait) and (max-width:899px)').matches;
let masterOrientationPaused=false,windowBlurred=false;
addEventListener('message',event=>{if(event.source!==parent||event.origin!==location.origin||event.data?.type!=='master-orientation')return;masterOrientationPaused=!!event.data.paused;const scale=Number(event.data.scale);if(Number.isFinite(scale)&&scale>0){document.documentElement.style.setProperty('--ui-unit',`${1/scale}px`);document.documentElement.classList.toggle('small-screen',scale<.75)}syncOrientation()});
function gameIsPaused(){return adPlaying||platformPaused||masterOrientationPaused||windowBlurred||!brandIntroFinished||document.visibilityState==='hidden'||needsLandscape()}
let timerCheckpoint=Date.now(),timersWerePaused=false;
function syncPausedTimers(){
  const now=Date.now(),elapsed=Math.max(0,now-timerCheckpoint);
  if(timersWerePaused&&elapsed){
    const shift=(object,key)=>{if(object&&Number.isFinite(object[key])&&object[key]>timerCheckpoint)object[key]+=elapsed};
    for(const map of [state.helperUntil,state.treatUntil])Object.keys(map||{}).forEach(key=>shift(map,key));
    shift(state,'adBonusUntil');shift(state,'nextTreatWish');shift(state.treatWish,'until');
    shift(state.care,'bonusUntil');shift(state.care,'nextRequest');
    if(state.care)state.care.last+=elapsed;
  }
  timerCheckpoint=now;
  timersWerePaused=brandIntroFinished&&gameIsPaused();
  document.documentElement.classList.toggle('game-paused',timersWerePaused);
}
function ensureMusic(){if(state.music&&!gameIsPaused()&&backgroundMusic.paused)backgroundMusic.play().catch(()=>{})}
let audioPrepared=false,audioUnlocked=false;
function unlockAudio(){
  if(audioUnlocked){ensureMusic();return}
  if(!audioPrepared){Object.values(soundBank).forEach(audio=>audio.load());backgroundMusic.load();audioPrepared=true}
  if(!state.music||gameIsPaused())return;
  audioUnlocked=true;
  backgroundMusic.play().catch(()=>{audioUnlocked=false});
}
document.addEventListener('pointerdown',unlockAudio,{capture:true});
document.addEventListener('keydown',unlockAudio,{capture:true});
function playSound(name,volume=1){if(!state.sfx||gameIsPaused())return;ensureMusic();const source=soundBank[name];if(!source)return;if(name.startsWith('cat-')&&name!=='cat-food')duckMusic(name==='cat-purr-15'?15000:2200);const player=source.cloneNode();player.volume=volume;activeSounds.add(player);const done=()=>activeSounds.delete(player);player.addEventListener('ended',done,{once:true});player.addEventListener('error',done,{once:true});player.play().catch(done)}
let lastFeedSound=0;
function playFeedSound(){if(Date.now()-lastFeedSound<3200)return;lastFeedSound=Date.now();playSound('feed',.72)}
let lastPurr=0;
function playPurr(force=false){if(!force&&Date.now()-lastPurr<18000)return;lastPurr=Date.now();playSound('cat-purr-15',.82)}
let thoughtTimer,delayedThoughtTimer,thoughtSide=false,previousThoughtMessage='',thoughtBatchTimer,thoughtBatch={count:0,refused:false},hungerThoughtShown=false;
const catReactionImages={happy:'assets/images/reactions/reaction-happy.webp',fussy:'assets/images/reactions/reaction-fussy.webp',stunned:'assets/images/reactions/reaction-stunned.webp',shock:'assets/images/reactions/reaction-shock.webp',pleading:'assets/images/reactions/reaction-pleading.webp',hunting:'assets/images/reactions/reaction-hunting.webp',judging:'assets/images/reactions/reaction-judging.webp',innocent:'assets/images/reactions/reaction-innocent.webp',why:'assets/images/reactions/reaction-why.webp'};
const catReactionNames={happy:['Довольный Шеф','Satisfied Chef'],fussy:['Привередливый Шеф','Fussy Chef'],stunned:['Ошеломлённый Шеф','Stunned Chef'],shock:['Удивлённый Шеф','Surprised Chef'],pleading:['Голодный Шеф','Hungry Chef'],hunting:['Охотничий взгляд Шефа','Chef on the hunt'],judging:['Осуждающий Шеф','Judging Chef'],innocent:['Невиновный Шеф','Innocent Chef'],why:['Шеф требует объяснений','Chef demands an explanation']};
catReactionImages.trash='assets/images/reactions/reaction-trash.webp';
catReactionNames.trash=['Шеф чувствует Зло','Chef senses evil'];
function showCatThought(kind,text){clearTimeout(thoughtTimer);thoughtSide=!thoughtSide;const reaction=catReactionImages[kind]?kind:'fussy',thought=$('catThought');$('catThoughtImage').src=catReactionImages[reaction];$('catThoughtImage').alt=L(...catReactionNames[reaction]);$('catThoughtText').textContent=text;thought.className=`cat-thought ${reaction} ${thoughtSide?'from-left':'from-right'}`;void thought.offsetWidth;thought.classList.add('show');thoughtTimer=setTimeout(()=>thought.classList.remove('show'),4000)}
function showCatThoughtDelayed(kind,text,delay=2000){clearTimeout(delayedThoughtTimer);delayedThoughtTimer=setTimeout(()=>showCatThought(kind,text),delay)}
function treatText(treat,key){const pair=treat[key];return pair?L(pair[0],pair[1]):''}
function queueCatThought(refused){thoughtBatch.count++;thoughtBatch.refused||=refused;clearTimeout(thoughtBatchTimer);thoughtBatchTimer=setTimeout(()=>{const batch=thoughtBatch;thoughtBatch={count:0,refused:false};if(batch.count>1)showCatThought(batch.refused?'fussy':'happy',batch.refused?L('Шеф ознакомился с меню. Некоторые позиции велел унести.','Chef reviewed the menu. Several items were ordered out.'):L('Шеф ознакомился с меню и одобрил выбор.','Chef reviewed the menu and approved the selection.'));else if(batch.refused)showCatThought('fussy',Math.random()<.22?L('Ой, бабочка… Шеф уже забыл, что заказывал.','Oh, a butterfly… Chef has forgotten what he ordered.'):L('Шеф передумал. Унесите это немедленно.','Chef changed his mind. Remove this at once.'));else showCatThought('happy',L('Котик доволен. Можно продолжать обслуживание.','The kitty is pleased. Service may continue.'))},800)}
function initCatThoughts(){Object.values(catReactionImages).forEach(src=>{const preload=new Image();preload.src=src});new MutationObserver(()=>{const message=$('phrase').textContent;if(message===previousThoughtMessage)return;previousThoughtMessage=message;if(message.startsWith('Шеф демонстративно')||message.startsWith('Chef made a show'))queueCatThought(true);else if(message.startsWith('Шеф принял блюдо')||message.startsWith('Chef accepted'))queueCatThought(false)}).observe($('phrase'),{childList:true,characterData:true,subtree:true})}
function stopEffects(){pauseZoomiesAudio();activeSounds.forEach(audio=>{audio.pause();audio.currentTime=0});activeSounds.clear()}
function stopAllSounds(){backgroundMusic.pause();stopEffects()}
function trackEvent(name,params={}){try{window.dataLayer?.push({event:name,...params});if(window.YM_COUNTER_ID&&typeof window.ym==='function')window.ym(window.YM_COUNTER_ID,'reachGoal',name,params)}catch(error){}}
function startGameplay(){syncPausedTimers();if(gameplayActive||gameIsPaused())return;gameplayActive=true;ysdk?.features?.GameplayAPI?.start?.()}
function stopGameplay(){syncPausedTimers();if(!gameplayActive)return;gameplayActive=false;ysdk?.features?.GameplayAPI?.stop?.()}
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
  state.buffetClicks??={};
  state.saveVersion=9;
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
async function initYandexSDK(){try{ysdk=parentSdkPromise?await parentSdkPromise:(window.YaGames?await YaGames.init():null);if(!ysdk){initialDataReady=true;finishIntroWhenReady();return}const sdkLanguage=ysdk.environment.i18n.lang;applyGameLanguage(queryParams.get('lang')||sdkLanguage);ysdk.on?.('game_api_pause',handlePlatformPause);ysdk.on?.('game_api_resume',handlePlatformResume);await initCloudSave();announceGameReady()}catch(error){ysdk=null;initialDataReady=true;finishIntroWhenReady()}}
initYandexSDK();
const careRequests={
  hunger:{icon:'🐟',title:'Шеф требует особый перекус',enTitle:'Chef Demands a Special Snack',text:'Обычное кормление считается работой. А это — забота.',enText:'Regular feeding is work. This is personal care.',action:'Подать особый перекус',enAction:'Serve a special snack'},
  mood:{icon:'🪶',title:'Шеф желает развлечений',enTitle:'Chef Requires Entertainment',text:'Перо уже уведомлено о неизбежном поражении.',enText:'The feather has been notified of its inevitable defeat.',action:'Поиграть с пером',enAction:'Play with the feather'},
  rest:{icon:'💤',title:'Шеф устал руководить',enTitle:'Chef Is Tired of Managing',text:'Нужно обеспечить тишину государственного значения.',enText:'Provide silence of national importance.',action:'Уложить Шефа',enAction:'Put Chef to bed'}
};
function updateCare(){const now=Date.now(),hours=Math.min(24,Math.max(0,now-state.care.last)/3600000);state.care.hunger=Math.max(18,state.care.hunger-hours*3);state.care.mood=Math.max(18,state.care.mood-hours*2);state.care.rest=Math.max(18,state.care.rest-hours*2.5);state.care.last=now;if(state.care.hunger<=35&&!hungerThoughtShown){hungerThoughtShown=true;showCatThoughtDelayed('pleading',L('Я ослаб настолько, что едва могу требовать ужин.','I am so weak I can barely demand dinner.'))}else if(state.care.hunger>55)hungerThoughtShown=false;if(!state.care.request&&now>=state.care.nextRequest){const types=Object.keys(careRequests);state.care.request=types[Math.floor(Math.random()*types.length)]}}
function updateTreatWish(){const now=Date.now();if(state.treatWish&&(isTreatUnlocked(state.treatWish.index)||now>=state.treatWish.until)){if(isTreatUnlocked(state.treatWish.index))rememberCompletedWish();state.treatWish=null;state.nextTreatWish=now+(5+Math.random()*3)*60000}if(!state.treatWish&&now>=state.nextTreatWish){const locked=carpetFood.map((_,index)=>index).filter(index=>index<9&&!isTreatUnlocked(index));if(locked.length){const index=locked[Math.floor(Math.random()*locked.length)],name=itemName(carpetFood[index]);state.treatWish={index,until:now+2*60000};state.nextTreatWish=now+(6+Math.random()*4)*60000;$('phrase').textContent=L(`Шеф требует «${name}». Уровень ждать он, разумеется, не намерен.`,`Chef demands “${name}”. Waiting for the required level is beneath him.`);save()}}}
function adButton(title,subtitle){return `<span class="action-copy"><b>${title}</b><small>${subtitle}</small></span>`}
function renderAd(){const cooldown=Math.max(0,AD_WATCH_COOLDOWN-(Date.now()-lastAdWatch)),boost=Math.max(0,state.adBonusUntil-Date.now()),button=$('rewardedAd');const clock=ms=>{const s=Math.ceil(ms/1000);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};button.classList.toggle('active',boost>0);button.disabled=adRequestPending;const markup=adButton(boost>0?'×3 · '+clock(boost):'🎬 ×3',adRequestPending?L('Загрузка…','Loading…'):cooldown>0?L('Реклама через ','Next ad in ')+clock(cooldown):L('За рекламу','Watch ad'));if(button.innerHTML!==markup)button.innerHTML=markup;button.ariaLabel=L('Ускорение за рекламу','Boost with an ad')}
function isTreatUnlocked(index){return currentLevel()+1>=treatUnlockLevels[index]||state.adTreatUnlocks.includes(index)}
function isPremiumTreat(index){return !!carpetFood[index]?.premium}
function isTreatVisible(index){const treat=carpetFood[index];return !isPremiumTreat(index)||currentLevel()+1>=(treat.revealLevel||1)}
function canUnlockTreatWithAd(index){const treat=carpetFood[index];return currentLevel()+1>=(treat.adLevel||1)}
function activeLuxuryDish(){const now=Date.now();let active=null;carpetFood.forEach((treat,index)=>{const until=state.treatUntil[index]||0;if(treat.premium&&until>now&&(!active||until>active.until))active={index,treat,until}});return active}
function activeBuffet(){const active=activeLuxuryDish();return active?.treat.buffet?active:null}
function activePremiumDish(){const active=activeLuxuryDish();return active&&!active.treat.buffet?active:null}
function buffetImage(active){if(!active)return null;const clicks=state.buffetClicks[active.index]||0,[halfAt,emptyAt]=active.treat.stageClicks;const stage=clicks>=emptyAt?'empty':clicks>=halfAt?'half':'full';return active.treat.stageAssets?.[stage]||`assets/images/buffets/${active.treat.buffetKey}-${stage}.webp`}
function buffetStageText(index){const treat=carpetFood[index];if(!treat?.buffet)return'';const clicks=state.buffetClicks[index]||0,[halfAt,emptyAt]=treat.stageClicks;return clicks>=emptyAt?L('Съедено','Eaten'):clicks>=halfAt?L('Съедено наполовину','Half eaten'):L('Полная подача','Full serving')}
function treatCardImage(treat){return treat.asset||(treat.buffet?'assets/images/buffets/sushi-ship-full.webp':`assets/images/food-${treat.img}.png`)}
function renderTreatWish(){renderChefWish();renderFoodCatalog()}
function renderFoodCatalog(){
  const list=$('treats');
  if(!list.children.length){
    list.innerHTML=carpetFood.map((treat,index)=>({treat,index})).sort((a,b)=>treatUnlockLevels[a.index]-treatUnlockLevels[b.index]||a.treat.cost-b.treat.cost).map(({treat,index})=>
      `<button type="button" class="treat-card" data-treat="${index}"><img src="${treatCardImage(treat)}" alt="" draggable="false" loading="lazy"><b class="dish-name"></b><strong class="dish-price"></strong><small class="dish-effect"></small><small class="dish-status"></small></button>`).join('');
  }
  list.querySelectorAll('.treat-card').forEach(button=>{
    const index=+button.dataset.treat,treat=carpetFood[index],unlocked=isTreatUnlocked(index),active=(state.treatUntil[index]||0)>Date.now(),adReady=canUnlockTreatWithAd(index),cost=treatPrice(treat),wished=state.treatWish?.index===index;
    const stage=active&&treat.buffet?buffetStageText(index):'';
    const key=JSON.stringify([gameLanguage,unlocked,active,adReady,cost,state.food<cost,wished,stage]);
    if(button.dataset.renderKey===key)return;
    button.dataset.renderKey=key;
    button.className='treat-card'+(treat.premium?' premium':'')+(active?' active':!unlocked?' level-locked':state.food<cost?' locked':'')+(wished?' wished':'');
    button.querySelector('.dish-name').textContent=itemName(treat);
    button.querySelector('.dish-price').textContent=compactNumber(cost)+' 🐟';
    button.querySelector('.dish-effect').textContent=treat.clickMultiplier?L('Тап ×','Tap ×')+treat.clickMultiplier:L('Сытость +10','Hunger +10');
    button.querySelector('.dish-status').textContent=active?(treat.buffet?buffetStageText(index):L('У Шефа','Served')):unlocked?L(treat.minutes+' мин.',treat.minutes+' min.'):adReady?L('Ур. '+treatUnlockLevels[index]+' / 🎬 сейчас','Lv. '+treatUnlockLevels[index]+' / 🎬 now'):L('🔒 Ур. '+treatUnlockLevels[index],'🔒 Lv. '+treatUnlockLevels[index]);
    button.setAttribute('aria-disabled',String(active||(unlocked&&state.food<cost)));
  });
  updateFoodArrows();
}
function updateFoodArrows(){
  const list=$('treats');
  $('foodPrev').disabled=list.scrollLeft<=1;
  $('foodNext').disabled=list.scrollLeft+list.clientWidth>=list.scrollWidth-2;
}
function scrollFood(direction){
  const list=$('treats'),card=list.firstElementChild;
  list.scrollBy({left:direction*((card?.offsetWidth||180)+12),behavior:'smooth'});
}
function focusWishedFood(index){
  const list=$('treats'),card=list.querySelector(`[data-treat="${index}"]`);
  if(!card)return;
  const left=card.offsetLeft-(list.clientWidth-card.offsetWidth)/2;
  list.scrollTo({left:Math.max(0,left),behavior:'smooth'});
  card.classList.remove('wish-focus');
  requestAnimationFrame(()=>{card.classList.add('wish-focus');setTimeout(()=>card.classList.remove('wish-focus'),2600)});
}
function renderCare(updateTreats=false){updateCare();['hunger','mood','rest'].forEach(key=>{const value=Math.round(state.care[key]);$(`${key}Bar`).style.width=`${value}%`;$(`${key}Value`).textContent=`${value}%`});const request=state.care.request?careRequests[state.care.request]:null;renderChefWish();$('careRequestIcon').textContent=request?.icon||'🐾';$('careRequestTitle').textContent=request?(gameLanguage==='en'?request.enTitle:request.title):L('Шеф обдумывает пожелания','Chef Is Considering His Demands');$('careRequestText').textContent=request?(gameLanguage==='en'?request.enText:request.text):L('Он сообщит, когда потребуется персонал.','He will notify the staff when needed.');$('careAction').textContent=request?(gameLanguage==='en'?request.enAction:request.action):L('Ожидаем распоряжений','Awaiting orders');$('careAction').disabled=!request;const remaining=Math.max(0,state.care.bonusUntil-Date.now());$('careBonus').classList.toggle('active',remaining>0);$('careBonus').textContent=remaining>0?L(`Забота одобрена: доход ×2 ещё ${Math.ceil(remaining/60000)} мин.`,`Care approved: income ×2 for ${Math.ceil(remaining/60000)} more min.`):L('Бонус заботы пока не действует.','Care bonus is not active.');renderFoodCatalog()}
function currentLevel(){let i=0;levels.forEach((l,n)=>{if(state.total>=l.at)i=n});return i}
const achievementQueue=[];
let achievementShowing=false,achievementDelayTimer;
function showNextAchievement(){if(achievementShowing||!achievementQueue.length)return;if($('levelCelebration').classList.contains('show')){if(!achievementDelayTimer)achievementDelayTimer=setTimeout(()=>{achievementDelayTimer=null;showNextAchievement()},2850);return}achievementShowing=true;const award=achievementQueue.shift();$('achievementToastIcon').textContent=award.icon;$('achievementToastTitle').textContent=itemName(award);$('achievementToastText').textContent=itemDesc(award);$('achievementToast').classList.add('show');setTimeout(()=>playSound('reward',.62),350);setTimeout(()=>{$('achievementToast').classList.remove('show');setTimeout(()=>{achievementShowing=false;showNextAchievement()},350)},3600)}
function checkAchievements(){achievements.forEach(award=>{if(award.done()&&!state.earnedAchievements.includes(award.name)){state.earnedAchievements.push(award.name);achievementQueue.push(award);trackEvent('achievement_unlocked',{achievement:award.name})}});if(achievementQueue.length){save();showNextAchievement()}}
let levelCelebrationTimer;
function showLevelCelebration(levelIndex){clearTimeout(levelCelebrationTimer);$('levelCelebrationTitle').textContent=`${levelIndex+1} · ${itemName(levels[levelIndex])}`;$('levelCelebration').classList.remove('show');void $('levelCelebration').offsetWidth;$('levelCelebration').classList.add('show');levelCelebrationTimer=setTimeout(()=>$('levelCelebration').classList.remove('show'),2700)}
function returnToSceneForLevel(levelIndex){document.querySelectorAll('.shop.open').forEach(panel=>{panel.classList.remove('open');panel.setAttribute('aria-hidden','true')});document.querySelectorAll('.nav-button').forEach(button=>button.classList.toggle('active',button.id==='openFeed'));playSound('level',.9);showLevelCelebration(levelIndex);setTimeout(()=>playPurr(true),2100)}
let renderedLevel=currentLevel();
let renderedBoxStage=-1;
function render(updatePanels=false){
  $('food').textContent=compactNumber(state.food); $('perClick').textContent=L(`+${format(perClick())} рыбов`,`+${format(perClick())} fish`);
  renderAd();
  updateTreatWish();
  $('income').textContent=`+${compactNumber(cps())}${L('/с','/s')}`; const li=currentLevel();
  if(li!==renderedLevel){state.outfit=null;const advanced=li>renderedLevel;renderedLevel=li;if(advanced)returnToSceneForLevel(li);trackEvent(`level_${li+1}`);save();updatePanels=true}
  const level=levels[li],next=levels[li+1];
  const roomStage=li===levels.length-1?4:li>=10?3:li>=8?2:li>=4?1:0;
  if(activeRoomStage!==roomStage){activeRoomStage=roomStage;applyLayout()}
  document.querySelector('.game').style.setProperty('--room-bg',`url("${rooms[roomStage]}")`);
  document.querySelector('.game').style.setProperty('--room-bg-desktop',`url("${desktopRooms[roomStage]}")`);
  document.querySelector('.game').classList.toggle('cosmic-final',li===levels.length-1);
  const boxStage=boxStages.findLastIndex(stage=>stage.level<=li+1),box=boxStages[boxStage],boxDecor=$('boxDecor');
  if(box&&boxDecor.getAttribute('src')!==box.img)boxDecor.src=box.img;
  boxDecor.alt=box?(gameLanguage==='en'?box.name[1]:box.name[0]):'';
  if(boxStage!==renderedBoxStage){renderedBoxStage=boxStage;if(box){boxDecor.classList.remove('arriving');void boxDecor.offsetWidth;boxDecor.classList.add('arriving');setTimeout(()=>boxDecor.classList.remove('arriving'),950)}}
  $('level').textContent=`${li+1} · ${itemName(level)}`;
  const chosen=outfits.find(o=>o.id===state.outfit&&li>=o.unlock);
  const catImage=chosen?chosen.img:level.img;
  if($('catBody').getAttribute('src')!==catImage)$('catBody').src=catImage;
  const buffet=activeBuffet(),premiumDish=activePremiumDish();
  const bowlImage=buffetImage(buffet)||premiumDish?.treat.asset||bowlImages[Math.min(li,bowlImages.length-1)];
  if($('bowl').getAttribute('src')!==bowlImage)$('bowl').src=bowlImage;
  $('bowl').classList.toggle('buffet-active',!!buffet);
  $('bowl').classList.toggle('premium-dish-active',!!premiumDish);
  $('catBody').style.transform=`scale(${chosen?.scale??level.scale})`;
  $('catBody').style.filter=chosen?.filter??level.filter??'';
  $('levelProgress').style.width=next?`${Math.min(100,(state.total-level.at)/(next.at-level.at)*100)}%`:'100%';
  if(updatePanels)$('upgrades').innerHTML=upgrades.map(u=>`<button class="upgrade ${state.food<price(u)?'locked':''}" data-id="${u.id}"><span class="icon"><img src="${u.iconAsset}" alt="" draggable="false"></span><span><b>${itemName(u)} · ${state.counts[u.id]}</b><small>${itemDesc(u)}</small></span><span class="price">🐟 ${format(price(u))}</span></button>`).join('');
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
  if(updatePanels)$('achievements').innerHTML=achievements.map(a=>`<article class="achievement ${a.done()?'earned':'locked'}"><span class="achievement-icon"><img src="${a.iconAsset}" alt="" draggable="false"></span><div><b>${itemName(a)}</b><small>${itemDesc(a)}</small></div><strong>${a.done()?L('Получено','Earned'):L('Не открыто','Locked')}</strong></article>`).join('');
  if(updatePanels||$('care').classList.contains('open')||$('foodShop').classList.contains('open'))renderCare(updatePanels);
  renderTreatWish();
  checkAchievements();
}
let lastClickPhrase=0;
function feed(e){if(zoomiesRunning||gameIsPaused()||document.querySelector('.game').classList.contains('layout-mode'))return;const buffet=activeBuffet(),gain=perClick()*(buffet?.treat.clickMultiplier||1),before=currentLevel();state.food+=gain;state.total+=gain;if(buffet){state.buffetClicks[buffet.index]=(state.buffetClicks[buffet.index]||0)+1;const clicks=state.buffetClicks[buffet.index],isPearl=buffet.treat.buffetKey==='pearl-shell',isShip=buffet.treat.buffetKey==='sushi-ship';if(clicks===1){$('phrase').textContent=isPearl?L('Раковина принята. Жемчуг оставить в бухгалтерии.','Shell accepted. Leave the pearl with accounting.'):!isShip?L('Фуршет принят. Приступаю к дегустации.','Buffet accepted. Let the tasting begin.'):L('Корабль принят. Экипаж свободен.','The ship is accepted. The crew may leave.');showCatThought('happy',isPearl?L('О, подача с драгоценностями.','Oh, a serving with jewels.'):L('О, любимая рыбка.','Oh, my favorite fish.'))}else if(clicks===buffet.treat.stageClicks[1]){$('phrase').textContent=L('Шеф проявил умеренность. Почти.','Chef has shown restraint. Almost.');showCatThought('happy',isPearl?L('Жемчужина осталась. Остальное — нет.','The pearl remains. The rest does not.'):!isShip?L('Всё съедено. Посуда остаётся вам.','All eaten. You may keep the dishes.'):L('Корабль пропал без вести.','The ship has gone missing.'))}}const after=currentLevel();if(after<=before){playFeedSound();if(after===levels.length-1)playPurr()}const cat=$('cat'),bowl=$('bowl');cat.classList.add('bop');bowl.classList.add('served');setTimeout(()=>{cat.classList.remove('bop');bowl.classList.remove('served')},180);if(after>before){$('phrase').textContent=after===12?L('Шеф официально перешёл к заслуженному отдыху. Государственные дела подождут.','Chef has officially entered well-earned retirement. Affairs of state can wait.'):after===13?L('Достигнута абсолютная сытость. Шеф доволен и продолжает принимать рыбов.','Absolute satisfaction achieved. Chef is pleased and continues accepting fish.'):L(`Новый статус: «${itemName(levels[after])}». Шеф ожидал этого раньше.`,`New status: “${itemName(levels[after])}”. Chef expected it sooner.`);lastClickPhrase=Date.now()}else if(!buffet&&Date.now()-lastClickPhrase>18000&&Math.random()<.06){const pool=gameLanguage==='en'?englishPhrases:phrases;$('phrase').textContent=pool[Math.floor(Math.random()*pool.length)];lastClickPhrase=Date.now()}const f=document.createElement('span');f.className='floater';f.textContent=`+${format(gain)} 🐟`;f.style.left=`${e?.clientX||innerWidth/2}px`;f.style.top=`${e?.clientY||innerHeight/2}px`;$('floaters').append(f);setTimeout(()=>f.remove(),850);render(after>before);save()}
$('cat').addEventListener('click',feed);$('feed').addEventListener('click',feed);
$('cat').addEventListener('contextmenu',e=>e.preventDefault());
const panels=['chefWish','foodShop','shop','wardrobe','awards','care','settings'];
const navButtons=['openFeed','openShop','openWardrobe','openAwards'];
function showPanel(panelId,buttonId){if(panelId&&$(panelId).classList.contains('open'))panelId=null;if(!panelId)buttonId=null;playSound('ui-click',.65);panels.forEach(id=>{$(id).classList.toggle('open',id===panelId);$(id).setAttribute('aria-hidden',id===panelId?'false':'true')});document.querySelector('.game').classList.toggle('menu-open',!!panelId);navButtons.forEach(id=>$(id).classList.toggle('active',id===buttonId));if(panelId)render(true)}
$('openFeed').addEventListener('click',()=>showPanel('foodShop','openFeed'));
$('closeFoodShop').addEventListener('click',()=>showPanel(null));
document.querySelector('.game').addEventListener('click',e=>{if(!document.querySelector('.shop.open')||e.target.closest('.shop,.bottom-nav,.top-actions,.layout-tools,.reward-confirm'))return; e.preventDefault();e.stopPropagation();showPanel(null)},true);
$('openShop').addEventListener('click',()=>showPanel('shop','openShop'));
$('closeShop').addEventListener('click',()=>showPanel(null,'openFeed'));
$('openWardrobe').addEventListener('click',()=>showPanel('wardrobe','openWardrobe'));
$('closeWardrobe').addEventListener('click',()=>showPanel(null,'openFeed'));
$('openAwards').addEventListener('click',()=>showPanel('awards','openAwards'));
$('closeAwards').addEventListener('click',()=>showPanel(null,'openFeed'));
$('openCare').addEventListener('click',()=>{showPanel('chefWish');renderChefWish(true);save()});
$('closeChefWish').addEventListener('click',()=>showPanel(null));
$('wishFood').addEventListener('click',()=>{const index=state.treatWish?.index;showPanel('foodShop','openFeed');if(Number.isInteger(index))requestAnimationFrame(()=>requestAnimationFrame(()=>focusWishedFood(index)))});
$('wishCare').addEventListener('click',()=>showPanel('care'));
$('closeCare').addEventListener('click',()=>showPanel(null,'openFeed'));
function renderSettings(){const music=$('toggleMusic'),effects=$('toggleEffects');music.classList.toggle('enabled',state.music);effects.classList.toggle('enabled',state.sfx);music.querySelector('strong').textContent=state.music?L('ВКЛ','ON'):L('ВЫКЛ','OFF');effects.querySelector('strong').textContent=state.sfx?L('ВКЛ','ON'):L('ВЫКЛ','OFF')}
$('openSettings').addEventListener('click',()=>{showPanel('settings');renderSettings()});
$('closeSettings').addEventListener('click',()=>showPanel(null,'openFeed'));
$('toggleMusic').addEventListener('click',()=>{state.music=!state.music;if(state.music){backgroundMusic.volume=MUSIC_VOLUME;ensureMusic()}else{clearInterval(musicRampTimer);clearTimeout(duckRestoreTimer);backgroundMusic.pause()}renderSettings();save()});
$('toggleEffects').addEventListener('click',()=>{state.sfx=!state.sfx;if(!state.sfx)stopEffects();renderSettings();save()});
let pendingRewardedAction=null;
function closeRewardConfirm(){pendingRewardedAction=null;$('rewardConfirm').classList.remove('show');$('rewardConfirm').setAttribute('aria-hidden','true')}
function confirmRewardedAction(title,text,action){pendingRewardedAction=action;$('rewardConfirmWatch').disabled=false;$('rewardConfirmTitle').textContent=title;$('rewardConfirmText').textContent=text;$('rewardConfirm').classList.add('show');$('rewardConfirm').setAttribute('aria-hidden','false');$('rewardConfirmWatch').focus()}
$('rewardConfirmCancel').addEventListener('click',closeRewardConfirm);
$('rewardConfirmWatch').addEventListener('click',()=>{const action=pendingRewardedAction;closeRewardConfirm();action?.()});
$('rewardConfirm').addEventListener('click',e=>{if(e.target===$('rewardConfirm'))closeRewardConfirm()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('rewardConfirm').classList.contains('show'))closeRewardConfirm()});
// Keep a drag from buying or opening an advertisement on pointer release.
let foodDrag=null,foodSuppressClickUntil=0;
$('treats').addEventListener('click',e=>{if(Date.now()<foodSuppressClickUntil){e.preventDefault();e.stopImmediatePropagation()}},true);
$('treats').addEventListener('pointerdown',e=>{
  if(e.pointerType!=='mouse'||e.button!==0)return;
  foodDrag={id:e.pointerId,x:e.clientX,left:$('treats').scrollLeft,moved:false};
});
$('treats').addEventListener('pointermove',e=>{
  if(!foodDrag||e.pointerId!==foodDrag.id)return;
  const delta=e.clientX-foodDrag.x,list=$('treats');
  if(Math.abs(delta)>6){foodDrag.moved=true;list.setPointerCapture(e.pointerId)}
  if(foodDrag.moved){e.preventDefault();list.scrollLeft=foodDrag.left-delta/(list.getBoundingClientRect().width/list.offsetWidth);foodSuppressClickUntil=Date.now()+400}
});
function finishFoodDrag(){if(foodDrag?.moved)foodSuppressClickUntil=Date.now()+400;foodDrag=null}
$('treats').addEventListener('pointerup',finishFoodDrag);
$('treats').addEventListener('pointercancel',finishFoodDrag);
$('treats').addEventListener('lostpointercapture',finishFoodDrag);
$('treats').addEventListener('wheel',e=>{
  if(e.ctrlKey)return;
  const list=$('treats');if(list.scrollWidth<=list.clientWidth)return;
  e.preventDefault();
  const delta=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;
  list.scrollLeft+=delta*(e.deltaMode===1?20:e.deltaMode===2?list.clientWidth:1);
},{passive:false});
$('treats').addEventListener('scroll',updateFoodArrows,{passive:true});
$('foodPrev').addEventListener('click',()=>scrollFood(-1));
$('foodNext').addEventListener('click',()=>scrollFood(1));
new ResizeObserver(updateFoodArrows).observe($('treats'));
$('treats').addEventListener('click',e=>{const button=e.target.closest('.treat-card');if(!button)return;const index=+button.dataset.treat;if(isTreatUnlocked(index))return;e.stopImmediatePropagation();const treat=carpetFood[index],name=itemName(treat);if(!canUnlockTreatWithAd(index)){$('phrase').textContent=L(`Секретное блюдо пока не раскрывает условий. Возвращайтесь на уровне ${treat.adLevel}.`,`The secret dish is not revealing its terms yet. Return at level ${treat.adLevel}.`);playSound('error',.4);return}const hiddenName=isPremiumTreat(index)?L('секретное блюдо','secret dish'):name;confirmRewardedAction(L(`Открыть «${hiddenName}» за рекламу?`,`Unlock “${hiddenName}” by watching an ad?`),L('Посмотрите ролик полностью — блюдо откроется навсегда, и его можно будет покупать за рыбов.','Watch the full video to unlock this dish permanently. You can then buy it with fish.'),()=>showRewardedAction({event:'treat_unlock',onReward:()=>{state.adTreatUnlocks.push(index);if(state.treatWish?.index===index){rememberCompletedWish();state.treatWish=null;state.nextTreatWish=Date.now()+(6+Math.random()*4)*60000}},success:L(`«${name}» открыто навсегда. Теперь его можно купить за рыбов.`,`“${name}” is permanently unlocked. You can now buy it with fish.`)}))},true);
$('treats').addEventListener('click',e=>{
  const button=e.target.closest('.treat-card');if(!button)return;updateCare();
  const index=+button.dataset.treat,treat=carpetFood[index],name=itemName(treat),cost=treatPrice(treat),activeUntil=state.treatUntil[index]||0;
  if(activeUntil>Date.now()){$('phrase').textContent=treat.buffet?L(`«${name}» уже подано: ${buffetStageText(index).toLowerCase()}. Продолжайте кормить Шефа.`,`“${name}” is already served: ${buffetStageText(index).toLowerCase()}. Keep feeding Chef.`):L(`«${name}» уже подано. Можно выбрать другое блюдо.`,`“${name}” is already served. You may choose another dish.`);return}
  if(state.food<cost){playSound('error',.45);$('phrase').textContent=L(`Для «${name}» не хватает ${format(cost-state.food)} рыбов.`,`You need ${format(cost-state.food)} more fish for “${name}”.`);return}
  if(!treat.buffet&&state.care.hunger>75&&Math.random()<.18){const refusal=treatText(treat,'refuse')||L('Нет. Просто нет.','No. Just no.');playSound('cat-soft',.6);$('cat').classList.add('refuses');$('bowl').classList.add('refused');$('phrase').textContent=refusal;showCatThoughtDelayed('fussy',refusal);setTimeout(()=>{$('cat').classList.remove('refuses');$('bowl').classList.remove('refused')},850);trackEvent('treat_refused',{treat:treat.name,reaction:'fussy'});return}
  state.food-=cost;state.care.hunger=Math.min(100,state.care.hunger+10);state.care.mood=Math.min(100,state.care.mood+4);
  if(treat.premium)carpetFood.forEach((item,itemIndex)=>{if(item.premium&&itemIndex!==index)state.treatUntil[itemIndex]=0});
  state.treatUntil[index]=Date.now()+treat.minutes*60000;if(treat.buffet)state.buffetClicks[index]=0;
  $('cat').classList.add('feasting');$('bowl').classList.add('served');setTimeout(()=>{$('cat').classList.remove('feasting');$('bowl').classList.remove('served')},650);playFeedSound();
  const serving=treatText(treat,'serve')||L(`«${name}» подано.`,`“${name}” has been served.`);$('phrase').textContent=serving;showCatThoughtDelayed(treat.reaction||'happy',serving);if(treat.buffet)playSound('cat-soft',.62);else setTimeout(()=>playPurr(),450);trackEvent('treat_served',{treat:treat.name,minutes:treat.minutes,reaction:treat.reaction||'happy'});save();render(true)
});
$('careAction').addEventListener('click',()=>{updateCare();const type=state.care.request;if(!type)return;if(type==='hunger'){const cost=Math.max(10,perClick()*8);if(state.food<cost){playSound('error');$('careRequestText').textContent=L(`Для особого перекуса не хватает ${format(cost-state.food)} рыбов.`,`The special snack needs ${format(cost-state.food)} more fish.`);return}state.food-=cost}state.care[type]=Math.min(100,state.care[type]+32);state.care.request=null;state.care.bonusUntil=Date.now()+5*60*1000;state.care.nextRequest=Date.now()+(2+Math.random())*3600000;playSound('reward',.75);if(type==='hunger')playPurr();else playSound(type==='mood'?'cat-happy-2':'cat-soft',.72);$('phrase').textContent=type==='hunger'?L('Особый перекус принят. Шеф великодушно не оставил ни крошки.','Special snack accepted. Chef generously left no crumbs.'):type==='mood'?L('Перо побеждено. Настроение руководства улучшилось.','The feather was defeated. Management morale improved.'):L('Тишина объявлена государственной необходимостью.','Silence has been declared a matter of national importance.');save();render(true)});
const AD_WATCH_COOLDOWN=300000;
let lastAdWatch=+(localStorage.getItem('absurd8-last-ad-watch')||0);
function showRewardedAction({event,onReward,success}){if(adRequestPending)return;const remaining=AD_WATCH_COOLDOWN-(Date.now()-lastAdWatch);if(remaining>0){playSound('error',.45);const message=L(`Следующая реклама будет доступна через ${Math.ceil(remaining/1000)} сек.`,`The next ad will be available in ${Math.ceil(remaining/1000)} sec.`);$('phrase').textContent=message;$('adStatus').textContent=message;return}if(!ysdk?.adv){playSound('error');const message=L('Реклама будет доступна после запуска игры на Яндекс Играх.','Ads will be available after launching the game on Yandex Games.');$('phrase').textContent=message;$('adStatus').textContent=message;return}adRequestPending=true;trackEvent(`${event}_clicked`);renderAd();let rewarded=false;const fail=()=>{adRequestPending=false;resumeGameAfterAd();playSound('error');const message=L('Сейчас реклама недоступна. Попробуйте немного позже.','Ads are unavailable right now. Please try again later.');$('phrase').textContent=message;$('adStatus').textContent=message;render(true)};try{const result=ysdk.adv.showRewardedVideo({callbacks:{onOpen:()=>{lastAdWatch=Date.now();localStorage.setItem('absurd8-last-ad-watch',String(lastAdWatch));pauseGameForAd();$('adStatus').textContent=L('Просмотр начался. Награда будет выдана после завершения.','Video started. The reward will be granted after completion.')},onRewarded:()=>{if(rewarded)return;syncPausedTimers();rewarded=true;onReward();trackEvent(`${event}_rewarded`);save()},onClose:()=>{adRequestPending=false;resumeGameAfterAd();if(rewarded)playSound('reward');const message=rewarded?success:L('Просмотр не завершён — награда не выдана.','Video not completed — no reward was granted.');$('phrase').textContent=message;$('adStatus').textContent=message;render(true)},onError:fail}});result?.catch?.(fail)}catch(error){fail()}}
function mainRewardedAdClick(){if(adRequestPending)return;const cooldown=AD_WATCH_COOLDOWN-(Date.now()-lastAdWatch);if(cooldown>0){const message=L(`Следующая реклама будет доступна через ${Math.ceil(cooldown/1000)} сек.`,`The next ad will be available in ${Math.ceil(cooldown/1000)} sec.`);$('phrase').textContent=message;$('adStatus').textContent=message;return}const instantReward=adRewardAmount();showRewardedAction({event:'ad',onReward:()=>{state.food+=instantReward;state.total+=instantReward;state.adBonusUntil=Date.now()+5*60*1000},success:L(`Спонсор выделил ${format(instantReward)} рыбов. Доход ×3 на 5 минут.`,`The sponsor allocated ${format(instantReward)} fish. Income ×3 for 5 minutes.`)})}
function openBoostOffer(){if(adRequestPending)return;const cooldown=Math.max(0,AD_WATCH_COOLDOWN-(Date.now()-lastAdWatch));if(cooldown>0){confirmRewardedAction(L('Реклама пока недоступна','Ad not ready'),L('Общий перерыв для ускорения и блюд: осталось '+Math.ceil(cooldown/1000)+' сек.','Shared cooldown for boosts and dishes: '+Math.ceil(cooldown/1000)+' seconds left.'),null);$('rewardConfirmWatch').disabled=true;return}confirmRewardedAction(L('Ускорение на 5 минут','Boost for 5 minutes'),L('За полный просмотр: +'+format(adRewardAmount())+' рыбов сразу и набор рыбов ×3 на 5 минут.','Watch the full ad for +'+format(adRewardAmount())+' fish now and ×3 fish earnings for 5 minutes.'),mainRewardedAdClick)}
$('rewardedAd').addEventListener('click',openBoostOffer);

$('outfits').addEventListener('click',e=>{const card=e.target.closest('.outfit-card');if(!card)return;const outfit=outfits.find(o=>o.id===card.dataset.outfit);if(currentLevel()<outfit.unlock){$('phrase').textContent=L('Шеф ещё не заслужил этот наряд. Хотя он с этим не согласен.','Chef has not earned this outfit yet. He strongly disagrees.');return}state.outfit=outfit.id;$('phrase').textContent=L(`Шеф выбрал: «${itemName(outfit)}». Публика может аплодировать.`,`Chef chose “${itemName(outfit)}”. The audience may applaud.`);save();render(true)});
$('upgrades').addEventListener('click',e=>{const b=e.target.closest('.upgrade');if(!b)return;const u=upgrades.find(x=>x.id===b.dataset.id),p=price(u);if(state.food>=p){state.food-=p;state.counts[u.id]++;playSound('buy',.7);if(['grandma','chef','delivery','mouse','laser'].includes(u.id))state.helperUntil[u.id]=Math.max(Date.now(),state.helperUntil[u.id]||0)+5*60*1000;if(u.id==='box')state.helperUntil.box=Math.max(Date.now(),state.helperUntil.box||0)+10*60*1000;if(u.id==='ministry')state.helperUntil.ministry=Math.max(Date.now(),state.helperUntil.ministry||0)+15*60*1000;const message=u.id==='ministry'?L(`Министерский запас и сертификат выданы на ${Math.ceil((state.helperUntil.ministry-Date.now())/60000)} мин.`,`Ministry reserves and certificate issued for ${Math.ceil((state.helperUntil.ministry-Date.now())/60000)} min.`):L(`Куплено: «${itemName(u)}» · уровень ${state.counts[u.id]}.`,`Purchased: “${itemName(u)}” · level ${state.counts[u.id]}.`);$('phrase').textContent=message;$('shopMessage').textContent=message;$('shopMessage').className='panel-message success';trackEvent('upgrade_bought',{upgrade:u.id,level:state.counts[u.id]});save();render(true);if(['grandma','chef','delivery'].includes(u.id)){$('shop').classList.remove('open');$('shop').setAttribute('aria-hidden','true')}}else{playSound('error');const message=L(`Не хватает ${format(p-state.food)} рыбов.`,`You need ${format(p-state.food)} more fish.`);$('phrase').textContent=message;$('shopMessage').textContent=message;$('shopMessage').className='panel-message warning';renderAd();b.classList.add('nope');setTimeout(()=>b.classList.remove('nope'),300)}});
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
function scheduleRoomEvent(first=false){clearTimeout(roomEventTimer);roomEventTimer=setTimeout(()=>{if(gameIsPaused()){scheduleRoomEvent();return}const event=roomEvents[Math.floor(Math.random()*roomEvents.length)],toy=$('roomEvent');toy.innerHTML=`<img src="${event.img}" alt="">`;toy.dataset.phrase=gameLanguage==='en'?event.enPhrase:event.phrase;toy.dataset.sound=event.sound;toy.style.setProperty('--event-x',`${12+Math.random()*72}%`);toy.style.setProperty('--event-y',`${30+Math.random()*38}%`);toy.classList.add('show');setTimeout(()=>{if(toy.classList.contains('show')){toy.classList.remove('show');scheduleRoomEvent()}},9000)},first?5000:18000+Math.random()*18000)}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){trackEvent('game_hidden',{level:currentLevel()+1,total:Math.floor(state.total)});stopGameplay();stopAllSounds()}else{startGameplay();ensureMusic()}});
document.addEventListener('contextmenu',e=>e.preventDefault());
addEventListener('blur',()=>{windowBlurred=true;stopGameplay();stopAllSounds()});
addEventListener('focus',()=>{windowBlurred=false;startGameplay();ensureMusic()});
const layoutItems=[...document.querySelectorAll('.layout-item')];
const layoutStage=document.querySelector('.helper-stage');
function layoutProfile(){return'landscape'}
let activeRoomStage=0;
const layoutKey=()=>`absurd8-layout-v9-landscape-room-${activeRoomStage+1}`;
const defaultLayouts={
  landscape:{certificateDecor:{z:-5,hidden:false,left:23.18,top:0,width:9.99},grandmaHelper:{z:0,hidden:false,left:21.87,top:33.12,width:10.09},mouseDecor:{z:0,hidden:false,left:1.44,top:0,width:4.91},boxDecor:{z:-5,hidden:false,left:56.04,top:35.62,width:13.65},chefHelper:{z:0,hidden:false,left:79.69,top:25.8,width:22.31},deliveryHelper:{z:2,hidden:false,left:0,top:50.57,width:18.19},laserDecor:{z:0,hidden:false,left:21.9,top:97,width:3},cat:{z:0,hidden:false,dx:-1.05,dy:10.57,scale:.8},bowl:{z:0,hidden:false,dx:-.38,dy:2.14,scale:1.4},foodProp1:{z:0,hidden:false,left:23.48,top:87.11,width:5},foodProp2:{z:0,hidden:false,left:21.74,top:70.8,width:5},foodProp3:{z:0,hidden:false,left:70.8,top:85.78,width:4},foodProp4:{z:-1,hidden:false,left:76.76,top:82.89,width:14},foodProp5:{z:0,hidden:false,left:25.96,top:66.71,width:15.99},foodProp6:{z:0,hidden:false,left:68.4,top:68.39,width:13.99},foodProp7:{z:0,hidden:false,left:17.62,top:75.47,width:5},foodProp8:{z:-1,hidden:false,left:3.39,top:83.35,width:9.99},foodProp9:{z:0,hidden:false,left:58.3,top:74.89,width:11},foodPileDecor:{z:-5,hidden:false,left:28.14,top:39.1,width:14.97},roomEvent:{z:0,hidden:false,dx:-14.43,dy:-25.29,scale:1},phrase:{z:-1,hidden:false,dx:0,dy:0,scale:1}}
};
let selectedLayoutItem=null;
const roomLayoutOverrides={
  0:{grandmaHelper:{z:0,hidden:false,left:11.6,top:34.95,width:10.09},boxDecor:{z:-5,hidden:false,left:62.5,top:60.58,width:13.65}},
  1:{grandmaHelper:{z:0,hidden:false,left:24.65,top:28.19,width:10.09},boxDecor:{z:-5,hidden:false,left:56.04,top:35.62,width:13.65}},
  2:{grandmaHelper:{z:0,hidden:false,left:15.89,top:28.62,width:10.09},boxDecor:{z:-5,hidden:false,left:56.04,top:35.62,width:13.65}},
  3:{grandmaHelper:{z:0,hidden:false,left:21.87,top:33.12,width:10.09},boxDecor:{z:-5,hidden:false,left:56.04,top:35.62,width:13.65}}
};
function masterLayout(){const profile=layoutProfile();return {...defaultLayouts[profile],...(roomLayoutOverrides[activeRoomStage]||{})}}
function layoutOverridesEnabled(){return layoutEditorMode||document.querySelector('.game')?.classList.contains('layout-mode')}
function readLayout(){const master=masterLayout();if(!layoutOverridesEnabled())return master;try{return {...master,...JSON.parse(localStorage.getItem(layoutKey())||'{}')}}catch(e){return master}}
function itemStage(item){return item.dataset.layoutMode==='offset'?document.querySelector('.game'):(item.closest('.food-decor,.helper-stage')||layoutStage)}
function applyLayout(){const saved=readLayout();layoutItems.forEach(item=>{const pos=saved[item.id];if(!pos)return;item.style.zIndex=pos.z??'';item.style.visibility=pos.hidden?'hidden':'';if(item.dataset.layoutMode==='offset'){item.style.setProperty('--layout-x',`${pos.dx||0}vw`);item.style.setProperty('--layout-y',`${pos.dy||0}dvh`);item.style.setProperty('--layout-scale',pos.scale||1);return}const isFood=item.classList.contains('food-prop'),safeLeft=isFood?Math.max(0,Math.min(100-(pos.width||10),pos.left)):pos.left,safeTop=isFood?Math.max(5,Math.min(90,pos.top)):pos.top;item.style.left=`${safeLeft}%`;item.style.top=`${safeTop}%`;item.style.right='auto';item.style.bottom='auto';item.style.width=`${pos.width}%`;item.style.height=item.id==='laserDecor'?`${pos.width}%`:'auto'})}
function saveLayoutItem(item){const saved=readLayout(),previous=saved[item.id]||{},common={z:+item.style.zIndex||previous.z||0,hidden:previous.hidden||false};if(item.dataset.layoutMode==='offset'){saved[item.id]={...common,dx:+(parseFloat(item.style.getPropertyValue('--layout-x'))||0).toFixed(2),dy:+(parseFloat(item.style.getPropertyValue('--layout-y'))||0).toFixed(2),scale:+(parseFloat(item.style.getPropertyValue('--layout-scale'))||1).toFixed(2)}}else{const stageRect=itemStage(item).getBoundingClientRect(),rect=item.getBoundingClientRect();saved[item.id]={...common,left:+((rect.left-stageRect.left)/stageRect.width*100).toFixed(2),top:+((rect.top-stageRect.top)/stageRect.height*100).toFixed(2),width:+(rect.width/stageRect.width*100).toFixed(2)}}localStorage.setItem(layoutKey(),JSON.stringify(saved))}
function layoutPositionText(item){if(!item)return'Выберите предмет';const pos=readLayout()[item.id]||{};return item.dataset.layoutMode==='offset'?`${item.dataset.layoutName}: X ${(+pos.dx||0).toFixed(2)}% · Y ${(+pos.dy||0).toFixed(2)}% · размер ${(+pos.scale||1).toFixed(2)}`:`${item.dataset.layoutName}: X ${(+pos.left||0).toFixed(2)}% · Y ${(+pos.top||0).toFixed(2)}% · ширина ${(+pos.width||0).toFixed(2)}%`}
function updateLayoutControls(){if(!selectedLayoutItem){$('layoutStatus').textContent='Выберите предмет';$('layoutLayer').textContent='Слой: —';return}const pos=readLayout()[selectedLayoutItem.id]||{},z=+selectedLayoutItem.style.zIndex||pos.z||0;$('layoutStatus').textContent=layoutPositionText(selectedLayoutItem);$('layoutLayer').textContent=`Слой: ${z}`;$('toggleLayoutVisibility').textContent=pos.hidden?'Показать':'Скрыть';$('layoutSelect').value=selectedLayoutItem.id}
function selectLayoutItem(item){selectedLayoutItem=item;layoutItems.forEach(x=>{x.classList.toggle('selected-layout',x===item);x.classList.toggle('layout-editing',x===item)});updateLayoutControls()}
function setLayoutMode(on){document.querySelector('.game').classList.toggle('layout-mode',on);$('layoutTools').setAttribute('aria-hidden',on?'false':'true');if(on&&!selectedLayoutItem)selectLayoutItem(layoutItems[0]);if(!on)selectLayoutItem(null)}
$('layoutSelect').innerHTML=layoutItems.map(item=>`<option value="${item.id}">${item.dataset.layoutName}</option>`).join('');
$('layoutSelect').addEventListener('change',e=>selectLayoutItem($(e.target.value)));
$('layoutToggle').addEventListener('click',()=>{playSound('ui-click');setLayoutMode(!document.querySelector('.game').classList.contains('layout-mode'))});
$('closeLayout').addEventListener('click',()=>setLayoutMode(false));
layoutItems.forEach(item=>item.addEventListener('pointerdown',e=>{if(!document.querySelector('.game').classList.contains('layout-mode'))return;e.preventDefault();e.stopPropagation();selectLayoutItem(item);item.setPointerCapture(e.pointerId);const stageRect=itemStage(item).getBoundingClientRect(),itemRect=item.getBoundingClientRect(),startX=e.clientX,startY=e.clientY,startDx=parseFloat(item.style.getPropertyValue('--layout-x'))||0,startDy=parseFloat(item.style.getPropertyValue('--layout-y'))||0,grabX=e.clientX-itemRect.left,grabY=e.clientY-itemRect.top;const move=ev=>{if(item.dataset.layoutMode==='offset'){const dx=startDx+(ev.clientX-startX)/innerWidth*100,dy=startDy+(ev.clientY-startY)/innerHeight*100;item.style.setProperty('--layout-x',`${dx}vw`);item.style.setProperty('--layout-y',`${dy}dvh`);$('layoutStatus').textContent=`${item.dataset.layoutName}: X ${dx.toFixed(2)}% · Y ${dy.toFixed(2)}%`;return}const rect=item.getBoundingClientRect(),left=Math.max(0,Math.min(stageRect.width-rect.width,ev.clientX-stageRect.left-grabX)),top=Math.max(0,Math.min(stageRect.height-rect.height,ev.clientY-stageRect.top-grabY));item.style.left=`${left/stageRect.width*100}%`;item.style.top=`${top/stageRect.height*100}%`;item.style.right='auto';item.style.bottom='auto';$('layoutStatus').textContent=`${item.dataset.layoutName}: X ${(left/stageRect.width*100).toFixed(2)}% · Y ${(top/stageRect.height*100).toFixed(2)}%`};const done=()=>{item.removeEventListener('pointermove',move);saveLayoutItem(item);updateLayoutControls()};item.addEventListener('pointermove',move);item.addEventListener('pointerup',done,{once:true});item.addEventListener('pointercancel',done,{once:true})}));
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
function testBuffetStage(key,stage){const index=carpetFood.findIndex(treat=>treat.buffetKey===key),treat=carpetFood[index];if(!treat)return;carpetFood.forEach((item,itemIndex)=>{if(item.buffet&&itemIndex!==index)state.treatUntil[itemIndex]=0});state.treatUntil[index]=Date.now()+treat.minutes*60000;const [halfAt,emptyAt]=treat.stageClicks;state.buffetClicks[index]=stage==='empty'?emptyAt:stage==='half'?halfAt:0;$('phrase').textContent=L(`${itemName(treat)}: ${stage==='empty'?'пустой этап':stage==='half'?'половина':'полная подача'}.`,`${itemName(treat)}: ${stage} stage.`);render(true)}
function initTestMode(){if(!testMode)return;const panel=$('testPanel'),select=$('testLevel');panel.hidden=false;const stages=document.createElement('div');stages.className='test-actions';stages.innerHTML=carpetFood.filter(t=>t.stageAssets).map(t=>['full','half','empty'].map(stage=>`<button data-buffet="${t.buffetKey}" data-stage="${stage}">${itemName(t)}: ${stage==='full'?L('полное','full'):stage==='half'?L('половина','half'):L('пустое','empty')}</button>`).join('')).join('');panel.append(stages);select.innerHTML=levels.map((level,index)=>`<option value="${index}">${index+1} · ${level.name}</option>`).join('');select.value=String(currentLevel());$('testClose').addEventListener('click',()=>panel.classList.toggle('compact'));panel.addEventListener('click',e=>{const buffetButton=e.target.closest('[data-buffet]');if(buffetButton){testBuffetStage(buffetButton.dataset.buffet,buffetButton.dataset.stage);save();return}const action=e.target.closest('[data-test]')?.dataset.test;if(!action)return;const selected=+select.value,now=Date.now();if(action==='set-level'){state.total=levels[selected].at;state.food=Math.max(state.food,levels[selected].at);renderedLevel=selected;render(true)}if(action==='next-level'){const next=Math.min(levels.length-1,currentLevel()+1);state.total=levels[next].at;state.food=Math.max(state.food,levels[next].at);render(true);select.value=String(next)}if(action==='fish'){const amount=Math.max(1000,levels[Math.min(levels.length-1,currentLevel()+1)].at-state.total);state.food+=amount;state.total+=amount;render(true)}if(action==='reward'){const award=achievements.find(item=>!state.earnedAchievements.includes(item.name))||achievements.at(-1);achievementQueue.push(award);showNextAchievement()}if(action==='items'){upgrades.forEach(item=>{state.counts[item.id]=Math.max(1,state.counts[item.id]);state.helperUntil[item.id]=now+15*60000});render(true)}if(action==='end-items'){state.helperUntil={};render(true)}if(action==='dishes'){state.adTreatUnlocks=carpetFood.map((_,index)=>index);state.food=Math.max(state.food,carpetFood.reduce((sum,item)=>sum+treatPrice(item),0));$('phrase').textContent=L('Все блюда открыты для последовательной проверки.','All dishes are unlocked for sequential testing.');render(true)}if(action==='end-dishes'){state.treatUntil={};render(true)}if(action==='accept')testDishReaction(false);if(action==='refuse')testDishReaction(true);if(action==='ad-success'){const reward=adRewardAmount();state.food+=reward;state.total+=reward;state.adBonusUntil=now+5*60000;playSound('reward');$('phrase').textContent=`Тест рекламы: начислено ${format(reward)} рыбов, доход ×3 на 5 минут.`;render(true)}if(action==='ad-cancel'){$('phrase').textContent='Тест рекламы: ролик закрыт, награда не начислена.';playSound('error',.45)}if(action==='reset'){localStorage.removeItem(saveKey);location.reload()}save()})}
$('testPanel').addEventListener('click',e=>{if(!testMode)return;const reaction=e.target.closest('[data-reaction]')?.dataset.reaction;if(reaction)showCatThought(reaction,L(...catReactionNames[reaction]))});
let suppressSave=false;
$('testReset').addEventListener('click',e=>{if(!testMode)return;e.stopPropagation();suppressSave=true;localStorage.removeItem(saveKey);location.reload()});
let zoomiesRunning=false,zoomiesElapsed=0,zoomiesPath=[],zoomiesLastFrame=0;
const ZOOMIES_INTERVAL=2*60*60*1000,ZOOMIES_DURATION=6000;
const zoomiesFrames=[1,2,3].map(n=>{const img=new Image();img.src=`assets/images/reactions/tigidik_${n}.webp`;return img});
function zoomiesBlocked(){return gameIsPaused()||adRequestPending||!!document.querySelector('.shop.open,.reward-confirm.show,.level-celebration.show,.game.layout-mode')}
function zoomiesPose(progress,path){
  const angle=progress*Math.PI*2*path.turns,direction=path.direction;
  if(path.kind==='walls')return {x:50+40*Math.sin(angle),y:50+35*Math.cos(angle),rotation:-angle*180/Math.PI,scale:.85,flip:1};
  if(path.kind==='eight')return {x:50+38*Math.sin(angle),y:50+30*Math.sin(angle*2),rotation:Math.sin(angle*2)*30,scale:.9,flip:Math.cos(angle)>=0?1:-1};
  return {x:50+direction*Math.sin(angle)*34*(1-.35*progress),y:68-40*progress+12*(1-.3*progress)*Math.cos(angle),rotation:direction*Math.sin(angle)*18,scale:1-.25*progress,flip:direction*Math.cos(angle)>=0?1:-1};
}
function startZoomies(kind){
  if(zoomiesRunning||zoomiesBlocked()||!zoomiesFrames.every(img=>img.complete&&img.naturalWidth))return false;
  zoomiesRunning=true;zoomiesElapsed=-1600;state.zoomiesActiveMs=0;
  zoomiesPath={kind:['spiral','walls','eight'].includes(kind)?kind:['spiral','walls','eight'][Math.floor(Math.random()*3)],direction:Math.random()<.5?-1:1,turns:3};
  pauseZoomiesAudio();zoomiesAudio=zoomiesAudioTracks[zoomiesPath.kind==='walls'?1:0];zoomiesAudio.currentTime=0;syncZoomiesAudio();
  $('zoomiesCat').hidden=true;$('feed').disabled=true;
  clearTimeout(delayedThoughtTimer);clearTimeout(thoughtBatchTimer);
  $('phrase').textContent=L('Я чувствую Зло…','I sense evil…');
  showCatThought('trash',$('phrase').textContent);
  save();return true;
}
function finishZoomies(){
  pauseZoomiesAudio();zoomiesAudioTracks.forEach(audio=>audio.currentTime=0);
  zoomiesRunning=false;$('zoomiesCat').hidden=true;$('feed').disabled=false;
  document.querySelector('.game').classList.remove('zoomies-running');
  $('phrase').textContent=L('Бесы укрощены. Продолжайте кормить.','Demons tamed. Resume feeding.');
  showCatThought('happy',L('Бесы укрощены.','Demons tamed.'));save();
}
function tickZoomies(timestamp){
  const dt=zoomiesLastFrame?Math.min(250,Math.max(0,timestamp-zoomiesLastFrame)):0;zoomiesLastFrame=timestamp;
  if(!zoomiesBlocked()){
    if(zoomiesRunning){
      syncZoomiesAudio();
      zoomiesElapsed+=dt;
      const now=Date.now();Object.keys(state.treatUntil).forEach(key=>{if(state.treatUntil[key]>now-dt)state.treatUntil[key]+=dt});
      if(zoomiesElapsed>=ZOOMIES_DURATION)finishZoomies();
      else if(zoomiesElapsed>=0){
        const cat=$('zoomiesCat'),pose=zoomiesPose(zoomiesElapsed/ZOOMIES_DURATION,zoomiesPath);
        if(cat.hidden){
          clearTimeout(thoughtTimer);$('catThought').classList.remove('show');
          document.querySelector('.game').classList.add('zoomies-running');cat.hidden=false;
          $('phrase').textContent=L('Тыгыдык! Миска подождёт.','Zoomies! Dinner can wait.');
        }
        const frame=zoomiesFrames[Math.floor(zoomiesElapsed/100)%3].src;if(cat.src!==frame)cat.src=frame;
        cat.style.left=`${pose.x}%`;cat.style.top=`${pose.y}%`;
        cat.style.transform=`translate(-50%,-50%) rotate(${pose.rotation}deg) scale(${pose.scale}) scaleX(${pose.flip})`;
      }
    }else{
      state.zoomiesActiveMs=Math.min(ZOOMIES_INTERVAL,(Number.isFinite(state.zoomiesActiveMs)?Math.max(0,state.zoomiesActiveMs):0)+dt);
      if(state.zoomiesActiveMs>=ZOOMIES_INTERVAL)startZoomies();
    }
  }
  if(zoomiesBlocked())pauseZoomiesAudio();
  requestAnimationFrame(tickZoomies);
}
$('testZoomies').addEventListener('click',()=>{if(testMode&&!startZoomies($('testZoomiesRoute').value))$('phrase').textContent=L('Закройте меню и редактор; дождитесь завершения тыгыдыка и загрузки кадров.','Close menus and the editor; wait for zoomies to finish and frames to load.')});
requestAnimationFrame(tickZoomies);
function updateMobileControls(){
  const side=['both','left','right'].includes(state.feedSide)?state.feedSide:'both';
  document.querySelector('.game').dataset.feedSide=side;
  $('mobileControlsTitle').textContent=L('Кнопки кормления','Feeding buttons');
  document.querySelectorAll('button[data-feed-side]').forEach(button=>{
    button.textContent=({both:L('Обе','Both'),left:L('Слева','Left'),right:L('Справа','Right')})[button.dataset.feedSide];
    button.setAttribute('aria-pressed',String(button.dataset.feedSide===side));
  });
  document.querySelectorAll('.mobile-feed').forEach(button=>{
    button.setAttribute('aria-label',L('Покормить кота','Feed the cat'));
    button.querySelector('small').textContent=`+${compactNumber(perClick()*(activeBuffet()?.treat.clickMultiplier||1))}`;
    button.disabled=$('feed').disabled;
  });
}
document.querySelectorAll('.mobile-feed').forEach(button=>button.addEventListener('click',feed));
document.querySelectorAll('button[data-feed-side]').forEach(button=>button.addEventListener('click',()=>{state.feedSide=button.dataset.feedSide;updateMobileControls();save()}));
$('openSettings').addEventListener('click',updateMobileControls);
new MutationObserver(updateMobileControls).observe($('perClick'),{childList:true,characterData:true,subtree:true});
new MutationObserver(updateMobileControls).observe($('feed'),{attributes:true,attributeFilter:['disabled']});
updateMobileControls();
function save(){if(suppressSave)return;syncPausedTimers();state.last=Date.now();localStorage.setItem(saveKey,JSON.stringify(state));queueCloudSave()}
const away=Math.min(4*3600,Math.max(0,(Date.now()-(state.last||Date.now()))/1000));if(away>10&&cps()>0){const bonus=Math.floor(away*cps());state.food+=bonus;state.total+=bonus;$('phrase').textContent=L(`Пока тебя не было, Шеф получил ${format(bonus)} рыбов.`,`While you were away, Chef received ${format(bonus)} fish.`)}
function syncOrientation(){if(needsLandscape()||masterOrientationPaused){stopGameplay();stopAllSounds()}else{startGameplay();ensureMusic()}}
setInterval(()=>{syncPausedTimers();if(gameIsPaused())return;const gain=cps()/10;state.food+=gain;state.total+=gain;render()},100);setInterval(()=>{if(gameIsPaused())return;updateCare();save();if($('care').classList.contains('open'))renderCare();else renderChefWish()},60000);setInterval(save,5000);addEventListener('beforeunload',save);applyGameLanguage(queryParams.get('lang')||'ru');updateCare();render(true);applyLayout();addEventListener('resize',()=>{applyLayout();syncOrientation()});addEventListener('orientationchange',syncOrientation);addEventListener('load',applyLayout,{once:true});initTestMode();if(testMode||layoutEditorMode){$('layoutToggle').hidden=false;$('layoutToggle').setAttribute('aria-hidden','false')}if(layoutEditorMode)setLayoutMode(true);initCatThoughts();scheduleRoomEvent(true);setTimeout(()=>trackEvent('session_30_sec'),30000);setTimeout(()=>trackEvent('session_1_min'),60000);setTimeout(()=>trackEvent('session_3_min'),180000);setTimeout(()=>trackEvent('session_5_min'),300000);setTimeout(()=>{introMinElapsed=true;finishIntroWhenReady()},3000);setTimeout(()=>{initialDataReady=true;finishIntroWhenReady()},8000);
