exports.handler = function (event, context, callback) {
    var brain = require("brain.js");
    // const net = new brain.NeuralNetwork();
    // net.train(JSON.parse(event.body).train)
    // const output = net.run(JSON.parse(event.body).run)
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