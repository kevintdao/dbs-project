import nc from 'next-connect'
import { insertSelection } from '../../queries/queries'

const handler = nc()
handler.post(insertSelection)

export default handler