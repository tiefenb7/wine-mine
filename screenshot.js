const puppeteer = require('puppeteer');
const url = process.argv[2];

async function run () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({path: './screenshots/screenshot.png'});
    browser.close();
}

run();