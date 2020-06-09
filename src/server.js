require('dotenv').config()

const knex = require('knex')
// const jsonServer = require('json-server')
const app = require('./app')
// const db = require('./db')
const { PORT, DB_URL } = require('./config')

// const middlewares = jsonServer.defaults()

const db = knex({
  client: 'pg',
  connection: DB_URL,
})

app.set('db', db)
// app.use(middlewares)


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})