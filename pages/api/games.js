import nc from 'next-connect'
import { getGames } from '../../queries/queries'

const handler = nc()
handler.get(getGames)

export default handler