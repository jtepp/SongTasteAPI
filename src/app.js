exports.handler = function (event, context, callback) {
    console.log(event.body)
    try {

        const synaptic = require('synaptic'); // this line is not needed in the browser
        const Neuron = synaptic.Neuron,
            Layer = synaptic.Layer,
            Network = synaptic.Network,
            Trainer = synaptic.Trainer,
            Architect = synaptic.Architect;
        const a = JSON.stringify(event.body).split("\\").join('').split(',"break":"break",').join();
        const b = a.slice(1, a.length - 1)
        const data = JSON.parse(b)
        // for (let i = 0; i < data.Atrain.length; i++) {
        //     for (let j = 0; j < data.Atrain[i].length; j++) {
        //         data.Atrain[i][j] *= 100;
        //     }
        // }


        // const net = new Architect.Perceptron(9, 6, 1)
        const net = (data.transfernet == {} || data.transfernet == null) ? new Architect.Perceptron(9, 7, 6, 1) : data.transfernet
        console.log("net: " + JSON.stringify(net))
        const trainer = (data.transfertrainer == {} || data.transfertrainer == null) ? new Trainer(net) : data.transfertrainer
        console.log("trainer: " + JSON.stringify(trainer))
        trainer.train(data.Atrain)
        //propagate last result
        try {
            net.activate(data.Atrain[data.Atrain.length - 1].input)
            net.propagate(0.2, data.Atrain[data.Atrain.length - 1].output)
        } catch (e) { console.log(e) }
        const aa = net.activate(data.Crun)
        // console.log(true)
        console.log(data)
        console.log(aa)
        if (data.returnNet) {
            callback(null, {
                statusCode: 200,
                headers: {

                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers':
                        'Origin, X-Requested-With, Content-Type, Accept',
                },
                body: JSON.stringify({ "transfernet": net, "transfertrainer": trainer, "returnedGuess": aa[0] })
            })

        }
        else {
            callback(null, {
                statusCode: 200,
                headers: {

                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers':
                        'Origin, X-Requested-With, Content-Type, Accept',
                },
                body: JSON.stringify({ "returnedGuess": aa[0] })
            })
        }
    } catch (e) {
        console.log("failed" + e)
        callback(null, {
            statusCode: 206,
            headers: {

                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':
                    'Origin, X-Requested-With, Content-Type, Accept',
            },
            body: JSON.stringify({
                "error": "please make sure your input JSON follows this template",
                "template": JSON.parse(`{ "Atrain": [ { "input": "[Array]", "output": "[Array]" }, { "input": "[Array]", "output": "[Array]" }, { "input": "[Array]", "output": "[Array]" }, { "input": "[Array]", "output": "[Array]" }, { "input": "[Array]", "output": "[Array]" }, { "input": "[Array]", "output": "[Array]" }, { "input": "[Array]", "output": "[Array]" }, { "input": "[Array]", "output": "[Array]" }, { "input": "[Array]", "output": "[Array]" }, { "input": "[Array]", "output": "[Array]" } ], "break":"break", "Crun": "[Array]" }`)
            })


        })
    }

}

{/*

{"train":[{"input":[0.00321,0.451,226336,0.661,0,0.108,0.0976,180.133,0.444],"output":[1]},{"input":[0.0934,0.423,216563,0.661,0.000129,0.125,0.07,114.26,0.621,1],"output":[1]},{"input":[0.0133,0.52,166733,0.878,0,0.0433,0.0616,168.033,0.783],"output":[1]},{"input":[0.0157,0.663,212613,0.777,0.00829,0.0755,0.0375,143.003,0.94],"output":[1]},{"input":[0.00146,0.514,200040,0.73,9.54e-5,0.0897,0.0598,171.005,0.334],"output":[1]},{"input":[0.0912,0.798,219947,0.675,0,0.0894,0.0442,101.956,0.842],"output":[0]},{"input":[0.00205,0.57,178600,0.865,0,0.0404,0.0472,110.01,0.691],"output":[0]},{"input":[0.167,0.491,189187,0.867,0,0.458,0.103,167.965,0.602],"output":[1]},{"input":[0.634,0.554,218497,0.776,0.00277,0.115,0.0722,169.052,0.324],"output":[1]},{"input":[0.0774,0.649,282987,0.587,0,0.377,0.316,92.871,0.513],"output":[0]}],"break":"break","run":[0.0912,0.798,219947,0.675,0,0.0894,0.0442,101.956,0.842]}
*/}