import React, { useState, useEffect } from 'react'
import VideoGames from '../components/VideoGames'

export default function games() {
  const [data, setData] = useState(null)
  const [index, setIndex] = useState(0)

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

  if(!data) return <p>Loading...</p>

  return (
    <div className='space-y-4 mt-2'>
      <VideoGames data={data[index]} index={index} onSubmit={onSubmit}/>
    </div>
  )
}
