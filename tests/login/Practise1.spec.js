const { test, expect } = require('@playwright/test');

test('@smoke playwright 1 test', async ({ page }) => {
  await page.goto('https://www.google.com');
  console.log(await page.title());
  console.log(page.url());


}
);


test('@smoke testing prcatise locators', async ({ page }) => {
  await page.goto("https://practice.expandtesting.com/login");
  await page.getByLabel("Username").fill("practice");
  await page.getByLabel("Password").fill("SuperSecretPassword!");
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText("You logged into a secure area!")).toBeVisible();


})

test("@regression Input box and radio button", async ({ page }) => {

  await page.goto("https://testautomationpractice.blogspot.com/", { waitUntil: 'domcontentloaded' });
  const entername = page.getByPlaceholder("Enter Name");
  await expect(entername).toBeEmpty();
  await expect(entername).toBeVisible();
  await expect(entername).toBeEnabled();
  await expect(entername).toBeEditable();
  await entername.fill("Rajeev");
  const radiobutton = page.locator("#male");
  await expect(radiobutton).not.toBeChecked();
  await radiobutton.check();
  expect(await radiobutton.isChecked).toBeTruthy();
  const radiobutton1 = page.locator("#female");
  await expect(radiobutton1).not.toBeChecked();

 



})

test("@smoke check box practise", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  // await page.getByLabel("Sunday").check();
  // await expect(page.getByLabel("Sunday")).toBeChecked();
  // await expect(page.getByLabel("Wednesday")).not.toBeChecked();

  const monday = page.getByLabel("Monday");
  const tuesday = page.getByLabel("Tuesday");
  const saturday = page.getByLabel("Saturday");
  const checkboxed = [monday, tuesday, saturday];
  for (const checkbox of checkboxed) {
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  }

  for (const checkbox of checkboxed) {
    const ischeked = await checkbox.isChecked();
    if (ischeked) {
      await checkbox.uncheck();
      await expect(checkbox).not.toBeChecked();
    }

  }
  




})


test("@smoke google dropdown", async ({ page }) => {
  await page.goto("https://www.google.com/");
  await page.locator(".gLFyf").fill("playwright ");
  await page.waitForSelector("ul[jsname='bw4e9b'] li"); 
  const totallist = page.locator("ul[jsname='bw4e9b'] li");
  console.log(await totallist.count()); 
  for(let i=0;i<await totallist.count();i++){
     const ot=await totallist.nth(i).innerText();
     console.log(ot);
     if(ot==='playwright documentation'){
      await totallist.nth(i).click();
      break;
     }
  }




})

test("@regression spice jet dropdown",async({page})=>{
    await page.goto("https://www.spicejet.com/");
    const roundtrip = page.locator("div[data-testid='round-trip-radio-button']");
    await roundtrip.click();
    await page.locator("div[data-testid='to-testID-origin']").click();
    // await page.getByText("India").click();
    await page.locator("div[class*='css-1dbjc4n r-1awozwy r-1loqt21 r-18u37iz r-1wtj0ep']").getByText("Sri Guru Ram Dass Jee International Airport").click();
    
    })

test("@regression Multiselect  dropdown",async({page})=>{
       await page.goto("https://testautomationpractice.blogspot.com/");
       await page.locator("#animals").selectOption([{label:'Cheetah'},{label:'Elephant'},{label:'Lion'}]);
       await expect(page.locator("#animals").locator('Option:checked')).toContainText(['Cheetah', 'Elephant', 'Lion']);
       await expect(page.locator("#animals").locator("option")).toHaveCount(10);
       //verify if dropdown contains particular option 'lion'
       const options=await page.locator("#animals").locator("option");
       console.log("total count: "+await options.count());
       const isPresent=false;
       for(let i=0;i<await options.count();i++){
             const mls= await options.nth(i).textContent();
             if(mls==='Lion'){
               isPresent=true;
               break;
             }
       }
       
       


})



test("@smoke Hidden dropdown",async({page})=>{
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await page.getByPlaceholder("Username").fill("Admin");
  await page.getByPlaceholder("Password").fill("admin123");
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link',{name:'PIM'}).click();
  await page.locator("div.oxd-select-text.oxd-select-text--active").nth(2).click();
  await page.waitForSelector("div.oxd-select-option span",{state:'visible'});
  const options=await page.locator("div.oxd-select-option span");
  console.log("Total options : "+await options.count());
  options.getByText("VP - Client Services").click();
  for(let i=0;i<await options.count();i++){
    const option=await options.nth(i).innerText();
    if(option==="QA Engineer"){
      option.click();
      break;
    }
  }
  
})

test("@regression simple Alert dialog",async({page})=>{
   await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

   page.on('dialog', async dialog => {
    console.log(dialog.message());
    if(dialog.type() === 'alert'){
      expect(dialog.message()).toContain("share this practice page and share your knowledge");
      await dialog.accept();
    } else if(dialog.type() === 'confirm'){
      expect(dialog.message()).toEqual("Hello , Are you sure you want to confirm?");
      await dialog.dismiss();
    }else if(dialog.type()==='prompt'){
      expect(dialog.message()).toContain("Please enter your name");
      await dialog.accept();
    }
   });

   await page.locator("#alertbtn").click();
   await page.locator("#confirmbtn").click();
   await page.getByPlaceholder("Enter Your Name").fill("Rajeev");
   await page.locator("#alertbtn").click();
   await page.waitForTimeout(2000);
})

