import { Client } from 'pg'
const url = process.env.ELEPHANT_POSTGRE_SQL_URL
const client =  new Client(url,)

export default client