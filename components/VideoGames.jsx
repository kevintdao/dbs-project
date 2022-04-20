import React from 'react'

export default function VideoGames ({ data }) {
  const styles = {
    container: 'rounded overflow-hidden shadow-md border border-gray-300',
  }

  return (
    <div className={styles.container}>
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{data.title}</div>
        <p className='text-gray-700 text-base'>{`Released: ${data.released}`}</p>
        <p className='text-gray-700 text-base'>{`Developer: ${data.developers.join(', ')}`}</p>
        <p className='text-gray-700 text-base'>{`Publisher: ${data.publishers.join(', ')}`}</p>
        <p className='text-gray-700 text-base'>{`Genres: ${data.genres.join(', ')}`}</p>
      </div>
    </div>
  )
}
