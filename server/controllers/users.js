'use strict'

const config = require('../config')
const mssql = require('mssql')
const jwt = require('jsonwebtoken')
const Promise = require('bluebird')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

function login (req, res) {
  const { email, password } = req.body
  const queryCheckUsr = `SELECT idUsr, email, usrPassword, usrName, lastname FROM users WHERE email = '${email}';`

  new Promise(function (resolve, reject) {
    new mssql.Request().query(queryCheckUsr, (err, result) => {

      if (result.rowsAffected == 0) {
        return res.status(401).send({
          error: 'The login information was incorrect'
        })
      }

      const User = { idUsr: result.recordsets[0][0].idUsr, email: result.recordsets[0][0].email, usrName: result.recordsets[0][0].usrName, lastname: result.recordsets[0][0].lastname }

      if (!(result.recordsets[0][0].usrPassword == password)) {
        return res.status(401).send({
          error: 'La información es incorrecta'
        })
      }

      const userJson = User

      res.status(200).send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    })
  })
}

function existEmail (email) {
  const queryCheckUsr = `SELECT email FROM users WHERE email = '${email}';`

  return new Promise(function (resolve, reject) {
    new mssql.Request().query(queryCheckUsr, (err, result) => {
      resolve(result.rowsAffected)
    })
  })
}

function getUsrInfo(idUser) {
  let queryUsr = `SELECT idSuc, usrName, lastname, email, usrPassword, dateCreate, privilege FROM users WHERE idUsr = ${config.userTest};`

  return new Promise((resolve, reject) => {
    new mssql.Request().query(queryUsr, (err, result) => {
      resolve(result.recordsets[0][0])
    })
  })
}

function addUser (req, res) {
  const body = req.body

  existEmail(body.email).then((exist) => {
    if (exist == false) {
      let queryInsert = `INSERT INTO [dbo].[users] ([idSuc], [UsrName], [lastname], [email], [usrPassword], [dateCreate], [privilege], [del]) VALUES (${body.sucursal}, '${body.nombre}', '${body.apellidos}', '${body.email}', '${body.usrPassword}', GETDATE(), ${body.privilegios}, 0);`

      new mssql.Request().query(queryInsert, (err, result) => {
        if (err) {
          res.status(500).send({ err, message: 'Error de consulta.', query: queryInsert })
        }

        if (result.rowsAffected == true) {
          res.status(201).send({ message: 'El usuario ha sido registrado' })
        }
      })
    } else {
      res.status(409).send({ message: 'Este correo ya existe, prueba uno diferente o contacte con el administrador.' })
    }
  }).catch(function (err) {
    res.status(500).send({ error: err, message: 'Error en la promesa - "existEmail".' })
  })
}

function getUser (req, res) {
  const userId = req.params.id
  let mssqlQuery = `SELECT * FROM users WHERE idUsr = ${userId} AND del = 0;`

  new mssql.Request().query(mssqlQuery, (err, result) => {
    if (err) {
      res.status(500).send({ error: err.originalError, message: 'Error al devolver el usuario' })
      return
    }

    if (result.rowsAffected === 0) {
      res.status(404).send({ message: 'No se encontro el usuario' })
      return
    }

    res.send(result.recordset)
  })
}

function getUsers (req, res) {
  let mssqlQuery = `SELECT * FROM users WHERE del = 0 ORDER BY usrName ASC;`

  new mssql.Request().query(mssqlQuery, (err, result) => {
    if (err) {
      res.status(500).send({ error: err.originalError.info.message, message: 'Error al devolver el usuario' })
      return
    }

    res.status(200).send(result.recordsets)
  })
}

function updateUser (req, res) {
  const userId = req.params.id
  const update = req.body

  // CONSULTA EN MSSQL
  let mssqlQuery = `
  UPDATE users SET
    idSuc = '${update.idSuc}',
    usrName = '${update.name}',
    lastname = '${update.lastname}',
    email = '${update.email}',
    usrPassword = '${update.password}',
    privilege = ${update.privilege}
  WHERE idUsr = ${userId} AND del = 0 ;`


  new mssql.Request().query(mssqlQuery, (err, result) => {
    if (err) {
      res.status(500).send({ error: err })
    }

    if (result.rowsAffected == true) {
      res.status(201).send('El usuario ha sido actualizado')
    } else {
      res.status(404).send({ message: 'No se encontro al usuario.' })
    }
  })
  // MSSQL TERMINA

}

function deleteUser (req, res) {
  const userId = req.params.id

  // CONSULTA EN MSSQL
  let mssqlQuery = `UPDATE users SET del = 1 WHERE idUsr = ${userId} AND del = 0;`

  new mssql.Request().query(mssqlQuery, (err, result) => {
    if (err) {
      res.status(500).send({ error: err })
    }

    if (result.rowsAffected == true) {
      res.status(201).send('El usuario ha sido borrado')
    } else {
      res.status(404).send({ message: 'No se encontro al usuario.' })
    }
  })
  // MSSQL TERMINA
}

module.exports = {
  login,
  existEmail,
  getUsrInfo,
  addUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser
}
