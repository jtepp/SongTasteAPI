const creds = "NGRjZDczOTlmNDk1NGUyYzhjNjc5ZjM4ZDFiYjE0MTk6ZWNmOWExODVjYzZjNDI4NmJkMjA3NTNhMThmZTVmYzU=";
const err = new URLSearchParams(window.location.search).get('error') == null
const code = new URLSearchParams(window.location.search).get('code')
const playlistJSON = {
    "name": 'SongTaste Favorites',
    "public": true,
    "collaborative": false,
    "description": "A professionally curated playlist from SongTaste.cf, and its neural network."

}
var tokenObj = {}
var userObj = {}
// if (err) window.location.href = 'https://songtaste.netlify.app/app'
// else {

run()




// }


async function run() {
    tokenObj = await token()
    console.log(tokenObj)
    userObj = await user()
    console.log(userObj)
    await createPlaylist(playlistJSON)

}



async function token() {
    return await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${creds}`
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=https://songtaste.netlify.app/app:playlist`
    }).then(res => res.json())

}

async function user() {
    return await fetch(`https://api.spotify.com/v1/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokenObj.access_token}`
        }
    }).then(res => res.json())
}

async function createPlaylist(bodyJSON) {
    await fetch(`https://api.spotify.com/v1/users/${userObj.id}/playlists`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/JSON',
            'Authorization': `Bearer ${tokenObj.access_token}`
        },
        body: JSON.stringify(bodyJSON)
    }).then(res => res.json()).then(data => console.log(data))
}