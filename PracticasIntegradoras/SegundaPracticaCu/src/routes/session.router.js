/* import { Router } from "express";
import UserModel from "../DAO/mongoManager/models/user.model.js";
const router = Router()

router.post("/login", async (req,res)=> {
    const {email,password} = req.body

    const user = await UserModel.findOne({email,password})
    if(!user) return res.render("login")

    req.session.user = user

    return res.redirect("/profile")


})
router.post("/register", async (req,res)=> {
    const user = req.body
    await UserModel.create(user)

    return res.redirect("/")
})

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
      if (error) {
        console.error('Error al cerrar sesión:', err)
      } else {
        res.redirect('/')
      }
    })
  })

export default router */

import userModel from "../DAO/mongoManager/models/user.model.js";
import { Router } from "express";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";


const router = Router()


//URL para render
router.get("/login", (req, res)=> {
    res.render("login", {})
})
router.get("/register", (req, res) => {

    res.render("register", {})
})

//Iniciar sesion
router.post("/login",passport.authenticate("login","/login"), async (req, res) => {
    /* const {email, password} = req.body

    //Buscamos por email
    const user = await userModel.findOne({email})

    if(!user) {
        console.log("no se encontro el user");
        return res.redirect("/login")
    }
    //Validamos el Password
    if(!isValidPassword(user,password)){
        console.log("password not valid");
        return res.redirect("/login")
    } */

    if(!req.user) return res.status(400).send("Invalid Credentials")
    req.session.user = req.user
    return res.redirect ("/profile")
})

//Registro

router.post("/register", passport.authenticate("register", {
    failureRedirect:"/register"
}),async (req, res) => {
    /* const data = req.body 
    data.password = createHash(data.password)//hasheamos

    const result = await userModel.create(data)
    console.log(result); */



    res.redirect("/login")

})

//Perfils

function auth (req,res,next) {
    if (req.session?.user) next()
    else res.redirect("/login")
}

router.get("/profile", auth, (req,res) => {
    const user = req.session.user
    
    res.render("profile", user)
})

//Current

router.get("/current",(req,res)=> {
    const user = req.session.user
    res.render("current", user)
})

//Github

router.get("/login-github",passport.authenticate("github", {scope:["user:email"]}),
    async(req,res)=>{}
    )

router.get("/githubcallback",passport.authenticate("github", {failureRedirect:"/"}),
    async(req,res)=> {
        console.log("Callback: ",req.user)
        req.session.user = req.user
        console.log(req.session)
        res.redirect("/api/session/profile")
    }
)
export default router