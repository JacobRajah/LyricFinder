//npm run dev to start

const api = require('./Finder_API/index');

const express = require('express');

const bodyParser = require('body-parser');

//---------Server Work-------------
var path = require('path');
//---------------------------------

//---------Scrape setup------------
const puppeteer = require('puppeteer');

var page;
//---------------------------------

const app = express();

// parse json
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

const song = [
    {
        id : 1, 
        name: "null",
        artist: "null"
    }
];

//---------Scrape setup------------
startScrape().then(elem => {
    page = elem;
}).catch(err => console.log(err))
//---------------------------------

//-------------SERVER WORK--------------------------------
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
//------------------------------------------------------------

app.get('/songname', (req, res) => {
    //send song back to react   
    res.json(song);
});

//Setup body parser
app.post('/', (req, res) => {
    //Upon new song request, reset struct
    song[0].name = "null";
    var lyrics = (req.body).name;
    getSong(page, lyrics).then(songName => {
        console.log(songName);
        song[0].name = songName[0];
        song[0].artist = songName[1];
        res.send("Request Recieved and Processed");
        page = reloadGoogle(page).then(elem => page = elem);
    }).catch(err => console.log(err));
});

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