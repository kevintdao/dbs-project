import nc from 'next-connect'
import { getPercentLoved } from '../../queries/queries'

const handler = nc()
handler.get(getPercentLoved)

export default handler