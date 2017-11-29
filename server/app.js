'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const usersRoute = require('./routes/users')
const sucsRoute = require('./routes/sucursales')
const tanquesRoute = require('./routes/tanques')
const combustiblesRoute = require('./routes/combustibles')
const compraCombustiblesRoute = require('./routes/compraCombustibles')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use('/api', usersRoute)
app.use('/api', sucsRoute)
app.use('/api', tanquesRoute)
app.use('/api', combustiblesRoute)
app.use('/api', compraCombustiblesRoute)

module.exports = app
