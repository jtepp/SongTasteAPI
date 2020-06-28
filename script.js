// var str = "a"


// document.body.innerHTML += str


async function app() {
    await fetch(`https://ecstatic-blackwell-7a1538.netlify.app/.netlify/functions/app`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'content-type': 'text/plain;charset=UTF-8'
        },
        body: 'here'
    })
        .then(res => res)

        .then(d => console.log(d))
}

app()