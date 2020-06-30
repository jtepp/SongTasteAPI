var inp = {};
var train = []
var run = []
const banner = document.getElementById('banner')
const spacer = document.getElementById("spacer")

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