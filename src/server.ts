import app from "./app";
import database from "./database/db";
import env from "./env";

app.listen(env.PORT, async () => {
    try {
        await database.authenticate()
        console.log(`server is running on ${env.PORT}`)
    } catch(error) {
        console.log("was not possible to connect database")
    }
})