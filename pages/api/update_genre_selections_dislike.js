import nc from 'next-connect'
import { update_genre_selections_dislike } from '../../queries/queries'

const handler = nc()
handler.post(update_genre_selections_dislike)

export default handler