axios = require('axios');
require('dotenv').config(); //set env
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DB;

async function getToken() {
    var token = await axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        auth: {
            username: `${process.env.spotify_usr}`,
            password: `${process.env.spotify_psw}`
        },
        params: {
            grant_type: 'client_credentials'
        },
    });
    try {
        return token.data.access_token;
    }
    catch {
        return undefined;
    }
}

// getToken().then(res => console.log(res)).catch(err => console.log(err))

async function getPlaylistID(token, playlist) {
    const pid = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/search?q=${playlist}&type=playlist`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    try {
        return pid.data.playlists.items[0].id;
    }
    catch {
        return undefined;
    }
    
}
// getPlaylistID(tk, 'Rap%20Caviar').then(res => console.log(res)).catch(err => console.log(err))

// pid = '37i9dQZF1DX0XUsuxWHRQd'

// returns list of tracks from playlist
async function getPlaylistContent(token, pid) {
    var resp = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/playlists/${pid}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    try {
        return resp.data.tracks.items//track.artists;
    }
    catch {
        return [];
    }
}

// getPlaylistContent(tk, pid).then(res => console.log(res)).catch(err => console.log(err))

async function formatTracks(tracks, token) {
    var pdata = [];
    for(var i = 0; i < tracks.length; i++){
        try{
            var id = tracks[i].track.id
            var trackData = await getTrackData(token, id);
            pdata.push(trackData);
        }     
        catch{
            continue;
        }
    }
    return await pdata;
}

async function getTrackData(token, tid) {
    var track = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/tracks/${tid}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    track = track.data;
    var artist = (track.artists).map(value => value.name);
    image = (track.album.images[0].url);
    return {'name': track.name, 'artist': artist, 'id': tid, 'image': image, 'preview': track.preview_url}
}

async function accessSpotify(pname) {
    p = encodeURIComponent(pname.trim())
    var token = await getToken();
    // var playlists = ["Rap%20Caviar", "Hot%20Hits%20Canada", "Christmas%20Hits", "Rock%20Classics"]
    var pid = await getPlaylistID(token, p);
    var tracks = await getPlaylistContent(token, pid);
    const formatted = await formatTracks(tracks, token);
    return {_id: pname, pname: formatted}
}

// Write playlist data to database
async function savePlaylist(pname) {
    const playlist = await accessSpotify(pname);
    MongoClient.connect(uri, function(err,db) {
        if (err) throw err
        var dbo = db.db('LyricFynder');
        dbo.collection("Playlists").insertOne(playlist, function(err,res){
            if (err) throw err
            console.log("Insert Successful")
        });

        db.close();
    });
}

// Delete playlist data from database
function deletePlaylistDB(playlist) {
    MongoClient.connect(uri, function(err, db){
        if (err) throw err
        var dbo = db.db('LyricFynder')
        dbo.collection('Playlists').deleteOne(playlist, function(err, res){
            console.log(`${playlist._id} deleted`);
            db.close();
        });
    })
}

savePlaylist("Rock Classics")
//  deletePlaylistDB({_id: 'Rap Caviar'})