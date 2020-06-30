var inp = {};
var train = []
var run = []
const resClasses = ['header', 'footer', 'message', 'home-song-bar', 'home-song-box', 'nav-top', 'message', 'home-song-info']
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
function responsive(wide, narrow) {
    const w = document.getElementsByClassName(wide)
    const n = document.getElementsByClassName(narrow)
    if (screen.width < 750) {
        for (e of w) {
            e.classList.remove(wide)
            e.classList.add(narrow)
        }

    } else {
        for (e of n) {
            e.classList.remove(narrow)
            e.classList.add(add)
        }
    }
}


{// banner.style.height = "210px";
    // spacer.style.height = "210px";
    // window.onscroll = () => {

    //     if (document.documentElement.scrollTop > 50) {
    //         banner.style.height = "70px";
    //         spacer.style.height = "120px";
    //     } else {
    //         banner.style.height = "210px";
    //         spacer.style.height = "260px";
    //     }
    // }
    // window.scrollTo(0, 0)}

    async function test() {
        await fetch(`https://songtaste.netlify.app/.netlify/functions/app`, {
            method: 'POST',
            'content-type': 'application/json',
            body: JSON.stringify(inp)
            // mode: 'no-cors'
        }).then(res => res.json())
            .then(d => console.log(d))
    }
}
// test()