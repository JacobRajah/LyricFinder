const puppeteer = require('puppeteer');

async function scrapeGoogle(ytResult){
    const url = 'https://www.google.ca';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url); //At Google.ca

    //Take index 0 result from youtube and try to find title. If not successful, take second index and try again
    //Noticed that when the first index doesnt work, the second does or the third...
    await page.type("input.gLFyf.gsfi", ytResult + "lyrics");

    await page.$eval("input.gNO89b", elem => elem.click());

    await page.waitForNavigation()

    var title = await page.evaluate(()=>{
        
        //Case 1: of google provides lyrics
        if(document.querySelector('div.SPZz6b span') != null){
            return document.querySelector('div.SPZz6b span').innerText;
        }
        return null;

    });

    if(title == null){
        //Case 2: Use google music
        var result = await page.evaluate(()=>{
            var found = false;
            Array.from(document.getElementsByClassName('hl')).forEach(element => {
                if(element.innerText == "Google Play Music"){
                    element.click();
                    found = true;
                }
            });
            return found;
        });

        if(result){
            await page.waitForSelector('div.info-text');

            title = await page.evaluate(()=>{
                return document.querySelector('div.info-text a').innerText;
            });
        }

        else{
            title = 0;
        }

    }

    await browser.close();
    return await title;
}

//This is a promise so need a then statement
// scrapeGoogle().then(result=>{
//     console.log(result);
// });
module.exports.scrapeGoogle = scrapeGoogle;