test('@smoke prompt dialog' ,async({page})=> {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.getByPlaceholder("Enter Your Name").fill("Rajeev");
  page.on('dialog', async dialog => {
     console.log(dialog.message());
     await dialog.accept();
  });
  await page.locator("#alertbtn").click();
  
})

test('@regression frame',async({page})=>{
await page.goto("https://www.hyrtutorials.com/p/frames-practice.html");
const form1=page.frameLocator("#frm1");
await form1.locator("#course").selectOption({value:'python'});
console.log(await form1.locator("#course").inputValue());

const form2=page.frameLocator("#frm2");
await form2.getByPlaceholder("Enter First Name").fill("Mps");
await form2.getByPlaceholder("Enter Last Name").fill("gysdfgad");
await page.waitForTimeout(2000);


})

test('@regression Static Table ',async({page})=>{
   await page.goto("https://testautomationpractice.blogspot.com/");
   const rows=page.locator("table[name='BookTable'] tr");
   console.log("Total rows : "+await rows.count());

    const columnheadingname=page.locator("table[name='BookTable'] tr th");
    console.log("Total Column heading names : "+await columnheadingname.count());
    console.log("Column headings : "+await columnheadingname.allTextContents());

    
    for(let i=1;i<await rows.count();i++)
      {
        const cols = rows.nth(i).locator("td");
        const rowstext = await cols.allTextContents();
        console.log(rowstext);
    }
  await page.waitForTimeout(2000);
})

test('@smoke Pagination static table',async({page})=>{
    await page.goto("https://practice.expandtesting.com/dynamic-pagination-table");

    const maintable=page.locator("table[id='example']");


    const columnheadingname=maintable.locator("th");
    console.log("Total count heading name : "+await columnheadingname.count());
    console.log("Column heading names : "+await columnheadingname.allTextContents());

    const rowcount=maintable.locator("tbody tr");
    console.log("Total rows : "+await rowcount.count());

    const totalpages=page.locator("li[class*='page-item']:not(#example_previous):not(#example_next)");
    console.log("Total pages : "+await totalpages.count());
    const totalPagesCount = await totalpages.count();

    for(let i=0;i<totalPagesCount;i++){
        await totalpages.nth(i).click();
        const totalRows = await rowcount.count();
        for(let j=0;j<totalRows;j++){
             const rows = rowcount.nth(j);
             const cells = rows.locator("td");
             const totalCells = await cells.count();
             for(let k=0;k<totalCells;k++){
               console.log(await cells.nth(k).textContent());
             }
             console.log("-------------------");
        }
    }
})

test('@regression checkbox pagination webtable',async({page})=>{
       await page.goto("https://testautomationpractice.blogspot.com/");

       const maintable=page.locator("table[id='productTable']");//Main table name

       const columnname=maintable.locator("tr th");
       console.log("Column names : "+await columnname.allTextContents());
       const totalcolumn=await columnname.count();// total columns

       const rowcount=maintable.locator("tbody tr");
       const rowCount=await rowcount.count();// total rows
       console.log("Total rows : "+rowCount);

       const pagination=page.locator("ul[id='pagination'] li");
       const totalpaginations=await pagination.count();
       console.log("Total pagination count : "+totalpaginations);//total paginations
       
     for(let i=0;i<totalpaginations;i++){
           await pagination.nth(i).click();
          for(let j=0;j<rowCount;j++){
              const rows=rowcount.nth(j);
              const cells=rows.locator("td");
              const totalcells=await cells.count();
             for(let k=0;k<totalcells;k++){
              const cellText = await cells.nth(k).textContent();
              console.log(cellText);
              if(cellText.includes("Gaming Console")){
                await rows.locator("td input[type='checkbox']").check();
                console.log("Checkbox is checked : "+await rows.locator("td input[type='checkbox']").isChecked());
              }
             }
          console.log("------------------------");
          }

   


     }

     
})

test('@regression Dynamic web table',async({page})=>{
   await page.goto("https://testautomationpractice.blogspot.com/");
   const maintable=page.locator("#taskTable");

   const columnName=maintable.locator("tr th");
   console.log("Column names : "+await columnName.allTextContents());
   const columnno=await columnName.count()// column name
   console.log("Total column count : "+columnno);

   const rowName=maintable.locator("tbody tr");
   const rowno=await rowName.count();// row name
   console.log("Total row count : "+rowno);

   for(let i=0;i<rowno;i++){
       const row=rowName.nth(i);
       const cells=row.locator("td");
       const totalcells=await cells.count();
       for(let j=0;j<totalcells;j++){
            const cellText=await cells.nth(j).textContent();
            console.log(cellText);
        }
        console.log("-------------------------");
   }

})












