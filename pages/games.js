import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import VideoGames from '../components/VideoGames'
import { ThumbUpIcon, ThumbDownIcon, HeartIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid'

export default function games() {
  const router = useRouter()
  const number = router.query?.number || 10
  const userId = router.query?.user
  const [data, setData] = useState(null)
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState()
  const [error, setError] = useState('')

  const styles = {
    form: "space-y-4 mt-2",
    button: "bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded",
    card_container: "border p-2 rounded text-center shadow-md",
    icon: "h-21 w-21"
  }

  const choices = [
    { id: 'up', value: 'Up', text: 'Thumb Up', icon: <ThumbUpIcon className={styles.icon} /> },
    { id: 'down', value: 'Down', text: 'Thumb Down', icon: <ThumbDownIcon className={styles.icon} /> },
    { id: 'love', value: 'Love', text: 'Love', icon: <HeartIcon className={styles.icon} /> },
    { id: 'skip', value: 'Skip', text: 'Skip', icon: <ChevronDoubleRightIcon className={styles.icon} /> },
  ]

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/games?number=${number}`)
      const data = await res.json()
      setData(data)
    }

    fetchData()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()

    setError('')
    const formData = {
      user_id: userId,
      video_game_id: data[index].id,
      selection: choice
    }

    const res = await fetch('/api/add_selection', {
      method: 'POST',
      body: JSON.stringify(formData)
    })

    const result = await res.json()
    
    if(res.ok){
      console.log(res)
    } else{
      setError(result.error)
    }
    
    setChoice('')
    setIndex(currIndex => currIndex + 1)
  }

  const onChoiceChange = (e) => {
    setChoice(e.target.value)
  }

  if(!data) return <p>Loading...</p>

  if(index == number - 1) {
    router.push('/result')
    return 
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className='text-right'>{index + 1}/{number}</div>
      <VideoGames data={data[index]} index={index}/>
      <div className='grid md:grid-cols-4 gap-4 grid-cols-2'>
        {choices.map((item, i) => (
          <div className={`${styles.card_container} ${choice == item.value ? 'bg-blue-200 border-blue-300' : 'border-gray-300 bg-white'}`} key={i}>
            <label htmlFor={item.id}>
              <input className='hidden' type="radio" name={item.id} id={item.id} value={item.value} checked={choice == item.value} onChange={onChoiceChange}/>
              {item.text}
              <div className='flex justify-center'>
                {item.icon}
              </div>
            </label>
          </div>
        ))}
      </div>
      <input type="submit" value="Next" className={styles.button} />
    </form>
  )
}
