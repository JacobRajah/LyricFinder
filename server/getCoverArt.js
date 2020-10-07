const puppeteer = require('puppeteer');

async function getCoverArt(SongName, Artist) {

    const url = 'https://genius.com/';
    const browser = await puppeteer.launch({ args: ['--no-sandbox']});
    const page = await browser.newPage();
    await page.goto(url); //At Genius.com
    search = SongName + " " + Artist
    await page.type("div.PageHeaderdesktop__Container-bhx5ui-0.dmNhEr input.PageHeaderSearchdesktop__Input-eom9vk-2.cWJVsy", search);
    await page.$eval("div.PageHeaderSearchdesktop__Icon-eom9vk-1.irpyXK", elem => elem.click());

    await page.waitForSelector("div.u-quarter_vertical_margins.u-clickable");

    await page.evaluate(() => {
        document.querySelector("div.u-quarter_vertical_margins.u-clickable a.mini_card").click();
    });

    //await page.waitForSelector("div.cover_art");
    await page.waitForNavigation();

    source  = await page.evaluate(() => {
        if(document.querySelector("div.cover_art img") != null){
            return document.querySelector("div.cover_art img").src
        }
        if(document.querySelector("div.SizedImage__Container-sc-1hyeaua-0 noscript") != null){
            return document.querySelector("div.SizedImage__Container-sc-1hyeaua-0 noscript").innerText
        }

        return "Nothing"
        
    });

    if(source.indexOf('"') !== -1){
        start = source.indexOf('"');
        source = source.substr(start+1,source.length);
        end = source.indexOf('"');
        source = source.substr(0, end);
    }

    browser.close();
    return source;
    
}

getCoverArt("Savage Remix", "Megan the Stallion").then(source => console.log(source)).catch(err => console.log(err));
