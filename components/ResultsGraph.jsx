import React from 'react'
import { Pie } from 'react-chartjs-2'

export default function ResultsGraph({ data }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Likeability Score for All Genres for All Users',
      },
    },
  }

  const resultData = {
    labels: data.map(item => {
      return item.genre
    }),
    datasets: [
      {
        label: 'Percentage of loved genre',
        data: data.map(item => item.percent)
      }
    ]
  }
  return (
    <div className='min-w-1/2 w-full h-96'>
      <Pie options={options} data={resultData} />
    </div>
  )
}
