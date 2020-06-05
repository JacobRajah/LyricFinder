//Main Frame for API scrapping work

const googleScrapper = require('./googlescrapper');
const youtubeScrapper = require('./youtubescrapper');

async function Main(lyrics){
    if(lyrics == null){
        return 'Not found';
    }
    var lst = await youtubeScrapper.scrapeYoutube(lyrics);
    console.log(lst.length);
    for(var i = 0; i < lst.length; i++){
        var googleResult = await googleScrapper.scrapeGoogle(lst[i]);
        if(googleResult != 0){
            return googleResult;
        }
    }
    return 'Not found';
}

module.exports.Main = Main;

