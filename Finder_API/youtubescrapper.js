// //const puppeteer = require('puppeteer');
// //AIzaSyAZxMuw_K8lrsiLFxqpQfhpwn8ZkVzXTSg

// //const url = 'https://www.youtube.com/';
// async function scrapeYoutube(page, usrIn){
//     // const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
//     // const page = await browser.newPage();

//     // await page.goto(url); //At Google.ca

//     await page.type("input", usrIn);

//     await page.keyboard.press('Enter');

//     //await page.$eval("button#search-icon-legacy", elem => elem.click());

//     await page.waitForSelector('a.yt-simple-endpoint.style-scope.ytd-video-renderer');
//     //await page.screenshot({path: '2.png'});

//     var lst = await page.evaluate(()=>{
        
//         return Array.from(document.querySelectorAll('a.yt-simple-endpoint.style-scope.ytd-video-renderer')).map((partner)=> partner.title.trim());

//     });

//     //await browser.close();
//     return lst;

// };

// module.exports.scrapeYoutube = scrapeYoutube;

const YouTube = require('simple-youtube-api');

async function youtube_api(lyrics) {
    // 1. AIzaSyCL68zGM27EqDKlRh7XSJe9tiDrZIMELVo
    // 2. AIzaSyD2ILvVYnwZSJVO1sWJh9V4KpqusyfJwi0
    const youtube = new YouTube('AIzaSyD2ILvVYnwZSJVO1sWJh9V4KpqusyfJwi0');

    try{
        var results = await youtube.searchVideos(lyrics, 5)
    }
    catch{
        console.log("Youtube Scrape Failed")
    }
    
    var titles = results.map(entry => {
        return entry.title;
    });
    return titles;
    
}

//youtube_api('i just took a dna test turns out').then(ret => {console.log(ret);})
module.exports.youtube_api = youtube_api;
