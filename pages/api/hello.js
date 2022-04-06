// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from 'next-connect'
import { getData } from '../../queries/queries'

const handler = nc()
handler.get(getData)

export default handler