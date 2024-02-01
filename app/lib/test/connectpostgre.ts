import postgres from "postgres";
const url = process.env.ELEPHANT_POSTGRE_SQL_URL as string
const password = process.env.ELEPHANT_POSTGRE_SQL_PASSWORD

//const sql = postgres({ /* options */ }) // will use psql environment variables

const sql_Elephant = postgres(url, {
  password             : password,            // Password of database user
  idle_timeout : 20
})

export default sql_Elephant


//https://www.npmjs.com/package/postgres