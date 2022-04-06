import { executeQuery } from '../config/db'

const getData = async (req, res) => {
  let data = await executeQuery("select * from genre", [])
  res.send(data)
}

const insertUser = async (req, res) => {
  let data = await executeQuery("INSERT INTO USER(name, age) VALUES(?,?)", ['test', 18])
  res.send(data)
}

export { getData, insertUser }