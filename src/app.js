// exports.handler = function (event, context, callback) {
//     var brain;
//     var output = "Hey there"
//     try { var brain = require("brain.js"); }
//     catch (e) { var output = 'false ' + e }




//     callback(null, {
//         statusCode: 200,
//         headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Headers':
//                 'Origin, X-Requested-With, Content-Type, Accept',
//         },
//         body: JSON.stringify({ out: output })
//     })

// }

const express = require('express')
const serverless = require('serverless-http')

const app = express()
const router = express.Router()
router.get('/', (req, res) => {
    res.json({
        'hello': 'hi'
    })
})
app.use('/.netlify/functions/app', router)
module.exports.handler = serverless(app)