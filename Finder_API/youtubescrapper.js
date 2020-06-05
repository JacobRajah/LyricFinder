const puppeteer = require('puppeteer');

const url = 'https://www.youtube.com/';
async function scrapeYoutube(usrIn){
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url); //At Google.ca

    await page.type("input", usrIn);

    await page.keyboard.press('Enter');

    //await page.$eval("button#search-icon-legacy", elem => elem.click());

    await page.waitForSelector('a.yt-simple-endpoint.style-scope.ytd-video-renderer');
    //await page.screenshot({path: '2.png'});

    var lst = await page.evaluate(()=>{
        
        return Array.from(document.querySelectorAll('a.yt-simple-endpoint.style-scope.ytd-video-renderer')).map((partner)=> partner.title.trim());

    });

    await browser.close();
    return lst;

};

module.exports.scrapeYoutube = scrapeYoutube;