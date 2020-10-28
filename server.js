//npm run dev to start
require('dotenv').config(); //set env
const api = require('./server/index');
const requestSongData = require('./server/requestSongData');
const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');

//---------Scrape setup------------
const puppeteer = require('puppeteer');

var page;
//---------------------------------

const app = express();

// parse json
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

//----------Initialize Data Structures--------------
const song = [
    {
        id : 1, 
        name: "null",
        artist: "null"
    }
];

var songData = {
    coverArt: null,
    lyrics: [],
    path: null
}

//------------------------------------------

//---------Scrape setup------------
startScrape().then(elem => {
    page = elem;
}).catch(err => console.log(err))
//---------------------------------

//-----------------Get Requests--------------------------------
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

app.get('/songname', (req, res) => {
    //send song back to react   
    res.json(song);
});

app.get('/songData', (req, res) => {
    res.json(songData);
});
//------------------------------------------------------------

//----------------Post Requests-------------------------------
app.post('/', (req, res) => {
    //Upon new song request, reset struct
    song[0].name = "null";
    var lyrics = (req.body).name;
    //Request song data given lyrics
    getSong(page, lyrics).then(songName => {
        console.log(songName);
        song[0].name = songName[0];
        song[0].artist = songName[1];

        songData.path = null;
        songData.lyrics = null;
        songData.coverArt = null;

        //Request cover art and lyric data
        requestSongData.requestSongData(songName[0], songName[1]).then(resp => {
            songData = resp;
            console.log(resp);
        }).catch(err => console.log(err))

        res.send("Request Recieved and Processed");
        page = reloadGoogle(page).then(elem => page = elem);
    }).catch(err => console.log(err));
});
//-----------------------------------------------------------

async function getSong(page, lyrics){
    var songName = await api.Main(page, lyrics);
    return songName;
}

async function startScrape() {
    const url = 'https://google.ca/';
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url); //At google
    return page;
}

async function reloadGoogle(page) {
    const url = 'https://google.ca/';
    await page.goto(url); //At google
    return page;
}


app.listen(port, ()=> console.log(`Server started on port ${port}`));