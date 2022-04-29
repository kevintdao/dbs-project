import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

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
