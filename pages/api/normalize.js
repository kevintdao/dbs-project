import nc from 'next-connect'
import { normalizeDevelopers } from '../../queries/queries'

const handler = nc()
handler.get(normalizeDevelopers)

export default handler