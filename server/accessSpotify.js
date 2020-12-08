axios = require('axios');

async function getToken() {
    var token = await axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        auth: {
            username: `b0890075013943d7b857475306c66bfe`,
            password: `1910ca6d406a4d8488fb35a5c3b38313`
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
// tk = 'BQBLsphIE0Nci4qogTxpINB19tmfuStViUJ1887LJ3A60x9GQ_7kxX5wLkBIpuvXEMdoZzUQLFToQmUxKhg'
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

async function formatTracks(tracks) {
    track = tracks[2].track
    name = track.name
    artist = (track.artists).map(value => value.name)
    id = track.id
    image = (track.album.images[0].url)
    return {'name': name, 'artist': artist, 'id': id, 'image': image}
}

async function accessSpotify() {
    var token = await getToken();
    console.log(token)
    var playlists = ["Rap%20Caviar", "Hot%20Hits%20Canada", "Christmas%20Hits", "Rock%20Classics"]
    var pid = await getPlaylistID(token, playlists[0]);
    var tracks = await getPlaylistContent(token, pid);
    return await formatTracks(tracks);
}

// accessSpotify().then(res => console.log(res)).catch(err => console.log(err))

async function getTrackData(token, tid) {
    track = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/tracks/${tid}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return await track.data.preview_url;
}

getTrackData('BQBIpAfHgcnvGGOdKCPhNop7yWEsdVnos8MfdzIAtpQu8jSYE_g4e7OuD8I32X2LVWMTkfrSImmlQqgLqGQ', '0k7wmahjkn389wAZdz19Cv').then(res => console.log(res)).catch(err => console.log(err))