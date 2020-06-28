// brain = require('brain.js')
// const net = new brain.NeuralNetwork();
var out;

exports.handler = function (event, context, callback) {
    // if (event.body) {
    //     net.train(JSON.parse(event.body).train)
    //     out = event.body
    // }//net.run(JSON.parse(event.body).run)}
    // else { out = "send body " + event.body }




    callback(null, {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
                'Origin, X-Requested-With, Content-Type, Accept',
        },
        body: JSON.stringify({ "bod": event.body }) //JSON.stringify({ output: out })
    })

}