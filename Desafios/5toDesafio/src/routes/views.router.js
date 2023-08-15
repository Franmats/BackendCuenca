import { Router } from "express";

const router = Router()

router.get("/", (req,res) => {
    if (req.session?.user){
        res.render("/profile")
    }
    
    res.render("login",{})
})
router.get("/register", (req,res) => {
    if(req.session?.user){
        res.redirect("/profile")
    }
    res.render("register",{})
})

function auth(req,res,next) {
    if(req.session?.user) return next()
    res.redirect("/")
}
router.get("/profile", auth ,(req,res) => {
    const user = req.session.user
    const admin = {
        user,
        roll: admin
    }
    if ((user.email == "adminCoder@coder.com") && (user.password == "adminCod3r123")){
        res.render("profile",admin)
    }
    res.render("profile",user)
})

export default router