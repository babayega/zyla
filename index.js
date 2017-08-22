var express = require('express')
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient

var app = express()


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs')

MongoClient.connect('mongodb://localhost/zylaNumber')
    .then(function(db) {
        console.log("DB connection established")
        require('./routes')(app, db)
    })



app.listen(5000, function() {
    console.log("Server running at port 5000")
})

//console.log(rn(options))