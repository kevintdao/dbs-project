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
  const sql = `SELECT vg.title, vg.release, vg. from video_game AS vg 
  JOIN video_game_info AS vgi ON vgi.video_game_id = vg.id 
  JOIN genre AS g ON g.id = vgi.genre_id 
  JOIN publisher AS p ON p.id = vgi.publisher_id 
  JOIN developer AS d ON d.id = vgi.developer_id 
  ORDER BY RAND() LIMIT ?`

  let data = await executeQuery(sql, [parseInt(req.query.number)])
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

// start normalize functions
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

const normalize = async (req, res) => {
  let data = await executeQuery("select * from mytable", [])
  let games = await executeQuery("select * from video_game", [])
  let developers = await executeQuery("select * from developer", [])
  let publishers = await executeQuery("select * from publisher", [])
  let genres = await executeQuery("select * from genre", [])

  let developersObject = {}
  let publishersObject = {}
  let genresObject = {}

  // save developers as key value pair with key = id and value = name
  developers.map((item, i) => {
    developersObject[item.name] = item.id
  })

  // save publishers as key value pair with key = id and value = name
  publishers.map((item, i) => {
    publishersObject[item.name] = item.id
  })

  // save publishers as key value pair with key = id and value = name
  genres.map((item, i) => {
    genresObject[item.name] = item.id
  })

  console.log(genresObject)

  let output = {}
  data.map((game, dataId) => {
    const dev = game.developers.split(',').map(i => i.trim())
    const pub = game.publishers.split(/[,/]/).map(i => i.trim())
    const gen = game.genres.split(',').map(i => i.trim())

    // change array of names to its corresponding ids
    let currDev = dev.map(item => developersObject[item])
    let currPub = pub.map(item => publishersObject[item])
    let currGen = gen.map(item => genresObject[item])

    output[dataId] = {
      developers: currDev,
      publishers: currPub,
      genres: currGen
    }

  })

  for(const [key, value] of Object.entries(output)) {
    value.developers.map((dev) => {
      value.publishers.map((pub) => {
        value.genres.map((gen) => {
          executeQuery("INSERT INTO VIDEO_GAME_INFO(video_game_id, developer_id, publisher_id, genre_id) VALUES(?,?,?,?)", [key, dev, pub, gen])
          .then(data => {
            console.log(data)
          })
          .catch(err => {
            console.log(err)
          })
          // console.log(`ID: ${key}, Dev: ${dev}, Pub: ${pub}, Gen: ${gen}`)
        })
      })
    })
  }

  res.send(data)
}
// end normalize function

const test = async (req, res) => {
  res.send('test')
}

export { 
  getData, 
  insertUser, 
  getGames, 
  insertSelection, 
  normalizeDevelopers, 
  normalizePublishers, 
  normalizeGenres, 
  normalizeGames, 
  normalize,
  test
}