const creds = "NGRjZDczOTlmNDk1NGUyYzhjNjc5ZjM4ZDFiYjE0MTk6ZWNmOWExODVjYzZjNDI4NmJkMjA3NTNhMThmZTVmYzU=";
var wordLength = 3;
var currentID = '';
var key = "";
var inp = {};
var train = []
var run = []
var IDList = []
var mName = '';
var mArtist = '';
var allSongs = {
    "train": [],
    "break": "break",
    "run": []
}
var responding = false;
var homePreview = []
var mainBox = {}
const resClasses = ['header', 'footer', 'message', 'home-song-bar', 'box', 'lame-image', 'home-song-box', 'nav-top', 'message', 'home-song-info', 'song-image', 'iframe', 'flexbutton']
const banner = document.getElementById('banner')
const spacer = document.getElementById("spacer")
document.body.onresize = () => {
    // console.log(screen.width)
    resClasses.forEach(c => {
        responsive(c, 'FR-' + c)
    })
}
document.body.onload = document.body.onresize
document.body.onresize()
document.body.onresize()
document.body.onresize()
document.body.onresize()
document.body.onresize()
document.body.onresize()




if (window.location.href.includes('index.html') || window.location.pathname == '/') { //HOMEPAGE STARTUP
    retrieveSong(randomWord(wordLength), homePreview[0], '0')
    retrieveSong(randomWord(wordLength), homePreview[1], '1')
    retrieveSong(randomWord(wordLength), homePreview[2], '2')
}
else if (window.location.href.includes('app.html')) {
    asyncApp()

}

async function asyncApp() {
    await getToken()
    const initial = new URLSearchParams(window.location.search).get('s')
    if (initial == 'random') {
        await searchNew(randomWord(3))
    } else currentID = initial
    embed('box-iframe', currentID)
    await retrieveFeatures(currentID, mainBox)
    resClasses.forEach(c => {
        responsive(c, 'FR-' + c)
    })
}

async function APIcall() {
    await fetch(`https://songtaste.netlify.app/.netlify/functions/app`, {
        method: 'POST',
        'content-type': 'application/json',
        body: JSON.stringify(inp)
        // mode: 'no-cors'
    }).then(res => res.json())
        .then(d => console.log(d))
}
async function getToken() {
    await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${creds}`,
            'content-type': "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials"
    })
        .then(res => res.json())
        .then(data => { key = data['access_token'] })
    // console.log(key)
}
async function searchNew(q) {
    await getToken()
    await fetch(`https://api.spotify.com/v1/search?q=${q}&type=track&limit=1`, {//&offset=${Math.floor(Math.random() * 20)}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${key}`,
        }
    })
        .then(r => r.json())
        .then(data => {
            currentID = data.tracks.items[0].id
        })
}
async function retrieveSong(q, spot, ind) {
    await getToken()
    await fetch(`https://api.spotify.com/v1/search?q=${q}&type=track&limit=1`, {//&offset=${Math.floor(Math.random() * 20)}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${key}`,
        }
    })
        .then(r => r.json())
        .then(data => {
            spot = data.tracks.items[0]
        })
    await fetch(`https://api.spotify.com/v1/tracks/${spot.id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${key}`,
        }
    })
        .then(r => r.json())
        .then(data => {
            spot = data

            console.log(spot.album.images[0].url)
            const frame = document.getElementById('song' + ind)
            frame.setAttribute('style', 'background-image:url("' + spot.album.images[0].url + '")')
            const label = document.getElementById('info' + ind)
            label.innerHTML = `${spot.name}<br>${spot.artists[0].name}`
            if (spot.preview_url && !responding) {
                const preview = document.getElementById('audio' + ind)
                preview.setAttribute('src', spot.preview_url)
                frame.onmouseenter = () => preview.play().catch((e) => { enable(true) })
                frame.onmouseout = () => preview.pause()
                label.innerHTML += '🔊'
            }
            const box = document.getElementById('box' + ind)
            box.onclick = () => location.href = "app.html?s=" + spot.id
        })
}

async function retrieveFeatures(id, spot) {
    await getToken()
    await fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${key}`,
        }
    })
        .then(r => r.json())
        .then(data => spot = data)

}

function embed(container, id) {
    document.getElementById(container).innerHTML = `<iframe class="iframe" src="https://open.spotify.com/embed/track/${id}" class="top-frames"
frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
    console.log('done')

}



function responsive(wide, narrow) {
    const w = document.getElementsByClassName(wide)
    const n = document.getElementsByClassName(narrow)
    if (screen.width < 750) {
        responding = true;
        for (e of w) {
            e.classList.remove(wide)
            e.classList.add(narrow)
        }

    } else {
        responding = false;
        for (e of n) {
            e.classList.remove(narrow)
            e.classList.add(add)
        }
    }
}
function randomWord(len) {
    const lows = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
    var str = "";
    for (let i = 0; i < len; i++) {
        str += lows[Math.floor(Math.random() * lows.length)]
    }
    return str;
}
function enable(b) {
    const e = document.getElementById('enable')
    if (b) { e.style.top = '40%' }
    else e.style.top = '300%'
}

