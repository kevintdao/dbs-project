import { executeQuery } from '../config/db'

const getData = async (req, res) => {
  let data = await executeQuery("select * from genre", [])
  res.send(data)
}

const insertUser = async (req, res) => {
  const body = JSON.parse(req.body)
  executeQuery("INSERT INTO USER(name, age) VALUES(?,?)", [body.name, body.age])
  .then(data => {
    console.log(data)
    res.status(200).json(data)
  })
  .catch(err => {
    console.log(err)
    res.status(400).json({ error: err })
  })
}

export { getData, insertUser }