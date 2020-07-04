const creds = "NGRjZDczOTlmNDk1NGUyYzhjNjc5ZjM4ZDFiYjE0MTk6ZWNmOWExODVjYzZjNDI4NmJkMjA3NTNhMThmZTVmYzU=";
var failed = false;
var searchClickCount = 0;
var wordLength = 3;
var currentID = '';
var needMore = 4;
var needPlaylist = 11;
var key = "";
var inp = {};
const threshold = 0.55
var message = '';
var likelist = []
var hatelist = []
var train = []
var run = []
var reactready = true
var mName = '';
var mArtist = '';
var returnedGuess = ''
const v = document.getElementById('dataview');
const playlist = document.getElementById('playlist-view')
const searchID = document.getElementById('searchID');
const automate = document.getElementById('automate');
var allSongs = {
    "IDList": [],
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
const resClasses = ['header', 'footer', 'home-song-bar', 'formstuff', 'button', 'box', 'guess-box', 'lame-image', 'home-song-box', 'nav-top', 'message', 'home-song-info', 'song-image', 'iframe', 'flexbutton']
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
    document.getElementById('options').onmouseout()
    document.getElementById('guessTEXT').innerHTML = (needMore + 1) + " more..."
    automate.innerHTML = (needPlaylist + 1) + " more..."

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
    automate.addEventListener('click', () => {
        playlist.style.height = '100vh'
        playlist.scrollIntoView(true)
    })
    document.getElementById('input-file')
        .addEventListener('change', getFile)
    document.getElementById('input-file')
        .addEventListener('change', () => {
            enable(true);
            v.innerHTML = ` <center>
            <div id="currentheader">Your info</div>
        </center>
        <div id="currentflex">
            <div id="badlist" class="dataviewlist">

                <h1>Disliked
                </h1>




            </div>
            <div id="goodlist" class="dataviewlist">
                <h1>Liked
                </h1>
            </div>

        </div>`;

        })
    document.addEventListener('click', (event) => {
        if (v.getAttribute('style') == 'top: 50px' && !event.path.includes(v) && !event.path.includes(document.getElementById('viewdatabutton'))) {
            v.setAttribute('style', 'top: 3000px')
        }
    })
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
    await fetch(`https://api.spotify.com/v1/search?q=${q}&type=track&limit=1&offset=${Math.floor(Math.random() * 5)}`, {
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
                if (allSongs.IDList.includes(currentID)) { wordLength++; console.log('duplicate ID'); q = randomWord(wordLength) }
            }).catch(() => {
                failed = true;
                q = randomWord(wordLength);
            }
            )
    } while (allSongs.IDList.includes(currentID) || failed)
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
                if (allSongs.IDList.includes(currentID)) { wordLength++; console.log('duplicate ID'); q = randomWord(wordLength) } else {

                    embed('box-iframe', currentID)
                    retrieveFeatures(currentID)
                    if (needMore < 1) {
                        APIcall()
                        let curArray;
                        const liker = returnedGuess > threshold
                        if (liker) curArray = responses.true; else curArray = responses.false
                        if (liker) document.getElementById('guessID').style.backgroundColor = "RGB(0,230,0)"
                        else document.getElementById('guessID').style.backgroundColor = "RGB(230,0,0)"
                        // console.log(liker)
                        do { message = curArray[Math.floor(Math.random() * curArray.length)] } while (message == document.getElementById('guessID').innerHTML)
                        console.log(message)
                        document.getElementById('guessTEXT').innerHTML = message
                    }
                }
            })
    } while (allSongs.IDList.includes(currentID))
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

