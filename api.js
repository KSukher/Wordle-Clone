const PORT = 8080
const axios = require("axios").default
const express = require("express")
const cors = require("cors")
require('dotenv').config()
const app = express()

var words = require('an-array-of-english-words')

filterWords_4  = words.filter(d => d.length === 4)
filterWords_5 = words.filter(d => d.length === 5)

app.use(cors())

app.get('/wordleFour', function (req, res) {
        res.json(filterWords_4[Math.floor(Math.random() * filterWords_4.length)])
})

app.get('/wordleFive', function (req, res) {
    res.json(filterWords_5[Math.floor(Math.random() * filterWords_5.length)])
})

app.get('/fourArray', function (req, res) {
    res.json(filterWords_4)
})

app.get('/fiveArray', function (req, res) {
    res.json(filterWords_5)
})

app.listen(PORT, function () {
    console.log("Server is running on localhost:" + PORT);
})