import nc from 'next-connect'
import { normalizeGenres, normalizePublishers, normalizeDevelopers, normalizeGames, normalize, test } from '../../queries/queries'

const handler = nc()
handler.get(test)

export default handler