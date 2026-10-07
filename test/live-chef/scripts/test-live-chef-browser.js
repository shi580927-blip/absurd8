const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  for(const lang of ['ru','en']){
   const page=await browser.newPage({viewport:{width:1920,height:1080}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(`http://127.0.0.1:8765/scene.html?test=1&level=11&lang=${lang}`);
   await page.waitForFunction(()=>typeof showRewardedAction==='function');
   await page.evaluate(()=>{brandIntroFinished=true;windowBlurred=false;$('introSplash')?.remove();lastAdWatch=0;ysdk={adv:{showRewardedVideo:({callbacks})=>{window.testAdCallbacks=callbacks}},features:{GameplayAPI:{start(){},stop(){}}}};state.total=levels[10].at;state.adTreatUnlocks=[];renderedLevel=10;render(true)});
   assert.equal(await page.evaluate(()=>document.documentElement.lang),lang);
   await page.locator('#openFeed').click();
   await page.locator('[data-treat="12"]').click();
   await page.locator('#rewardConfirmWatch').click();
   assert.equal(await page.evaluate(()=>!!window.testAdCallbacks),true);
   assert.equal(await page.evaluate(()=>EventDirector.activeEvent),'ad');
   await page.evaluate(()=>{testAdCallbacks.onOpen();testAdCallbacks.onRewarded();testAdCallbacks.onRewarded();testAdCallbacks.onClose()});
   assert.equal(await page.evaluate(()=>state.adTreatUnlocks.filter(i=>i===12).length),1);
   assert.equal(await page.locator('#foodShop').evaluate(e=>e.classList.contains('open')),true);
   assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('absurd8-test-save')).adTreatUnlocks.includes(12)),true);
   await page.reload();await page.waitForFunction(()=>typeof state==='object');
   assert.equal(await page.evaluate(()=>state.adTreatUnlocks.includes(12)),true);assert.equal(await page.evaluate(()=>currentLevel()),10);
   assert.deepEqual(errors,[]);
   console.log(`${lang}: level 11 -> Food -> next-level premium dish -> rewarded unlock -> menu restored -> saved reload PASS`);
   await page.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
