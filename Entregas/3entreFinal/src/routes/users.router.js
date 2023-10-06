import { Router } from "express";
import { register, login, iniciateSession, returnLogin,authLogin,accessProfile,current,githubcallback,emptyReqRes, logOut, currentDTO } from "../controllers/users.controller.js";
import passport from "passport";

const router = Router()

router.get("/login", login)

router.get("/register", register)


router.post("/login",passport.authenticate("login","/login"),iniciateSession)

router.post("/register",passport.authenticate("register",{
failureRedirect:"/register"
}),returnLogin)


router.get("/profile",authLogin,accessProfile)

router.get("/current", current)

router.get("/logout",logOut)

router.get("/login-github",passport.authenticate("github", {failureRedirect:"/"}),emptyReqRes)

router.get("/githubcallback",githubcallback)

router.get("/currentDTO",currentDTO)


export default router