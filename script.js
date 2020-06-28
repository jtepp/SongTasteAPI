// var str = "a"

fetch(`https://ecstatic-blackwell-7a1538.netlify.app/.netlify/functions/app`, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
        'content-type': 'text/plain'
    },
    // body: "bye"
})
    .then(res => { console.log(res); res.json() })
    .then(data => { console.log(data); str = data; })


// document.body.innerHTML += str