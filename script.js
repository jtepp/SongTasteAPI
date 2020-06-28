var inp = {
    train:
        [
            //Break My Face: 
            {
                input: {
                    acousticness: 0.00321,
                    danceability: 0.451,
                    duration_ms: 226336,
                    energy: 0.661,
                    instrumentalness: 0,
                    liveness: 0.108,
                    speechiness: 0.0976,
                    tempo: 180.133,
                    valence: 0.444
                }, output: { like: true }
            },
            // M.O.N.E.Y.:
            {
                input: {
                    acousticness: 0.0934,
                    danceability: 0.423,
                    duration_ms: 216563,
                    energy: 0.661,
                    instrumentalness: 0.000129,
                    liveness: 0.125,
                    speechiness: 0.07,
                    tempo: 114.26,
                    valence: 0.621,
                    like: true
                }, output: { like: true }
            },
            // Old Fashioned: 
            {
                input: {
                    acousticness: 0.0133,
                    danceability: 0.52,
                    duration_ms: 166733,
                    energy: 0.878,
                    instrumentalness: 0,
                    liveness: 0.0433,
                    speechiness: 0.0616,
                    tempo: 168.033,
                    valence: 0.783
                }, output: { like: false }
            },
            // Bad Blood: 
            {
                input: {
                    acousticness: 0.0157,
                    danceability: 0.663,
                    duration_ms: 212613,
                    energy: 0.777,
                    instrumentalness: 0.00829,
                    liveness: 0.0755,
                    speechiness: 0.0375,
                    tempo: 143.003,
                    valence: 0.94
                }, output: { like: true }
            },
            // Blinding Lights: 
            {
                input: {
                    acousticness: 0.00146,
                    danceability: 0.514,
                    duration_ms: 200040,
                    energy: 0.73,
                    instrumentalness: 0.0000954,
                    liveness: 0.0897,
                    speechiness: 0.0598,
                    tempo: 171.005,
                    valence: 0.334
                }, output: { like: true }
            },
            // I Don't Care: 
            {
                input: {
                    acousticness: 0.0912,
                    danceability: 0.798,
                    duration_ms: 219947,
                    energy: 0.675,
                    instrumentalness: 0,
                    liveness: 0.0894,
                    speechiness: 0.0442,
                    tempo: 101.956,
                    valence: 0.842
                }, output: { like: false }
            },
            //Victorious: 
            {
                input: {
                    acousticness: 0.00205,
                    danceability: 0.57,
                    duration_ms: 178600,
                    energy: 0.865,
                    instrumentalness: 0,
                    liveness: 0.0404,
                    speechiness: 0.0472,
                    tempo: 110.01,
                    valence: 0.691
                }, output: { like: false }
            },
            // Say Amen (Saturday Night): 
            {
                input: {
                    acousticness: 0.167,
                    danceability: 0.491,
                    duration_ms: 189187,
                    energy: 0.867,
                    instrumentalness: 0,
                    liveness: 0.458,
                    speechiness: 0.103,
                    tempo: 167.965,
                    valence: 0.602
                }, output: { like: true }
            },
            //nothing revealed
            {
                input: {
                    acousticness: 0.634,
                    danceability: 0.554,
                    duration_ms: 218497,
                    energy: 0.776,
                    instrumentalness: 0.00277,
                    liveness: 0.115,
                    speechiness: 0.0722,
                    tempo: 169.052,
                    valence: 0.324,
                }, output: { like: true }
            },
            {
                //6 Summers
                input: {
                    acousticness: 0.0774,
                    danceability: 0.649,
                    duration_ms: 282987,
                    energy: 0.587,
                    instrumentalness: 0,
                    liveness: 0.377,
                    speechiness: 0.316,
                    tempo: 92.871,
                    valence: 0.513

                },
                output: { like: false }

            }
        ], run: {
            acousticness: 0.0912,
            danceability: 0.798,
            duration_ms: 219947,
            energy: 0.675,
            instrumentalness: 0,
            liveness: 0.0894,
            speechiness: 0.0442,
            tempo: 101.956,
            valence: 0.842
        }
}
var str = ""
var obj;




async function app() {
    await fetch(`https://songtaste.netlify.app/.netlify/functions/app`,
        {
            method: 'POST',
            mode: 'no-cors',
            Accept: 'text/plain',
            'content-type': 'text/plain;charset=UTF-8',
            body: "hi"

        })
        .then(function (response) {
            return response.text();
        }).then(function (data) {
            console.log(data)

            // obj = JSON.parse(data);
            // str = obj.output
            // console.log(JSON.parse(str))
        });
    document.body.innerHTML += str
}

app()
