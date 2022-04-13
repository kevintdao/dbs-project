import React from 'react'

export default function VideoGames ({ data }) {
  const styles = {
    container: 'max-w-2xl rounded overflow-hidden shadow-lg',
  }

  return (
    <div className={styles.container}>
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{data.titles}</div>
        <p className='text-gray-700 text-base'>{`Released: ${data.released}`}</p>
        <p className='text-gray-700 text-base'>{`Developer: ${data.developer}`}</p>
        <p className='text-gray-700 text-base'>{`Genres: ${data.genres}`}</p>
      </div>
    </div>
  )
}
