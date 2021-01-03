const puppeteer = require('puppeteer');

/*
    Method opens indexUrl and finds an input form.
    Then injects the searchKey and executes to result page.
*/
async function searchSiteByKey(page, indexUrl, searchKey) {
    await page.goto(indexUrl);

    const getData = async() => {
        return await page.evaluate(async () => {
            return await new Promise(resolve => {
                let INPUT_TYPE_SEARCH = '';
                let documentForm = document.forms[0];
                for(var i = 0; i < documentForm.length; i++) {
                    const inputTextExists = 
                    documentForm[i].tagName &&
                    documentForm[i].tagName.toLowerCase() == "input" && 
                    documentForm[i].type.toLowerCase() == "text";
        
                    const inputSearchExists = 
                    documentForm[i].tagName &&
                    documentForm[i].tagName.toLowerCase() == "input" && 
                    documentForm[i].type.toLowerCase() == "search";

                    if(inputTextExists) {
                        INPUT_TYPE_SEARCH = 'input[type=text]';
                    } else if(inputSearchExists) {
                        INPUT_TYPE_SEARCH = 'input[type=search]';
                    } 
                }
                resolve(INPUT_TYPE_SEARCH);
          })
        })
      }  


    INPUT_TYPE_SEARCH = await getData();
    await page.goto(indexUrl);
    await page.focus(INPUT_TYPE_SEARCH);
    await page.keyboard.type(searchKey);
    await page.waitForTimeout(3000); //not ideal. 
    await page.keyboard.press('Enter');
}

async function run (indexUrl, searchKey) {
    //Launch browser with default options. 
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    // Initiate search based on key
    await searchSiteByKey(page, indexUrl, searchKey);
    await page.waitForNavigation();

    //Take screenshot and close. 
    await page.screenshot({path: './screenshots/screenshot.png'});
    browser.close();
    return 1;
}

run(process.argv[2],process.argv[3]).then(value => {
    console.log(value);
});