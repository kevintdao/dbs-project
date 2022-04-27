import React, { useEffect, useState } from 'react'
import Results from '../components/Results'
import AllResults from '../components/AllResults'

export default function results() {
  const [data, setData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch(`/api/all_results`)
      const allResults = await res.json()

      res = await fetch(`/api/results?id=2`)
      const result = await res.json()

      setData({
        all: allResults,
        result: result
      })
    }

    fetchData()
  }, [])

  if(!data) return <p>Loading...</p>

  console.log(data)

  return (
    <div className='space-y-4 mt-2'>
      <div>
        <h4 className='font-bold text-xl'>User Results</h4>
        <Results data={data.result} />
      </div>

      <div>
        <h4 className='font-bold text-xl'>All Results</h4>
        <AllResults data={data.all} />
      </div>
    </div>
  )
}
