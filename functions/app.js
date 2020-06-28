// brain = require('brain.js')
// const net = new brain.NeuralNetwork();

exports.handler = function (event, context, callback) {
    // net.train(JSON.parse(event.body).train)
    // const out = net.run(JSON.parse(event.body).run)
    const out = event.body



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