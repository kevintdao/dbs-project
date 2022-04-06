// db.js
const { createPool } = require('mysql')
const pool = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE
})

pool.getConnection(err => {
  if (err) {
    console.log("Error connecting to db")
  }
  console.log("Connected to db")
})

async function executeQuery(query, values) {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, values, (err, data) => {
        if (err) {
          console.log("error executing the query")
          reject(err)
        }
        resolve(data)
      })
    } catch (err) {
      reject (err)
    }
  })
}

module.exports = { executeQuery }