import nc from 'next-connect'
import { normalizeGenres, normalizePublishers, normalizeDevelopers, normalizeGames } from '../../queries/queries'

const handler = nc()
handler.get(normalizeGames)

export default handler