import express from "express"
import { verifyAuth, logOut } from "../controllers/auth.controller.js"

const authRouter = express.Router()


authRouter.post("/verify",verifyAuth)
authRouter.get("/logout",logOut)


export default authRouter