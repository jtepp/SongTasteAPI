exports.handler = function (event, context, callback) {
    var brain;
    try { brain = require("brain.js"); }
    catch (e) { console.log(e) }

    const output = "Hey there"


    callback(null, {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
                'Origin, X-Requested-With, Content-Type, Accept',
        },
        body: JSON.stringify({ out: output })
    })

}