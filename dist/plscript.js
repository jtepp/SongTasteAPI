const creds = "NGRjZDczOTlmNDk1NGUyYzhjNjc5ZjM4ZDFiYjE0MTk6ZWNmOWExODVjYzZjNDI4NmJkMjA3NTNhMThmZTVmYzU=";
const err = new URLSearchParams(window.location.search).get('error') == null
const code = new URLSearchParams(window.location.search).get('code')
if (err) window.location.href = 'https://songtaste.netlify.app/app'
else {

    token()




}

async function token() {
    fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            'Authorization': `Basic ${creds}`
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=https://songtaste.netlify.app/app:playlist`
    })

}