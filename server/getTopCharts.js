//Data file responsible for populating top charts data. To be written to database for reading

const puppeteer = require('puppeteer');
axios = require('axios');

async function getBillboard() {
    const url = 'https://www.billboard.com/charts/hot-100';
    const browser = await puppeteer.launch({ args: ['--no-sandbox']});
    const page = await browser.newPage();
    await page.goto(url); //At Billboard top 100

    var billboard = await page.evaluate(() => {
        var strcharts;

        try{
            strcharts = Array.from(document.querySelectorAll("ol.chart-list__elements\
            li span.chart-element__information")).map(resp => resp.innerText)
        }
        catch{
            strcharts = null;
        }
        finally{
            return strcharts;
        }

    });
    await browser.close();
    return orderData(billboard)
}

async function orderData(billboardLst) {

    charts = [];

    for(var i = 0; i < billboardLst.length; i++){
        coverArt =  await getCoverArt(billboardLst[i]);
        info = billboardLst[i].split('\n');
        songname = info[0]
        artist = info[1]
        charts.push({rank: i+1, cover: coverArt, name: songname, artist: artist});
    }

    return charts;
    
}

async function getCoverArt(Track) {
    coverArt = null

    const ACCESS_TOKEN = "B418NCQcIJIcycbwqph5aEa5kZrEe_2Nlhq0oLRrMPonRkw9xoOU-UlhxycKG4m5"
    
    const headers = {
        Authorization: `Bearer ${ACCESS_TOKEN}`
    };
    
    if("Not found" == Track){
        coverArt = "Not found";
        return coverArt;
    }
    
    Track = Track.replace("\n", "%20");

    var query = Track.replace(/\s+/g, "%20");
    
    const url = `https://api.genius.com/search?q=${query}`
    
    var apiData = await axios.get(url, {headers})

    try {
        //Data recieved from Genius.com
        apiData = ((apiData.data).response.hits[0]).result;
        //Store relevant data
        coverArt = apiData.song_art_image_thumbnail_url;
    }
    catch {
        coverArt = null;
    }

    return coverArt;
}

//getBillboard().then(response => console.log(response)).catch(err => console.log(err));
//getCoverArt('Breaking Me\nTopic & A7S').then(resp => console.log(resp))
module.exports.getBillboard = getBillboard;