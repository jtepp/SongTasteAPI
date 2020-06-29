exports.handler = function (event, context, callback) {
    var data = {}
    const s = event.body;
    console.log(s)
    // for (let i = 1; i < s.length - 1; i++) {
    //     const e = s[i].split('\\')
    //     // console.log(e)
    //     // data[e[2].replace('"', '')] = Number(e[3].replace('": ', '').replace(',', ''))
    // }
    // console.log(data)
    callback(null, {
        statusCode: 200,
        headers: {

            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
                'Origin, X-Requested-With, Content-Type, Accept',
        },
        body: s//JSON.stringify({ msg: "Hello", other: 3456, bd: event.body })
    })

}