var str = "a"

fetch(`https://ecstatic-blackwell-7a1538.netlify.app/.netlify/functions/app`)
    .then(res => { console.log(res); res.json() })
    .then(data => { console.log(data); str = data; })


document.body.innerHTML += str