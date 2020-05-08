let express = require('express')
// testing for backend authentication
let request = require('request')
let querystring = require('querystring')
// end of test



//app config

let app = express()

//start serve
let server = app.listen(process.env.PORT || 3000, function () {
    console.log('Express server running on port', server.address().port)

})

//testing for backend authentication
// let redirect_uri =
//     process.env.REDIRECT_URI ||
//     'http://localhost:8080/callback'
//
// app.get('/login', function(req, res) {
//     res.redirect('https://accounts.spotify.com/authorize?' +
//         querystring.stringify({
//             response_type: 'code',
//             client_id: '488f284b803448b9a8284b0d43b5a3a0',
//             scope: 'user-read-private user-read-email',
//             redirect_uri
//         }))
// })
//
// app.get('/callback', function(req, res) {
//     let code = req.query.code || null
//     let authOptions = {
//         url: 'https://accounts.spotify.com/api/token',
//         form: {
//             code: code,
//             redirect_uri,
//             grant_type: 'authorization_code'
//         },
//         headers: {
//             'Authorization': 'Basic ' + (new Buffer(
//                 '488f284b803448b9a8284b0d43b5a3a0D' + ':' + '9472a4344f1947ef8ad22ae726857c27'
//             ).toString('base64'))
//         },
//         json: true
//     }
//     request.post(authOptions, function(error, response, body) {
//         let access_token = body.access_token
//         let uri = process.env.FRONTEND_URI || 'http://localhost:8080'
//         res.redirect(uri + '?access_token=' + access_token)
//     })
// })
