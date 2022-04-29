import nc from 'next-connect'
import { getRecommended } from '../../queries/queries'

const handler = nc()
handler.get(getRecommended)

export default handler