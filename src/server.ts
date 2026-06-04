import app from "./app";
import database from "./database/db";
const PORT = 3333

app.listen(PORT, async () => {
    try {
        await database.authenticate()
        console.log(`server is running on ${PORT}`)
    } catch(error) {
        console.log("was not possible to connect database")
    }
})