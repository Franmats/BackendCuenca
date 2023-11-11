import { Router } from "express";

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
    const user = req.session.user
    console.log(user);
    res.render("profile",user)
 
})
//Current

router.get("/current",auth, (req,res)=> {
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