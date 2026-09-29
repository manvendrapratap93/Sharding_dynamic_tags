const{test,expect}=require('@playwright/test');

test("@smoke Mouse Actions",async({page})=>{
    await page.goto("https://www.amazon.in/");
    await page.locator("#nav-link-accountList").hover();
    await expect(page.locator("a[data-csa-c-slot-id='nav-link-accountList']")).toBeVisible();
    
    

})

test("@smoke Right click button",async({page})=>{
    await page.goto("https://www.amazon.in/");
    await page.locator("a[data-csa-c-slot-id='nav-link-accountList']").click({button:"right"});
    
})

test("@regression Dialog practise ",async({page})=>{
     await page.goto("https://www.hyrtutorials.com/p/alertsdemo.html");
     page.on('dialog', async dialog=>{
         console.log(dialog.message());
         await dialog.accept("nitin");
     })
     await page.locator("#promptBox").click();
     await expect(page.locator("#output")).toHaveText("You entered text nitin in propmt popup");
     

})

test("@regression Drag and Drop",async({page})=>{
    await page.goto("https://www.globalsqa.com/demo-site/draganddrop/",{waitUntil: "domcontentloaded" });
    const frame=page.frameLocator("iframe[src*='photo-manager']");
    await frame.locator("ul#gallery li").nth(2).dragTo(frame.locator("#trash"));
    

})

test("@regression File upload and download",async({page})=>{
    await page.goto("https://practice-automation.com/file-upload/");
    await page.locator("#file-upload").setInputFiles("tests/Practise1.spec.js-snapshots/sauce-demo-com-1-chromium-win32.png");
    await page.locator("#upload-btn").click();
    await expect(page.locator(".wpcf7-response-output")).toHaveText("Thank you for your message. It has been sent.");
    
})

test("@smoke Multi window page",async({page,context})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    const pagePromise=context.waitForEvent('page');
    await page.getByRole('link',{name:"OrangeHRM, Inc"}).click();
    const newPage=await pagePromise;
    console.log(await newPage.title());
    await page.bringToFront();
    console.log(await page.title());
})






