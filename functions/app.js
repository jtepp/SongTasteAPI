exports.handler = function (event, context, callback) {
    callback(null, {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
                'Origin, X-Requested-With, Content-Type, Accept',
        },
        body: "PLEASE WORK"//JSON.stringify({ msg: "Hello", other: 3456, bd: event.body })
    })

}