async function reactingList(id, like) {
    await getToken()
    await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${key}`,
        }
    })
        .then(r => r.json())
        .then(data => {
            if (like == 1) {
                const nfo = {
                    "name": data.name,
                    "artist": data.artists[0].name,
                    "id": id,
                    "img": data.album.images[0].url
                }
                likelist.push(nfo)
                document.getElementById('goodlist').appendChild(returnHTMLfordataview(nfo))
            } else if (like == 0) {
                const nfo = {
                    "name": data.name,
                    "artist": data.artists[0].name,
                    "id": id,
                    "img": data.album.images[0].url
                }
                hatelist.push(nfo)
                document.getElementById('badlist').appendChild(returnHTMLfordataview(nfo))
            }
        })

}


async function songReact(like) {
    if (reactready) {
        reactready = false
        allSongs.IDList.push(currentID)
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
        await reactingList(currentID, like)
        await searchLater(randomWord(wordLength))
        await retrieveFeatures(currentID)
        automate.innerHTML = "Automate a playlist"
        if (needPlaylist >= 1) {
            needPlaylist--;
            automate.innerHTML = (needPlaylist + 1) + " more..."
        }
        if (needMore >= 1) {
            needMore--;
            document.getElementById('guessTEXT').innerHTML = (needMore + 1) + " more..."
        } else {
            allSongs.Crun = [
                mainBox.acousticness,
                mainBox.danceability,
                mainBox.duration_ms,
                mainBox.energy,
                mainBox.instrumentalness,
                mainBox.liveness,
                mainBox.speechiness,
                mainBox.tempo,
                mainBox.valence
            ]
            await APIcall()
            let curArray;
            const liker = returnedGuess > threshold
            if (liker) curArray = responses.true; else curArray = responses.false
            if (liker) document.getElementById('guessID').style.backgroundColor = "RGB(0,230,0)"
            else document.getElementById('guessID').style.backgroundColor = "RGB(230,0,0)"
            // console.log(liker)
            do { message = curArray[Math.floor(Math.random() * curArray.length)] } while (message == document.getElementById('guessTEXT').innerHTML)
            console.log(message)
            document.getElementById('guessTEXT').innerHTML = message
        }
        embed('box-iframe', currentID)
        reactready = true
        // console.log(allSongs)
    }
}


function getFile(event) {
    const input = event.target
    if ('files' in input && input.files.length > 0) {
        placeFileContent(
            null,
            input.files[0])
    }
}

async function placeFileContent(target, file) {
    readFileContent(file).then(content => {
        allSongs = JSON.parse(content);
        needMore = 4 - allSongs.IDList.length
        needPlaylist = 4 - allSongs.IDList.length
        automate.innerHTML = "Automate a playlist"
        if (needPlaylist >= 1) {
            needPlaylist--;
            automate.innerHTML = (needPlaylist + 1) + " more..."
        }
        if (needMore >= 1) {
            needMore--;
            document.getElementById('guessTEXT').innerHTML = (needMore + 1) + " more..."
        } else {
            allSongs.Crun = [
                mainBox.acousticness,
                mainBox.danceability,
                mainBox.duration_ms,
                mainBox.energy,
                mainBox.instrumentalness,
                mainBox.liveness,
                mainBox.speechiness,
                mainBox.tempo,
                mainBox.valence
            ]
            APIcall()
            let curArray;
            const liker = returnedGuess > threshold
            if (liker) curArray = responses.true; else curArray = responses.false
            if (liker) document.getElementById('guessID').style.backgroundColor = "RGB(0,230,0)"
            else document.getElementById('guessID').style.backgroundColor = "RGB(230,0,0)"
            // console.log(liker)
            do { message = curArray[Math.floor(Math.random() * curArray.length)] } while (message == document.getElementById('guessTEXT').innerHTML)
            console.log(message)
            document.getElementById('guessTEXT').innerHTML = message
        }
        for (let i = 0; i < allSongs.IDList.length; i++) {
            reactingList(allSongs.IDList[i], allSongs.Atrain[i].output == 1 ? true : false)
        }
        console.log(allSongs)
    }).catch(error => console.log(error))
}

async function readFileContent(file) {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result)
        reader.onerror = error => reject(error)
        reader.readAsText(file)
    })
}
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function returnHTMLfordataview(obj) {
    const di = document.createElement('div')
    di.setAttribute('class', 'dataitem')
    di.setAttribute('data-id', obj.id)
    di.onclick = () => window.open(`https://open.spotify.com/track/${obj.id}`, '_blank').focus()

    const dp = document.createElement('div')
    dp.setAttribute('class', 'datapicture')
    dp.setAttribute('style', 'background-image:url(' + obj.img + ')')

    const dt = document.createElement('div')
    dt.setAttribute('class', 'datatext')

    const t = document.createElement('div')
    t.setAttribute('class', 'top')
    t.innerHTML = obj.name

    const b = document.createElement('div')
    b.setAttribute('class', 'bottom')
    b.innerHTML = obj.artist


    dt.appendChild(t)
    dt.appendChild(b)

    di.appendChild(dp)
    di.appendChild(dt)

    return di

}

function toggleDataview() {
    switch (v.getAttribute('style')) {
        case 'top: 3000px': v.setAttribute('style', 'top: 50px'); break;
        default:
        case 'top: 50px': v.setAttribute('style', 'top: 3000px');
    }


}
