import React from 'react'

export default function Home() {
  const styles = {
    form: "space-y-4 mt-2", 
    input_container: "flex flex-col",
    input: "p-2 border border-gray-300 rounded",
    button: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const data = {
      name: e.target.name.value,
      age: e.target.age.value
    }

    const res = await fetch('/api/add_user', {
      method: 'POST',
      body: JSON.stringify(data)
    })

    const result = await res.json()
    console.log(result)
  }

  return (
    <div className='space-y-4 mt-2'>
      <h2 className='font-bold'>Homepage</h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.input_container}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" className={styles.input} required/>
        </div>

        <div className={styles.input_container}>
          <label htmlFor="age">Age</label>
          <input type="number" name="age" id="age" className={styles.input} required/>
        </div>

        <input className={styles.button} type="submit" value="Submit" />
      </form>
    </div>
  )
}
