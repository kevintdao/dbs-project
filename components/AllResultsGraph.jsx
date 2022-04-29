import React from 'react'
import { Bar } from 'react-chartjs-2'

export default function AllResultsGraph({ data }) {
  const options = {
    responsive: true,
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

  let labels = []
  const resultLabels = data.map(item => labels.push(item.genre))

  const resultData = {
    labels,
    datasets: [
      {
        label: 'Score',
        data: data.map(item => item.scores),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  }

  return (
    <>
      <Bar options={options} data={resultData} />
    </>
  )
}
