import React, { useState, useEffect } from 'react'
import VideoGames from '../components/VideoGames'

export default function games() {
  const [data, setData] = useState(null)
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState()

  const styles = {
    button: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/games')
      const data = await res.json()
      setData(data)
    }

    fetchData()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(e.target)
  }

  const onChoiceChange = (e) => {
    setChoice(e.target.value)
  }

  if(!data) return <p>Loading...</p>

  return (
    <div className='space-y-4 mt-2'>
      <VideoGames data={data[index]} index={index} onSubmit={onSubmit}/>
      <div className='flex justify-between'>
        <label htmlFor="up">
          <input type="radio" name="up" id="up" value="Up" checked={choice == "Up"} onChange={onChoiceChange}/>
          Thumbs Up
        </label>
        <label htmlFor="down">
          <input type="radio" name="down" id="down" value="Down" checked={choice == "Down"} onChange={onChoiceChange} />
          Thumbs Down
        </label>
        <label htmlFor="love">
          <input type="radio" name="love" id="love" value="Love" checked={choice == "Love"} onChange={onChoiceChange} />
          Love
        </label>
        <label htmlFor="skip">
          <input type="radio" name="skip" id="skip" value="Skip" checked={choice == "Skip"} onChange={onChoiceChange} />
          Skip
        </label>
      </div>
      <input type="submit" value="Next" className={styles.button} />
    </div>
  )
}
