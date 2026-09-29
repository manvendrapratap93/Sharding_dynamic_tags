const{test,expect}=require('@playwright/test')

test("@regression first test",async({page})=>{
     await page.goto("https://www.google.com/");
     await page.locator(".gLFyf").fill("playwright");
     await page.waitForSelector("ul[jsname='bw4e9b'] li");
     const allcounts=await page.locator("ul[jsname='bw4e9b'] li");
     console.log("Total counts :"+await allcounts.count());
     for(let i=0;i<await allcounts.count();i++){
        const optionText=(await allcounts.nth(i).innerText()).trim();
        console.log(optionText);
        if(optionText.includes("playwright interview questions")){
           await allcounts.nth(i).click();
           break;
        }}
        await page.waitForTimeout(3000);
    })



test(" @smoke third test",async({page})=>{
   await page.goto("https://vinothqaacademy.com/drop-down/");
   await page.locator("#simpleDropdown").selectOption({value:"LD"});
   await page.locator("#FromAccount").selectOption({value:"NRI"});
   await page.locator('select[name="programming"]').selectOption({value:"JAVA"},{value:"RUBY"});
   await page.waitForTimeout(5000);

})



