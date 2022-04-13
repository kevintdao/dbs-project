import { executeQuery } from '../config/db'

const getData = async (req, res) => {
  let data = await executeQuery("select * from genre", [])
  res.send(data)
}

const insertUser = async (req, res) => {
  const body = JSON.parse(req.body)
  let data = await executeQuery("INSERT INTO USER(name, age) VALUES(?,?)", [body.name, body.age])
  res.send(data)
}

export { getData, insertUser }