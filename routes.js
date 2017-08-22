var ejs = require('ejs')
var rn = require('random-number')
var _ = require('lodash')

var options = {
    min: 1111111111,
    max: 9999999999,
    integer: true
}

module.exports = function(app, db) {
    app.get('/', function(req, res) {
        res.render(__dirname + '/index.ejs', { name: 'shubh' })
            // res.sendFile(__dirname + '/index.html')
    })

    app.get('/normalNumber', function(req, res) {
        var collection = db.collection('number')
        collection.find({}, { _id: 0 }).toArray()
            .then((numbers) => {
                while (true) {
                    var number = rn(options)
                    if (_.indexOf(numbers, { number: number }) === -1) {
                        collection.insertOne({
                            number: number
                        })
                        res.render(__dirname + '/normal.ejs', { number: number })
                        break
                    } else {
                        continue
                    }
                }
            })
    })

    app.get('/fancyNumber', function(req, res) {
        res.render(__dirname + '/fancy.ejs', { n: 1 })
    })

    app.post('/fancyNumber', function(req, res) {
        var chosenNumber = parseInt(req.body.chosenNumber)
        var collection = db.collection('number')
        collection.findOne({ number: chosenNumber })
            .then((number) => {
                if (number !== null) {
                    collection.find({}, { _id: 0 }).toArray()
                        .then((numbers) => {
                            while (true) {
                                var newnumber = rn(options)
                                if (_.indexOf(numbers, { number: newnumber }) === -1) {
                                    collection.insertOne({
                                        number: newnumber
                                    })
                                    res.render(__dirname + '/fancy.ejs', { n: 2, success: 0, number: newnumber })
                                    break
                                } else {
                                    continue
                                }
                            }
                        })
                } else {
                    collection.insertOne({
                        number: chosenNumber
                    })
                    res.render(__dirname + '/fancy.ejs', { n: 2, success: 1, number: chosenNumber })
                }
            })
    })
}