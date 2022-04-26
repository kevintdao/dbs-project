import nc from 'next-connect'
import { getResults } from '../../queries/queries'

const handler = nc()
handler.get(getResults)

export default handler