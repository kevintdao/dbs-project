import nc from 'next-connect'
import { update_genre_selections_love } from '../../queries/queries'

const handler = nc()
handler.post(update_genre_selections_love)

export default handler