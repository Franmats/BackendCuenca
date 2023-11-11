import dotenv from "dotenv"

dotenv.config()

/* console.log(dotenv.config()); */
export default {
    persistence: process.env.PERSISTENCE,
    port:process.env.PORT || 8080,
    dbUrl:process.env.DBURL,
    dbName:process.env.DBNAME
}