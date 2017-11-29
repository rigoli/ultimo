'use strict'

const config = require('./config'),
      app = require('./app'),
      mongoose = require('mongoose'),
      mssql = require('mssql'),
      Sequelize = require('sequelize')

app.listen(config.serverPort, () => {
  console.log(`NodeJS server iniciado en el puerto: ${config.serverPort}`)

  mssql.connect(config.mssql, () => {
    console.log('Conectado a la Base de Datos Microsft')
  })

  if (config.mongoEnable === true) {
    mongoose.connect(`mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`, () => {
      console.log(`Conectado a la Base de Datos Mongo`)
    })
  }
})
