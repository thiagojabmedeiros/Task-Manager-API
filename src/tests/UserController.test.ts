import request from "supertest"
import User from "../models/User"
import database from "../database/db"

describe("user controller tests", () => {
    beforeAll(async () => {
        await database.authenticate()
    })
    afterAll(async () => {
        await database.close()
    })

    it("test1", () => {
        console.log("hello")
    })
})