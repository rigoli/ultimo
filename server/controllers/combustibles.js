'use strict'

const config = require('../config')
const mssql = require('mssql')

function getCombustible(req, res) {
  const idCom = req.params.idCom
  let mssqlQuery = `SELECT * FROM combustibles WHERE idCom = ${idCom} AND del = 0;`

  new mssql.Request().query(mssqlQuery, (err, result) => {
    if (err) {
      res.status(500).send({ error: err, message: 'Error al devolver combustible.' })
      return
    }

    if (result.rowsAffected == 0) {
      res.status(404).send({ message: 'No se encontro Combustible.' })
      return
    }

    res.status(200).send(result.recordset)
  })
}

function getCombustibles(req, res) {
  let mssqlQuery = `SELECT * FROM combustibles WHERE del = 0 ORDER BY nombre ASC ;`

  new mssql.Request().query(mssqlQuery, (err, result) => {
    if (err) {
      res.status(500).send({ error: err.originalError.info.message, message: 'Error al devolver combustibles.' })
      return
    }

    res.status(200).send(result.recordsets)
  })
}

module.exports = {
  getCombustible,
  getCombustibles
}
