
//Var title which is returned is of format [songname, artist]

async function scrapeGoogle(page, ytResultList){

    var title;
    title = await goToResultsGoogle(page, ytResultList[0]);
    if(title != null){
        return await title;
    }

    for(var i = 1; i < ytResultList.length; i++){
        title = await goToResults(page, ytResultList[i]);

        if(title != null){
            return await title;
        }
    }

    //If reached here then no results found
    return ['Not found', ''];

}

//Take index 0 result from youtube and try to find title. If not successful, take second index and try again
//Noticed that when the first index doesnt work, the second does or the third...
async function goToResultsGoogle(page, ytResult) {
    if(typeof(ytResult) != "string"){
        return null;
        console.log("Not string -google")
    }
    else{
        await page.type("input.gLFyf.gsfi", ytResult + "lyrics");

        await page.$eval("input.gNO89b", elem => elem.click());
    
        await page.waitForNavigation()
            
        var title = await evaluatePage(page);
    
        if(title == null){
            //In last case eval page using search without lyrics
            await page.$eval("div.BKRPef.M2vV3", elem => elem.click());
            await page.type("input.gLFyf.gsfi", ytResult);
            await page.$eval("button.Tg7LZd", elem => elem.click());
            await page.waitForNavigation();
            title = await evaluatePage(page);
        }
    
        return await title;
    }
}

async function goToResults(page, ytResult) {
    if(typeof(ytResult) != "string"){
        return null;
        console.log("Not string - not google")
    }
    else {
        //Assumes were at a google search already
        await page.$eval("div.BKRPef.M2vV3", elem => elem.click());
        await page.type("input.gLFyf.gsfi", ytResult + "lyrics");
        await page.$eval("button.Tg7LZd", elem => elem.click());

        await page.waitForNavigation()
            
        var title = await evaluatePage(page);

        if(title == null){
            //In last case eval page using search without lyrics
            await page.$eval("div.BKRPef.M2vV3", elem => elem.click());
            await page.type("input.gLFyf.gsfi", ytResult);
            await page.$eval("button.Tg7LZd", elem => elem.click());
            await page.waitForNavigation();
            title = await evaluatePage(page);
        }

        return await title;
    }
}

async function evaluatePage(page) {
    var title = await page.evaluate(()=>{
        
        //Case 1: of google provides lyrics
        if(document.querySelector('div.SPZz6b span') != null){
            return Array.from(document.querySelectorAll('div.SPZz6b span')).map(elem => elem.innerText);
        }
        return null;

    });

    if(title == null){
        //Case 2: Use google music
        var result = await page.evaluate(()=>{
            var found = false;
            if(document.getElementsByClassName('hl') == null){
                return found;
            }
            Array.from(document.getElementsByClassName('hl')).forEach(element => {
                if(element.innerText == "Google Play Music"){
                    element.click();
                    found = true;
                }
            });
            return found;
        });
        // Executed only if the result is found
        if(result){
            await page.waitForSelector('div.info-text');

            title = await page.evaluate(()=>{
                if(document.querySelector('div.info-text a') != null && 
                    document.querySelector('div.album-artist.fade-out a') != null){
                        return [document.querySelector('div.info-text a').innerText, 
                        document.querySelector('div.album-artist.fade-out a').innerText];

                }
                return null;
            });
        }

        else{
            title = null;
        }

    }

    return await title;   
}

//This is a promise so need a then statement
// scrapeGoogle().then(result=>{
//     console.log(result);
// });
module.exports.scrapeGoogle = scrapeGoogle;