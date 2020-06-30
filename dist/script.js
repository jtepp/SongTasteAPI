var inp = {};
var train = []
var run = []



async function test() {
    fetch("https://songtaste.netlify.app/songs.json", {
    })
        .then(response => response.json())
        .then(json => { inp = json; console.log(json) });

    await fetch(`https://songtaste.netlify.app/.netlify/functions/app`, {
        method: 'POST',
        'content-type': 'application/json',
        body: JSON.stringify(inp)
        // mode: 'no-cors'
    }).then(res => res.json())
        .then(d => console.log(d))
}

test()


