const puppeteer = require('puppeteer');
const INPUT_TYPE_SEARCH = 'input[type=search]';

/*
    Method opens indexUrl and finds input of search type.
    Then injects the searchKey and executes to result page.
*/
async function searchSiteByKey(page, indexUrl, searchKey) {
    await page.goto(indexUrl);
    await page.focus(INPUT_TYPE_SEARCH);
    page.keyboard.type(searchKey);
    await page.waitForTimeout(3000); //not ideal. 
    page.keyboard.press('Enter');
}

async function run (indexUrl, searchKey) {
    //Launch browser with default options. 
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    // Initiate search based on key
    await searchSiteByKey(page, indexUrl, searchKey);
    await page.waitForNavigation();

    //Take screenshot and close. 
    await page.screenshot({path: './screenshots/screenshot.png'});
    browser.close();
    return 1;
}

let indexUrl = 'https://www.wine.com';
let searchKey = '1999';

run(indexUrl,searchKey).then(value => {
    console.log(value);
});