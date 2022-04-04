import { executeQuery } from '../config/db'

const getData = async (req, res) => {
  let data = await executeQuery("select * from city", [])
  res.send(data)
}
export { getData }