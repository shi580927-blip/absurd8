const fs=require('fs');
const vm=require('vm');
const assert=require('assert/strict');
const code=fs.readFileSync('game.js','utf8');
const fragment=code.slice(code.indexOf('function layoutProfile()'),code.indexOf('function itemStage('));
for(const editor of [false,true]){
  const context=vm.createContext({layoutEditorMode:editor,document:{querySelector:()=>({classList:{contains:()=>editor}})},localStorage:{getItem:()=>JSON.stringify({grandmaHelper:{left:99,top:99}})}});
  vm.runInContext(fragment,context);
  assert.equal(vm.runInContext('readLayout().grandmaHelper.left',context),editor?99:11.6);
  assert.equal(vm.runInContext('readLayout().boxDecor.left',context),62.5);
  vm.runInContext('activeRoomStage=1',context);
  assert.equal(vm.runInContext('readLayout().grandmaHelper.left',context),editor?99:21.87);
  assert.equal(vm.runInContext('readLayout().boxDecor.left',context),56.04);
}
const index=fs.readFileSync('index.html','utf8');
assert.match(index,/width:1600px;height:900px/);
assert.match(index,/Math.min\(viewport.clientWidth\/1600,viewport.clientHeight\/900\)/);
for(const [w,h] of [[1920,1080],[1366,768],[844,390],[2560,1080]]){
  const scale=Math.min(w/1600,h/900);
  assert.ok(1600*scale<=w+0.001&&900*scale<=h+0.001);
  assert.ok(Math.abs(1600*scale/(900*scale)-16/9)<1e-12);
}
assert.match(fs.readFileSync('scene.html','utf8'),/id="grandmaHelper"/);
assert.doesNotMatch(code,/finalAspect=545\/475/);
console.log('Master grid: stored overrides isolated; FIT geometry passed for four viewport sizes.');
