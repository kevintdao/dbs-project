import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Alert from '../components/Alert'
import Header from '../components/Header'

export default function Home() {
  const router = useRouter()
  const [error, setError] = useState('')

  const styles = {
    form: "space-y-4 mt-2 border p-3 rounded shadow-md",
    grid: "grid md:grid-cols-3 gap-4 grid-cols-1",
    input_container: "flex flex-col space-y-2",
    input: "p-2 border border-gray-300 rounded",
    button: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    setError('')
    const data = {
      name: e.target.name.value,
      age: e.target.age.value,
      number: e.target.number.value
    }

    const res = await fetch('/api/add_user', {
      method: 'POST',
      body: JSON.stringify(data)
    })

    const result = await res.json()
    
    if(res.ok){
      // save current user id in local storage
      localStorage.setItem('user', result.insertId)

      router.push({
        pathname: '/games',
        query: {
          user: result.insertId,
          number: e.target.number.value
        }
      }, '/games')
    } else{
      setError(result.error)
    }
  }

  return (
    <div className='space-y-4 mt-2'>
      <Header title='Video Games Suggestion' />
      <h2 className='font-bold text-3xl'>Video Games Suggestion</h2>

      {error && <Alert title='Error' text={error} />}

      <form onSubmit={onSubmit} className={styles.form}>
        <h5 className='font-bold text-xl'>Enter your information</h5>
        <div className={styles.grid}>
          <div className={styles.input_container}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" className={styles.input} required />
          </div>

          <div className={styles.input_container}>
            <label htmlFor="age">Age</label>
            <input type="number" name="age" id="age" className={styles.input} required />
          </div>

          <div className={styles.input_container}>
            <label htmlFor="number">Number of Games</label>
            <input type="number" name="number" id="number" className={styles.input} required defaultValue={10} />
            <p className='text-gray-600 text-xs'>Default: 10</p>
          </div>
        </div>
        <input className={styles.button} type="submit" value="Submit" />
      </form>
    </div>
  )
}
