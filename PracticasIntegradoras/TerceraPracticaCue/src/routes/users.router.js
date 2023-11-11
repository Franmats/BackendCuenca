import { Router } from "express";
import { accessProfile,current,githubcallback,emptyReqRes, logOut, currentDTO, registerJWT, loginJWT } from "../controllers/users.controller.js";
import { passportCall,authorization } from "../utils.js";
import passport from "passport";

const router = Router()

/* router.get("/",(req,res)=> {
    res.render("rutassesion")
})

router.get("/login", login)

router.get("/register", register) */


router.post("/login",passport.authenticate("login"),loginJWT)

router.post("/register",passport.authenticate("register"),registerJWT)


router.get("/profile",passportCall("jwt",{ session: false }),authorization("usuario"),accessProfile)

router.get("/current",passportCall("jwt",{ session: false }),authorization("usuario"), current)

router.get("/logout",logOut)

router.get("/login-github",passport.authenticate("github", {failureRedirect:"/"}),emptyReqRes)

router.get("/githubcallback",githubcallback)

router.get("/currentDTO",currentDTO)


export default router