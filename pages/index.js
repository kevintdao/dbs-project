import React from 'react'

export default function Home() {
  const styles = {
    input: "p-2 border border-gray-300 rounded"
  }

  return (
    <div className='space-y-4 mt-2'>
      <h2 className='font-bold'>Homepage</h2>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" className={styles.input} />
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input type="number" name="age" id="age" className={styles.input} />
      </div>
    </div>
  )
}
