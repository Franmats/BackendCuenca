import { Router } from "express";
import UserModel from "../DAO/mongoManager/models/user.model.js";

const router = Router()
router.get("/", (req,res)=> {
    res.render("home",{})
})
router.get("/login", (req,res) => {
    if (req.session?.user){
        res.redirect("/profile")
    }
    
    res.render("login",{})
})
router.get("/register", (req,res) => {
    const user = req.session.user
    console.log(user);
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
/*     const user = req.session.user

    const admin = {
        user,
        roll: admin
    }
    if ((user.email == "adminCoder@coder.com") && (user.password == "adminCod3r123")){
        res.render("profile",admin)
    }
    res.render("profile",user) */
    const user = req.session.user
    if ((user.email == "adminCoder@coder.com") && (user.password == "adminCod3r123")){
        user.roll="admin"
        res.render("profile",user)
    } else {
        user.roll="usuario"
        res.render("profile",user)
    }
 
})
//Current

router.get("/current", (req,res)=> {
    const user = req.session.user
    console.log(user);
    res.render("current",user)
})

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
      if (error) {
        console.error('Error al cerrar sesión:', err)
      } else {
        console.log("Sesion cerrada")
        res.redirect('/')
      }
    })
  })

export default router