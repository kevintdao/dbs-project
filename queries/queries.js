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
    res.status(400).json({ error: 'Error with API request' })
  })
}

const getGames = async (req, res) => {
  let data = await executeQuery("SELECT * from mytable ORDER BY RAND() LIMIT ?", [parseInt(req.query.number)])
  res.send(data)
}

const insertSelection = async (req, res) => {
  const body = JSON.parse(req.body)
  executeQuery("INSERT INTO USER_SELECTION(user_id, video_game_id, selection) VALUES(?,?,?)", [body.user_id, body.video_game_id, body.selection])
  .then(data => {
    console.log(data)
    res.status(200).json(data)
  })
  .catch(err => {
    console.log(err)
    res.status(400).json({ error: 'Error with API request' })
  })
}

const normalizeDevelopers = async (req, res) => {
  let data = await executeQuery("select developers from mytable where developers is not null", [])

  data.map((item, i) => {
    const developers = item.developers.split(',')
    console.log(developers)
  })
  res.send(data)
}

export { getData, insertUser, getGames, insertSelection, normalizeDevelopers }