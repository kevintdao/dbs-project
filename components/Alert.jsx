import React from 'react'

export default function Alert ({ title, text }) {
  const styles = {
    container: "bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded",
    title: "font-bold"
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <p>{text}</p>
    </div>
  )
}
