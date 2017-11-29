const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword(user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}


function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const body = req.body

      const usuario = new Usuario ({
        idSuc: body.idSuc,
        UsrName: body.UsrName,
        lastname: body.lastname,
        email: body.email,
        usrPassword: body.usrPassword,
        dateCreate: body.dateCreate,
        privilege: body.privilege
      })

      User.prototype.comparePassword = function (password) {
        return bcrypt.compareAsync(usuario.usrPassword, usuario.usrPassword)
      }

      let queryInsert = `INSERT INTO [dbo].[users] (
        [idSuc], [UsrName], [lastname], [email], [usrPassword], [dateCreate], [privilege])
        VALUES
      (${sucursal.nombreSuc}, ${sucursal.UsrName}, ${sucursal.lastname},
        ${sucursal.email}, ${sucursal.encargado}, GETDATE(), ${sucursal.encargado});`

      res.status(201).send({ message: queryInsert })

      // new mssql.Request().query(queryInsert, (err, result) => {
      //   if (err) {
      //     res.status(500).send({ err, message: 'Error de consulta.', query: queryInsert })
      //   }

      //   if (result.rowsAffected == true) {
      //     res.status(201).send({ message: 'El usuario ha sido registrado.' })
      //   }
      // })

      res.send(user.toJSON())
    } catch (err) {
      res.status(400).send({
        error: 'this email account is already in use.'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      if (!user) {
        return res.status(401).send({
          error: 'The login information was incorrect'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(401).send({
          error: 'The login information was incorrect'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in.'
      })
    }
  }
}
