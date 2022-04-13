import nc from 'next-connect'
import { insertUser } from '../../queries/queries'

const handler = nc()
handler.post(insertUser)

export default handler