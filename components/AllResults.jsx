import React from 'react'

export default function AllResults({ data }) {
  const styles = {
    table: 'divide-y divide-gray-200 min-w-full table-fixed',
    header: 'px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
    body: 'divide-y divide-gray-200',
    cell: 'px-2 py-3 text-sm font-medium text-gray-900',
  }

  const labels = {
    text: ['Genre', "# Love", '# Like', '# Dislike', 'Score'],
    id: ['genre', 'love', 'like', 'dislike', 'score']
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
                <td className={styles.cell} id={`genre-${i}`}>{item.genre}</td>
                <td className={styles.cell} id={`love-${i}`}>{item.loves}</td>
                <td className={styles.cell} id={`like-${i}`}>{item.likes}</td>
                <td className={styles.cell} id={`dislike-${i}`}>{item.dislikes}</td>
                <td className={styles.cell} id={`score-${i}`}>{item.scores}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}
