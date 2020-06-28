brain = require('brain.js')
const net = new brain.NeuralNetwork();

exports.handler = function (event, context, callback) {

    if (event.body) {
        net.train(JSON.parse(event.body).train)
        const out = event.body
    }//net.run(JSON.parse(event.body).run)}
    else const out = "send body " + event.body




    callback(null, {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
                'Origin, X-Requested-With, Content-Type, Accept',
        },
        body: JSON.stringify({ output: out })
    })

}