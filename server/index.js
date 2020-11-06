const express = require('express');
require('dotenv').config()

var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var todoApi = require('./routes')

mongoose.connect(process.env.MONGOLAB_URI)
mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.')
  process.exit(1)
})

const logger = (req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`)
  next()
}

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(logger)
app.use('/api', todoApi)

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port ' + (process.env.PORT || 3000))
})

module.exports = app
