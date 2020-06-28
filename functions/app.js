exports.handler = function (event, context, callback) {
    try { brain = require("brain.js") }
    catch (error) { console.log(error) }





    callback(null, {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
                'Origin, X-Requested-With, Content-Type, Accept',
        },
        body: JSON.stringify({ msg: "Hello", other: 3456, bd: event.body })
    })

}