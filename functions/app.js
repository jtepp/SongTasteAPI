exports.handler = function (event, context, callback) {
    var brain;
    var fetch
    var output = "Hey there"
    try { brain = require("brain.js"); }
    catch (e) { output = 'false ' + e }




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