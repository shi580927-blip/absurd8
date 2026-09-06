const fs=require('fs');
const vm=require('vm');

function createElement(){
  const classes=new Set();
  return {
    style:{setProperty(){},getPropertyValue(){return''},removeProperty(){}},
    classList:{add(...names){names.forEach(name=>classes.add(name))},remove(...names){names.forEach(name=>classes.delete(name))},toggle(name,on){if(on===undefined)on=!classes.has(name);on?classes.add(name):classes.delete(name);return on},contains(name){return classes.has(name)}},
    children:[],dataset:{},hidden:false,paused:true,volume:0,currentTime:0,
    setAttribute(){},getAttribute(){return''},addEventListener(){},removeEventListener(){},
    querySelector(){return createElement()},querySelectorAll(){return[]},focus(){},remove(){},
    play(){this.paused=false;return Promise.resolve()},pause(){this.paused=true},cloneNode(){return createElement()},canPlayType(){return'probably'},
    getBoundingClientRect(){return{left:0,top:0,width:720,height:900}}
  };
}

function run(language){
  const elements=new Map();
  const get=id=>{if(!elements.has(id))elements.set(id,createElement());return elements.get(id)};
  const document={
    documentElement:createElement(),visibilityState:'visible',title:'',
    getElementById:get,createElement,addEventListener(){},
    querySelector(){return createElement()},querySelectorAll(){return[]}
  };
  const storage=new Map();
  const context={
    console,document,window:{},location:{search:`?test=1&lang=${language}`,reload(){}},
    localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value),removeItem:key=>storage.delete(key)},
    Audio:function(){return createElement()},Image:function(){return createElement()},MutationObserver:function(){return{observe(){}}},
    URLSearchParams,setTimeout(){return 1},clearTimeout(){},setInterval(){return 1},clearInterval(){},addEventListener(){},
    innerWidth:1280,innerHeight:900,navigator:{clipboard:{writeText:async()=>{}}},prompt(){},Math,Date,JSON
  };
  context.window=context;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync('game.js','utf8'),context,{filename:'game.js'});
  if(document.documentElement.lang!==language)throw new Error(`Expected ${language}, got ${document.documentElement.lang}`);
  const expected=language==='en'?'FEED':'ПОКОРМИТЬ';
  if(get('feedLabel').textContent!==expected)throw new Error(`Expected ${expected}, got ${get('feedLabel').textContent}`);
  if(language==='en'&&/[А-Яа-яЁё]/.test(get('level').textContent))throw new Error(`Level is not translated: ${get('level').textContent}`);
}

run('ru');
run('en');
console.log('Localization smoke test passed for ru and en.');
