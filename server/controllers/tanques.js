'use strict'

const config = require('../config')
const mssql = require('mssql')

function regTanque (req, res) {
  const body = req.body

  let queryInsert = `
  INSERT INTO tanques (idSuc, idCom)
    VALUES
  ('${body.idSuc}', ${body.idCom});`

  new mssql.Request().query(queryInsert, (err, result) => {
    if (err) {
      res.status(500).send({ err, message: 'Error de consulta.', query: queryInsert })
    }

    if (result.rowsAffected == true) {
      res.status(201).send({ message: 'El tanque ha sido registrado.' })
    }
  })
}

function getTanque(req, res) {
  const idTan = req.params.idTan

  let mssqlQuery = `SELECT idSuc, idCom, ltros, ultimaRecarga FROM tanques WHERE idTan = ${idTan} AND del = 0;`

  new mssql.Request().query(mssqlQuery, (err, result) => {
    if (err) {
      res.status(500).send({ error: err, message: 'Error al devolver tanque.' })
      return
    }

    if (result.rowsAffected == 0) {
      res.status(404).send({ message: 'No se encontro tanque.' })
      return
    }

    res.status(200).send(result.recordset)
  })
}

function getTanques(req, res) {
  let mssqlQuery = `SELECT * FROM tanques WHERE del = 0 ORDER BY idSuc ASC ;`

  new mssql.Request().query(mssqlQuery, (err, result) => {
    if (err) {
      res.status(500).send({ error: err.originalError.info.message, message: 'Error al devolver tanques.' })
      return
    }

    res.status(200).send(result.recordsets)
  })
}

function updateTanque (req, res) {
  const idTanq = req.params.idTanq
  const update = req.body

  // CONSULTA EN MSSQL
  let mssqlQuery = `
  UPDATE tanques SET
    idSuc = '${update.idSuc}',
    idCom = ${update.idCom}
  WHERE idTan = ${idTanq} AND del = 0 ;`

  new mssql.Request().query(mssqlQuery, (err, result) => {
    if (err) {
      res.status(500).send({ error: err })
    }

    if (result.rowsAffected == true) {
      res.status(201).send('El tanque ha sido actualizada.')
    } else {
      res.status(404).send({ message: 'No se encontro tanque.' })
    }
  })
  // MSSQL TERMINA
}

function deleteTanque (req, res) {
  var idTanq = req.params.idTanq

  // CONSULTA EN MSSQL
  let mssqlQuery = `UPDATE tanques SET del = 1 WHERE idTan = ${idTanq} AND del = 0;`

  new mssql.Request().query(mssqlQuery, (err, result) => {
    if (err) {
      res.status(500).send({ error: err })
    }

    if (result.rowsAffected == true) {
      res.status(201).send('El tanque ha sido borrado.')
    } else {
      res.status(404).send({ message: 'No se encontro tanque.' })
    }
  })
  // MSSQL TERMINA
}

module.exports = {
  regTanque,
  getTanque,
  getTanques,
  updateTanque,
  deleteTanque
}
