const creds = "NGRjZDczOTlmNDk1NGUyYzhjNjc5ZjM4ZDFiYjE0MTk6ZWNmOWExODVjYzZjNDI4NmJkMjA3NTNhMThmZTVmYzU=";
const err = new URLSearchParams(window.location.search).get('error') == null
const code = new URLSearchParams(window.location.search).get('code')
var tokenObj = {}
// if (err) window.location.href = 'https://songtaste.netlify.app/app'
// else {

run()




// }


async function run() {
    tokenObj = await token()
    console.log(tokenObj)
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