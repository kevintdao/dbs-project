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
  const sql = `
  SELECT DISTINCT(vg.id), vg.title, vg.released, d.name AS developer, p.name AS publisher, g.name AS genre
  FROM video_game_info AS vgi
  JOIN video_game AS vg ON vg.id = vgi.video_game_id
  JOIN developer AS d ON d.id = vgi.developer_id
  JOIN publisher AS p ON p.id = vgi.publisher_id
  JOIN genre AS g ON g.id = vgi.genre_id
  WHERE vgi.video_game_id IN (
    SELECT * FROM (SELECT id FROM video_game ORDER BY RAND() LIMIT ?) as v
  )
  ORDER BY vg.id;
  `

  let games = await executeQuery(sql, [parseInt(req.query.number)])

  let ids = []
  games.map((game, i) => {
    if(!ids.includes(game.id)) ids.push(game.id)
  })

  let output = []
  ids.map((id, i) => {
    output.push({
      id: id,
      developers: [],
      publishers: [],
      genres: []
    })
  })

  ids.map((id, i) => {
    games.map((game, j) => {
      if(game.id == id) {
        output[i].title = game.title
        output[i].released = game.released
        if (!output[i].developers.includes(game.developer)) output[i].developers.push(game.developer)
        if (!output[i].publishers.includes(game.publisher)) output[i].publishers.push(game.publisher)
        if (!output[i].genres.includes(game.genre)) output[i].genres.push(game.genre)
      }
    })
  })

  res.send(output)
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

// update genre_selections table based on user selections
const update_genre_selections_love = async (req, res) => {
  const body = JSON.parse(req.body)
  executeQuery(`
  INSERT INTO genre_selections(user_id, genre, nlove) values (?,?,?)
  ON DUPLICATE KEY UPDATE nlove = nlove + 1;`, [body.user_id, body.genre, 1])
  .then(data => {
    console.log(data)
    res.status(200).json(data)
  })
  .catch(err => {
    console.log(err)
    res.status(400).json({ error: 'Error with API request' })
  })
}

const update_genre_selections_like = async (req, res) => {
  const body = JSON.parse(req.body)
  executeQuery(`
  INSERT INTO genre_selections(user_id, genre, nlike) values (?,?,?)
  ON DUPLICATE KEY UPDATE nlike = nlike + 1;`, [body.user_id, body.genre, 1])
  .then(data => {
    console.log(data)
    res.status(200).json(data)
  })
  .catch(err => {
    console.log(err)
    res.status(400).json({ error: 'Error with API request' })
  })
}

const update_genre_selections_dislike = async (req, res) => {
  const body = JSON.parse(req.body)
  executeQuery(`
  INSERT INTO genre_selections(user_id, genre, ndislike) values (?,?,?)
  ON DUPLICATE KEY UPDATE ndislike = ndislike + 1;`, [body.user_id, body.genre, 1])
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

const getResults = async (req, res) => {
  const id = req.query.id
  let data = await executeQuery("SELECT * FROM genre_selections WHERE user_id = ? ORDER BY score DESC", [id])
  res.send(data)
}

const getAllResults = async (req, res) => {
  let data = await executeQuery("SELECT genre, SUM(nlove) AS loves, SUM(nlike) AS likes, SUM(ndislike) AS dislikes, SUM(score) AS scores FROM video_games.genre_selections GROUP BY genre ORDER BY scores DESC", [])
  res.send(data)
}

export { 
  getData, 
  insertUser, 
  getGames, 
  insertSelection, 
  update_genre_selections_dislike,
  update_genre_selections_love,
  update_genre_selections_like, 
  normalizeDevelopers, 
  normalizePublishers, 
  normalizeGenres, 
  normalizeGames, 
  normalize,
  getResults,
  getAllResults
} 
