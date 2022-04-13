import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className='max-w-5xl px-2 container mx-auto pb-3'>
      <Component {...pageProps} />
    </div>
  )
  
}

export default MyApp
