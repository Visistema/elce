
//npm install express --save
//npm install request
//npm install cors
//npm install body-parser --save
//npm install --save react react-debounce-input

const express = require('express');
const request = require('request');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const hostname  = 'localhost';
const port      = 3035;
const elasticUrl = 'http://52.56.125.231:9200'; // elasticsearch data service based on EC2


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', function (req, res) {
    res.send(`Server running on ${hostname}:${port}`);
});

app.post('/search', function (req, res) {

    request({
        headers: {'content-type' : 'application/json'},
        body :JSON.stringify(req.body),
        uri: elasticUrl+'/products/_search',
        method: 'POST'
    },
        function(error, response, body) {
            if (!error && response.statusCode === 200) {
                res.send(body);
            } else {
                console.log(error);
            }
        });

});

app.listen(port, function (err) {
    console.log("WEB project is started to " + port + " port")
    if (err) {
        console.log(err);
    }
});





