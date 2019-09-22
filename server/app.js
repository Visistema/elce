const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const MiniSearch = require('minisearch');
let data = require('./data');
const app = express();
const hostname  = 'localhost';
const port      = 3035;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


let miniSearch  = new MiniSearch({
    fields: ['id','name', 'about','price','tags'], // fields to index for full-text search
    storeFields: ['name','picture'], // fields to return with search results
    extractField: (document, fieldName) => {
        // Access nested fields
        const value = fieldName.split('.').reduce((doc, key) => doc && doc[key], document)
        // If field value is an array, join by space
        return Array.isArray(value) ? value.join(' ') : value
    }
})

data = JSON.parse(JSON.stringify(data).split('"_id":').join('"id":'));
miniSearch .addAll(data);


app.get('/', function (req, res) {
    res.send(`Server running on ${hostname}:${port}`);
});

app.post('/search', function (req, res) {
    let result = miniSearch .search(req.body.query, { prefix: true });
    res.send( result);

});

app.listen(port, function (err) {
    console.log("WEB project is started to " + port + " port")
    if (err) {
        console.log(err);
    }
});





