import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import VideoGames from '../components/VideoGames'
import { ThumbUpIcon, ThumbDownIcon, HeartIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid'
import SelectionCount from '../components/SelectionCount'
import Alert from '../components/Alert'
import Header from '../components/Header'

export default function games() {
  const router = useRouter()
  const number = router.query?.number || 10
  const userId = router.query?.user
  const [data, setData] = useState(null)
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState()
  const [error, setError] = useState('')
  const [selections, setSelections] = useState({ 'Like': 0, 'Dislike': 0, 'Love': 0, 'Skip': 0 })

  const styles = {
    form: "space-y-4 mt-2",
    button: "disabled:bg-blue-300 disabled:cursor-default bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded",
    card_container: "border p-2 rounded text-center shadow-md",
    icon: "h-21 w-21"
  }

  const choices = [
    { id: 'like', value: 'Like', text: 'Like', icon: <ThumbUpIcon className={styles.icon} /> },
    { id: 'dislike', value: 'Dislike', text: 'Dislike', icon: <ThumbDownIcon className={styles.icon} /> },
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

    // update genre selections
    // for each genre of this game, update genre_selections accordingly
    let res2
    for (let i = 0; i < data[index].genres.length; i++) {
      const userGenreData = {
        user_id: userId,
        genre: data[index].genres[i]
      }
      if (choice == 'Like') {
        res2 = await fetch('/api/update_genre_selections_like', {
          method: 'POST',
          body: JSON.stringify(userGenreData)
        })
      }
      else if (choice == 'Dislike') {
        res2 = await fetch('/api/update_genre_selections_dislike', {
          method: 'POST',
          body: JSON.stringify(userGenreData)
        })
      }
      else if (choice == 'Love') {
        res2 = await fetch('/api/update_genre_selections_love', {
          method: 'POST',
          body: JSON.stringify(userGenreData)
        })
      }
    }
    
    // const result2 = await res2.json()
    
    // if(res2.ok){
    //   console.log(res2)
    // } else{
    //   setError(result2.error)
    // }
    
    setSelections((prev) => ({...prev, [choice]: prev[choice]+1}))
    setChoice('')
    setIndex(currIndex => currIndex + 1)
  }

  const onChoiceChange = (e) => {
    setChoice(e.target.value)
  }

  if(!data) return <p>Loading...</p>

  if(index == number) {
    router.push('/results')
    return 
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Header title='Video Games Selection' />
      <h2 className='font-bold text-3xl'>Games Selection</h2>

      <div className='flex justify-between'>
        <SelectionCount selections={selections} />
        {index + 1}/{number}
      </div>
      
      {error && <Alert title='Error' text={error} />}

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
      <input type="submit" value="Next" className={styles.button} disabled={!choice} />
    </form>
  )
}
