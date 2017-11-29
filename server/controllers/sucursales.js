'use strict'

const config = require('../config')
const mssql = require('mssql')

function getSucInfo(idSuc) {
  let querySuc = `SELECT nombreSuc, encargado, dateCreate FROM sucursales WHERE idSuc = ${idSuc};`

  return new Promise((resolve, reject) => {
    new mssql.Request().query(querySuc, (err, result) => {
      resolve(result.recordsets[0][0])
    })
  })
}

function addSucursal(req, res) {
  const body = req.body
  let queryInsert = `INSERT INTO [dbo].[sucursales] ([nombreSuc], [encargado], [dateCreate], [del]) VALUES ('${body.nombreSuc}', ${body.encargado.idUsr}, GETDATE(), 0);`

  new mssql.Request().query(queryInsert, (err, result) => {
    if (err) {
      res.status(500).send({ err, message: 'Error de consulta.', query: queryInsert })
    }

    if (result.rowsAffected == true) {
      res.status(201).send({ message: 'La sucursal ha sido registrada.' })
    }
  })
}

function getSucursal(req, res) {
  const sucId = req.params.id

  let mssqlQuery = `SELECT nombreSuc, encargado, dateCreate FROM sucursales WHERE idSuc = ${sucId} AND del = 0;`

  new mssql.Request().query(mssqlQuery, (err, result) => {
    if (err) {
      res.status(500).send({ error: err.originalError.info.message, message: 'Error al devolver la sucursal.' })
      return
    }

    if (result.rowsAffected === 0) {
      res.status(404).send({ message: 'No se encontro la sucursal.' })
      return
    }

    res.status(200).send(result.recordset)
  })
}

function getSucursales(req, res) {
  let mssqlQuery = `SELECT idSuc, nombreSuc, encargado, dateCreate FROM sucursales WHERE del = 0 ORDER BY nombreSuc ASC;`

  new mssql.Request().query(mssqlQuery, (err, result) => {
    if (err) {
      res.status(500).send({ error: err.originalError.info.message, message: 'Error al devolver sucursales.' })
      return
    }

    if (result.rowsAffected === 0) {
      res.status(404).send({ message: 'No se encontraron sucursales' })
      return
    }

    res.status(200).send(result.recordsets)
  })
}

function updateSursal(req, res) {
  const sucId = req.params.id
  const update = req.body

  let mssqlQuery = `
  UPDATE sucursales SET
    nombreSuc = '${update.nombreSuc}',
    encargado = ${update.encargado}
  WHERE idSuc = ${update.idSuc} AND del = 0 ;`

  new mssql.Request().query(mssqlQuery, (err, result) => {
    if (err) {
      res.status(500).send({ error: err })
    }

    if (result.rowsAffected == true) {
      res.status(201).send('La sucursal ha sido actualizada.')
    } else {
      res.status(404).send({ message: 'No se encontro la sucursal.' })
    }
  })
}

function deleteSucursal(req, res) {
  var sucId = req.params.idSuc

  let mssqlQuery = `UPDATE sucursales SET del = 1 WHERE idSuc = ${sucId} AND del = 0;`

  new mssql.Request().query(mssqlQuery, (err, result) => {
    if (err) {
      res.status(500).send({ error: err })
    }

    if (result.rowsAffected == true) {
      res.status(201).send('La sucursal ha sido borrada.')
    } else {
      res.status(404).send({ message: 'No se encontro la sucursal.' })
    }
  })
}

module.exports = {
  getSucInfo,
  addSucursal,
  getSucursal,
  getSucursales,
  updateSursal,
  deleteSucursal
}
