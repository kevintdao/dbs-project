import nc from 'next-connect'
import { update_genre_selections_like } from '../../queries/queries'

const handler = nc()
handler.post(update_genre_selections_like)

export default handler