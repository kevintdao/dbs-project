import React, { useEffect, useState } from 'react'
import Results from '../components/Results'
import AllResults from '../components/AllResults'
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

export default function results() {
  const [data, setData] = useState()

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  }

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch(`/api/all_results`)
      const allResults = await res.json()

      let userId = localStorage.getItem('user')

      res = await fetch(`/api/results?id=${userId}`)
      const result = await res.json()

      setData({
        all: allResults,
        result: result
      })
    }

    fetchData()
  }, [])

  if(!data) return <p>Loading...</p>

  let labels = []
  const resultLabels = data.result.map(item => labels.push(item.genre))
  console.log(labels);

  const resultData = {
    labels,
    datasets: [
      {
        label: 'Score',
        data: data.result.map(item => item.score),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Number of Loves',
        data: data.result.map(item => item.nlove),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Number of Likes',
        data: data.result.map(item => item.nlike),
        backgroundColor: 'rgba(99, 255, 235, 0.5)',
      },
      {
        label: 'Number of Dislikes',
        data: data.result.map(item => item.ndislike),
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
      }
    ]
  }

  return (
    <div className='space-y-4 mt-2'>
      <div>
        <h4 className='font-bold text-xl'>User Results</h4>
        <Results data={data.result} />
        
        <Bar options={options} data={resultData} />
      </div>

      <hr />

      <div>
        <h4 className='font-bold text-xl'>All Results</h4>
        <AllResults data={data.all} />
      </div>
    </div>
  )
}
