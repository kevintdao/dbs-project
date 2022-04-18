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
  let data = await executeQuery("select developers from mytable", [])

  let developers = []
  data.map((item, i) => {
    const current = item.developers.split(',')
    current.map((dev) => {
      dev = dev.trim()
      if(!developers.includes(dev)) developers.push(dev)
    })
  })

  developers.map(item => {
    executeQuery("INSERT INTO DEVELOPER(name) VALUES(?)", [item])
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
  })
  res.send(developers)
}

const normalizePublishers = async (req, res) => {
  let data = await executeQuery("select publishers from mytable", [])

  let publishers = []
  data.map((item, i) => {
    const current = item.publishers.split(/[,/]/)
    current.map((pub) => {
      pub = pub.trim()
      if(!publishers.includes(pub) && pub != "") publishers.push(pub)
    })
  })
  
  publishers.map(item => {
    executeQuery("INSERT INTO PUBLISHER(name) VALUES(?)", [item])
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
  })
  res.send(publishers)
}

const normalizeGenres = async (req, res) => {
  let data = await executeQuery("select genres from mytable", [])

  let genres = []
  data.map((item, i) => {
    const current = item.genres.split(',')
    current.map((gen) => {
      gen = gen.trim()
      if(!genres.includes(gen)) genres.push(gen)
    })
  })

  genres.map(item => {
    executeQuery("INSERT INTO GENRE(name) VALUES(?)", [item])
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
  })
  res.send(genres)
}

const normalizeGames = async (req, res) => {
  let data = await executeQuery("select titles, released from mytable", [])

  data.map(item => {
    executeQuery("INSERT INTO VIDEO_GAME(title, released) VALUES(?, ?)", [item.titles, item.released])
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
  })

  res.send(data)
}

export { getData, insertUser, getGames, insertSelection, normalizeDevelopers, normalizePublishers, normalizeGenres, normalizeGames }