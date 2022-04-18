import nc from 'next-connect'
import { normalizeGenres, normalizePublishers, normalizeDevelopers } from '../../queries/queries'

const handler = nc()
handler.get(normalizeGenres)

export default handler