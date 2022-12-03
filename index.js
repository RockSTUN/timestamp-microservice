// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
//A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)
app.get('/api/:date?', (req,res) => {
    console.log('ESSE AQUI: ',new Date(parseInt(req.params.date)));
        if ((new Date(req.params.date) == 'Invalid Date' && new Date(parseInt(req.params.date)) == 'Invalid Date') && req.params.date != undefined){
            res.json({error: 'Invalid Date'})
        }
        else{
            !req.params.date ? res.json({unix: Date.now(), utc: new Date().toGMTString()}) : 
            (req.params.date.length == 13) ? res.json({unix: new Date(parseInt(req.params.date)).getTime(), utc: new Date(parseInt(req.params.date)).toGMTString()}):
            res.json({unix: new Date(req.params.date).getTime(), utc: new Date(req.params.date).toGMTString()});
        }
        
    
//     if (req.params.date.length == 13){
//     var timeUTC = new Date(parseInt(req.params.date));
//     var UNIX = req.params.date.length
//     }
//     else {
//         var timeUTC = new Date(req.params.date).toGMTString();
//         var UNIX = new Date(req.params.date).getTime()
//         console.log(UNIX)
//     }
//     res.json({unix: UNIX, utc: timeUTC})
//     
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
