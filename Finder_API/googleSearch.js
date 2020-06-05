const puppeteer = require('puppeteer');

const url = 'https://google.ca/';

(async ()=>{
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil : ['load', 'domcontentloaded']}); //At Google.ca
    await page.setViewport({width: 1200, height: 1500})

    //await page.type("input.gLFyf.gsfi", "I've paid my dues");
    await page.type("input", "I put the for 4gs on the jeep");

    //await page.$eval("input.gNO89b", elem => elem.click());

    //await page.waitForNavigation()
    await page.keyboard.press('Enter')
    

    await page.screenshot({path: '2.png'});

    await browser.close();
})()