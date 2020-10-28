axios = require('axios');
puppeteer = require('puppeteer');


async function requestSongData(Track, Artist){

    // Remove any unwanted characters
    Track = Track.replace(/[^a-zA-Z ]/g, "");
    Artist = Artist.replace(/[^a-zA-Z ]/g, "");

    var songData = {
        coverArt: null,
        lyrics: [],
        path: null
    }
    
    const ACCESS_TOKEN = process.env.genius
    
    const headers = {
        Authorization: `Bearer ${ACCESS_TOKEN}`
    };
    
    if("Not found" == Track){
        songData.path = "Not found";
        return songData;
    }
    
    Track = Track.replace(/\s/g, "%20");
    Artist = Artist.replace(/\s/g, "%20");

    query = Track + "%20" + Artist;
    
    const url = `https://api.genius.com/search?q=${query}`
    
    var apiData = await axios.get(url, {headers})

    try {
        //Data recieved from Genius.com
        apiData = ((apiData.data).response.hits[0]).result;
        //Store relevant data
        songData.coverArt = apiData.song_art_image_thumbnail_url;
        songData.path = apiData.url;
    }
    catch {
        //Fix functionality
        songData.coverArt = "../images/IMG_0094.jpg"
        songData.path = ""
    }

    //Accessing lyric populating api
    if((songData.path).includes("https://") == true){
        var lyrics = await axios({
            "method":"GET",
            data: {
                format: "jsonp",
            },
            "url":`https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${Track}&q_artist=${Artist}&apikey=${process.env.musixmatch}`,
            "headers":{
            "Accept": "text/plain"
            }
            });
        //console.log(lyrics.data.message.body.lyrics.lyrics_body);
        try{
            songData.lyrics = lyrics.data.message.body.lyrics.lyrics_body;
            // Attempt to strip lyrics of excess
            var pos = songData.lyrics.indexOf("*******");
            songData.lyrics = songData.lyrics.substr(0,pos)
            
        }
        catch{
            songData.lyrics = "Not Found"
        }     
    }    
    return songData;
}

//requestSongData("Ballin'", "Mustard").then(lyrics => console.log(lyrics)).catch(err => console.log(err))
module.exports.requestSongData = requestSongData;