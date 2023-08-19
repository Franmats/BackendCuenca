import { Router } from "express";
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

export default router