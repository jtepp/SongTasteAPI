const creds = "NGRjZDczOTlmNDk1NGUyYzhjNjc5ZjM4ZDFiYjE0MTk6ZWNmOWExODVjYzZjNDI4NmJkMjA3NTNhMThmZTVmYzU=";
var failed = false;
var searchClickCount = 0;
var wordLength = 3;
var currentID = '';
var needMore = 3;
var key = "";
var inp = {};
const threshold = 0.55
var message = '';
var train = []
var run = []
var IDList = []
var mName = '';
var mArtist = '';
var returnedGuess = ''
const searchID = document.getElementById('searchID');
var allSongs = {
    "Atrain": [],
    "break": "break",
    "Crun": []
}
const responses = {
    true: [
        "You might like this one...",
        "Give this one a listen!",
        "I would recommend this one"
    ],
    false: [
        "Not so sure about this one...",
        "I'd skip this one if I were you",
        "You might not like this one"
    ]

}
var responding = false;
var homePreview = []
var mainBox = {}
const resClasses = ['header', 'footer', 'home-song-bar', 'box', 'guess-box', 'lame-image', 'home-song-box', 'nav-top', 'message', 'home-song-info', 'song-image', 'iframe', 'flexbutton']
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

document.getElementById('guessID').innerHTML = (needMore + 1) + " more..."


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
        body: JSON.stringify(allSongs)
        // mode: 'no-cors'
    }).then(res => res.json())
        .then(d => returnedGuess = d)
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

async function searchLater(q) {
    do {
        failed = false;
        await getToken()
        await fetch(`https://api.spotify.com/v1/search?q=${q}&type=track&limit=1&offset=${Math.floor(Math.random() * 30)}`, {
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
                if (IDList.includes(currentID)) { wordLength++; console.log('duplicate ID'); q = randomWord(wordLength) }
            }).catch(() => {
                failed = true;
                q = randomWord(wordLength);
            }
            )
    } while (IDList.includes(currentID) || failed)
}
async function searchSpecific(q) {
    do {
        await getToken()
        await fetch(`https://api.spotify.com/v1/search?q=${q}&type=track&limit=1`, {
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
                embed('box-iframe', currentID)
                retrieveFeatures(currentID)
                if (IDList.includes(currentID)) { wordLength++; console.log('duplicate ID'); q = randomWord(wordLength) }
            })
    } while (IDList.includes(currentID))
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

async function retrieveFeatures(id) {
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
        .then(data => {
            console.log(data)
            mainBox = data;
            allSongs.Crun = [
                data.acousticness,
                data.danceability,
                data.duration_ms,
                data.energy,
                data.instrumentalness,
                data.liveness,
                data.speechiness,
                data.tempo,
                data.valence
            ]

        })

}

function embed(container, id) {
    document.getElementById(container).innerHTML = `<iframe class="iframe" src="https://open.spotify.com/embed/track/${id}" class="${responding ? 'FR-' : ''}iframe"
frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
    document.body.onresize()

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
// acousticness: 0.00321,
//     danceability: 0.451,
//         duration_ms: 226336,
//             energy: 0.661,
//                 instrumentalness: 0,
//                     liveness: 0.108,
//                         speechiness: 0.0976,
//                             tempo: 180.133,
//                                 valence: 0.444

async function songReact(like) {
    IDList.push(currentID)
    allSongs.Atrain.push({
        "input": [
            mainBox.acousticness,
            mainBox.danceability,
            mainBox.duration_ms,
            mainBox.energy,
            mainBox.instrumentalness,
            mainBox.liveness,
            mainBox.speechiness,
            mainBox.tempo,
            mainBox.valence
        ],
        "output": [
            like
        ]
    })
    await searchLater(randomWord(wordLength))
    embed('box-iframe', currentID)
    await retrieveFeatures(currentID)
    if (needMore >= 1) {
        needMore--;
        document.getElementById('guessID').innerHTML = (needMore + 1) + " more..."
    } else {
        await APIcall()
        let curArray;
        const liker = returnedGuess > threshold
        if (liker) curArray = responses.true; else curArray = responses.false
        if (liker) document.getElementById('guessID').style.backgroundColor = "RGB(0,230,0)"
        else document.getElementById('guessID').style.backgroundColor = "RGB(230,0,0)"
        console.log(liker)
        do { message = curArray[Math.floor(Math.random() * curArray.length)] } while (message == document.getElementById('guessID').innerHTML)
        console.log(message)
        document.getElementById('guessID').innerHTML = message
    }
    // console.log(allSongs)
}

searchID.addEventListener('click', () => {
    if (searchClickCount == 0) { searchClickCount++; searchID.innerHTML = '' }
})

searchID.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        e.preventDefault()
        searchSpecific(searchID.innerHTML)
        searchID.innerHTML = ''
    }
})