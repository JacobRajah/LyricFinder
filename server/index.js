//Main Frame for API scrapping work

const googleScrapper = require('./googlescrapper');
const youtubeScrapper = require('./youtubescrapper');

async function Main(page,lyrics){
    
    if(lyrics == null || lyrics == ""){
        return ['Not found', ''];
    }
    var lst = await youtubeScrapper.youtube_api(lyrics);
    //Returns a list with song and artist
    var data =  await googleScrapper.scrapeGoogle(page, lst);
    return data;
}

//Main("we fought until the sun rose and i still aint been to bed").then(elem => console.log(elem[0] + " by " + elem[1]));

module.exports.Main = Main;

