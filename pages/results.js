import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import Results from '../components/Results'
import ResultsGraph from '../components/ResultsGraph'
import AllResults from '../components/AllResults'
import AllResultsGraph from '../components/AllResultsGraph'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function results() {
  const [data, setData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch(`/api/all_results`)
      const allResults = await res.json()

      let userId = localStorage.getItem('user')

      res = await fetch(`/api/results?id=${userId}`)
      const result = await res.json()

      res = await fetch(`/api/percent_loved?id=${userId}`)
      const percent = await res.json()

      setData({
        all: allResults,
        result: result,
        percent: percent
      })
    }

    fetchData()
  }, [])

  if(!data) return <p>Loading...</p>

  return (
    <div className='space-y-4 mt-2'>
      <div>
        <h4 className='font-bold text-xl'>User Results</h4>
        <Results data={data.result} />
        <ResultsGraph data={data.percent} />
      </div>

      <hr />

      <div>
        <h4 className='font-bold text-xl'>All Results</h4>
        <AllResults data={data.all} />
        <AllResultsGraph data={data.all} />
      </div>
    </div>
  )
}
