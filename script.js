// var str = "a"


// document.body.innerHTML += str


async function app() {
    await fetch(`https://ecstatic-blackwell-7a1538.netlify.app/.netlify/functions/app`, {
        method: 'POST',
        mode: 'no-cors',
    })
        .then(res => res.json())

        .then(d => console.log(d))
}