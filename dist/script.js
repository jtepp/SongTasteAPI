var inp = {};
var train = []
var run = []



async function test() {
    await fetch(`https://songtaste.netlify.app/.netlify/functions/app`, {
        method: 'POST',
        'content-type': 'application/json',
        body: JSON.stringify(inp)
        // mode: 'no-cors'
    }).then(res => res.json())
        .then(d => console.log(d))
}

// test()

window.onscroll = () => {
    const banner = document.getElementById('banner')
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        banner.style.height = "70px";
    } else {
        banner.style.height = "210px";
    }
}
