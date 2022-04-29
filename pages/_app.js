import '../styles/globals.css'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar/>
      <div className='max-w-5xl px-2 container mx-auto pb-3'>
        <Component {...pageProps} />
      </div>
    </>
  )
  
}

export default MyApp
