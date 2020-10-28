const YouTube = require('simple-youtube-api');

async function youtube_api(lyrics) {
    // 1. AIzaSyCL68zGM27EqDKlRh7XSJe9tiDrZIMELVo
    // 2. AIzaSyD2ILvVYnwZSJVO1sWJh9V4KpqusyfJwi0
    const youtube = new YouTube(process.env.youtube);

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
