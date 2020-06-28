// var str = "a"


// document.body.innerHTML += str


async function app() {
    await fetch(`https://ecstatic-blackwell-7a1538.netlify.app/.netlify/functions/app`,
        {
            method: 'get',
            Accept: 'text/plain',
            'content-type': 'text/plain;charset=UTF-8'

        })
        .then((res) => {
            if (res.status == 200) {
                console.log("Success :" + res.body);   //works just fine
            }
            else if (res.status == 400) {
                console.log(JSON.stringify(res.body.json()));  //res.body is undefined.
            }

            return res.json();
        })
}

app()