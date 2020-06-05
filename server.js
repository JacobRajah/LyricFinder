//npm run dev to start

const api = require('./Finder_API/index');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

// parse json
app.use(bodyParser.json());

const song = [
    {
        id : 1, 
        name: 'not found'
    }
];


app.get('/songfound', (req, res) => {
    //send song back to react    
    res.json(song);
});

const port = 5000;

app.listen(port, ()=> console.log(`Server started on port ${port}`));

//Setup body parser
app.post('/', (req, res) => {
    var lyrics = (req.body).name;
    getSong(lyrics).then(songName => {
        console.log(songName);
        song[0].name = songName;
        res.send(songName);
    });
});

async function getSong(lyrics){
    var songName = await api.Main(lyrics);
    return songName;
}