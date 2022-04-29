import React from 'react'
import { Pie } from 'react-chartjs-2'

export default function ResultsGraph({ data }) {
  const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
  const randomRGB = () => `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.2)`;

  let colors = data.map(item => {
    return randomRGB()
  })

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Percentage of Loved Genre',
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
        data: data.map(item => item.percent),
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1
      }
    ]
  }
  return (
    <div className='min-w-1/2 w-full h-96'>
      <Pie options={options} data={resultData} />
    </div>
  )
}
