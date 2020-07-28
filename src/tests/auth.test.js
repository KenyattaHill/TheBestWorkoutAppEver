const supertest = require("supertest");
const { expect } = require('chai');
const mongoose = require("mongoose");
const app = require("../index");
const {User} = require("../models");

describe("testing Authorization Endpoints", () => {
    
    it("test the signup endpoint", async () => {
        const response = await supertest(app).post("/api/auth/signUp").send({
            firstName: "user",
            lastName: "test",
            email: "test@test.com",
            userName: "username",
            password: "password"
        })
        expect(response.status).to.equal(200)
        expect(response.body.message).to.equal("user was registered correctly")
        return Promise.resolve()
    })
    it("test the duplicate username", async () => {
        const response = await supertest(app).post("/api/auth/signUp").send({
            firstName: "user",
            lastName: "test",
            email: "test@test.com",
            userName: "username",
            password: "password"
        })
        expect(response.status).to.equal(400)
        expect(response.body.message).to.equal("failed! username is already in use.")
        return Promise.resolve()
    })
    it("test the duplicate email", async () => {
        const response = await supertest(app).post("/api/auth/signUp").send({
            firstName: "user",
            lastName: "test",
            email: "test@test.com",
            userName: "player1",
            password: "password"
        })
        expect(response.status).to.equal(400)
        expect(response.body.message).to.equal("failed! email is already in use.")
        return Promise.resolve()
    })

    it("test the signIn endpoint", async () => {
        const response = await supertest(app).post("/api/auth/signIn").send({
            userName: "username",
            password: "password"
        })
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property("id")
        expect(response.body).to.have.property("firstName")
        expect(response.body).to.have.property("lastName")
        expect(response.body).to.have.property("userName")
        expect(response.body).to.have.property("accessToken")
        expect(response.body).to.have.property("email")
        return Promise.resolve()
    })
    after(async ()=> {
        await User.deleteOne({
            userName: "username"
        })
        app.close()
        mongoose.connection.close()
    })
})