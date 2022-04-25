import React from 'react'
import { ThumbUpIcon, ThumbDownIcon, HeartIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid'

export default function SelectionCount({ selections }) {
  const styles = {
    icon: "h-5 w-5"
  }

  const choices = {
    Like: <ThumbUpIcon className={styles.icon} />,
    Dislike: <ThumbDownIcon className={styles.icon} />,
    Love: <HeartIcon className={styles.icon} />,
    Skip: <ChevronDoubleRightIcon className={styles.icon} />,
  }

  return (
    <div className='flex'>
      <p className='mr-2'>Selections: </p>
      <div className='flex flex-row space-x-4 align-top'>
        {Object.entries(choices).map(([key, value], i) => (
          <div className='flex flex-row' key={key}>
            {value}
            <p className='h-full'>: {selections[key]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
