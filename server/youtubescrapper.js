const YouTube = require('simple-youtube-api');

// Uses the youtube api to find results based on lyrics
async function youtube_api(lyrics) {
    
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
