const config = {
  serverPort: 8181,
  mssql: {
    user: 'sa',
    password: 'servegame',
    server: 'localhost',
    database: 'gbarajasReportes'
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'something'
    // jwtSecret: process.env.JWT_SECRET || 'gb+*2017'
  }
}

module.exports = config
