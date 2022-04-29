import React from 'react'

export default function RecommendedGames({ data }) {
  const styles = {
    table: 'divide-y divide-gray-200 min-w-full table-fixed',
    header: 'px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
    body: 'divide-y divide-gray-200',
    cell: 'px-2 py-3 text-sm font-medium text-gray-900',
  }

  const labels = {
    text: ['Title', "Date", 'Publisher'],
    id: ['title', 'date', 'publisher']
  }

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            {labels.id.map((item, i) => (
              <th key={i} id={labels.id[i]} className={styles.header}>{labels.text[i]}</th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.body}>
            {data.map((item, i) => (
              <tr key={i}>
                <td className={styles.cell} id={`title-${i}`}>{item.title}</td>
                <td className={styles.cell} id={`date-${i}`}>{item.date}</td>
                <td className={styles.cell} id={`publisher-${i}`}>{item.publisher}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}