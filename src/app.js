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

const brain = require('brain.js')


const app = express()
const router = express.Router()
router.all('/', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.send(
        { 'one': 'two' }
    )
})
app.use('/.netlify/functions/app', router)
module.exports.handler = [serverless(app), serverless(brain)]