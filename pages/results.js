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
import Header from '../components/Header'
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
  const [userChoice, setUserChoice] = useState('table')
  const [allChoice, setAllChoice] = useState('table')

  const styles = {
    radio_button: 'form-radio h-4 w-4 border border-gray-300 focus:outline-none transition duration-200 mt-1 align-top bg-center bg-contain mr-2 cursor-pointer'
  }

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
      <Header title='Video Games Results' />
      <div>
        <h4 className='font-bold text-xl'>User Results</h4>
        <div className='space-x-4'>
          <label htmlFor="u-table">
            <input className={styles.radio_button} type="radio" name="u-table" id="u-table" checked={userChoice == 'table'} onChange={() => setUserChoice('table')} />
            Table
          </label>
          <label htmlFor="u-graph">
            <input className={styles.radio_button} type="radio" name="u-graph" id="u-graph" checked={userChoice == 'graph'} onChange={() => setUserChoice('graph')} />
            Graph
          </label>
        </div>
        {userChoice == 'table' && <Results data={data.result} />}
        {userChoice == 'graph' && <ResultsGraph data={data.percent} />}
      </div>

      <hr />

      <div>
        <h4 className='font-bold text-xl'>All Results</h4>
        <div className='space-x-4'>
          <label htmlFor="a-table">
            <input className={styles.radio_button} type="radio" name="a-table" id="a-table" checked={allChoice == 'table'} onChange={() => setAllChoice('table')} />
            Table
          </label>
          <label htmlFor="a-graph">
            <input className={styles.radio_button} type="radio" name="a-graph" id="a-graph" checked={allChoice == 'graph'} onChange={() => setAllChoice('graph')} />
            Graph
          </label>
        </div>
        {allChoice == 'table' && <AllResults data={data.all} />}
        {allChoice == 'graph' && <AllResultsGraph data={data.all} />}
      </div>
    </div>
  )
}
