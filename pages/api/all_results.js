import nc from 'next-connect'
import { getAllResults } from '../../queries/queries'

const handler = nc()
handler.get(getAllResults)

export default handler