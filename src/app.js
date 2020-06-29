exports.handler = function (event, context, callback) {

    var output = "Hey there"
    console.log(event.body)
    callback(null, {

        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
                'Origin, X-Requested-With, Content-Type, Accept',
        },
        body: event.body//JSON.stringify({ msg: "Hello", other: 3456, bd: event.body })
    })

}