
import passport from "passport";
import { usersService } from "../DAO/repository/index.js";
//RENDERS

export const register = async (req,res) => {
    res.render("register",{})
}

export const login = async (req,res) => {
    res.render("login",{})
}


//SESSIONES
export const iniciateSession = async (req,res)=> {
    if(!req.user) return res.status(400).send("Invalid Credentials")
    req.session.user = req.user
    return res.redirect ("/api/session/profile")
}

export const returnLogin = async (req,res)=> {
    res.redirect("/api/session/login")
}

//AUTH

export const authLogin =async(req,res,next)=> {
    if (req.session?.user) next()
    else res.redirect("/api/session/login")
}

//ACCESO AL PERFIL

export const accessProfile = async(req,res)=> {
    const user = req.session.user
    console.log(user);
    res.render("profile", user)
}

//CURRENT

export const current = async(req,res)=> {
    const user = req.session.user
    res.render("current", user)
}

export const logOut = async(req,res)=> {
    req.session.destroy(error => {
        if (error) {
          console.error('Error al cerrar sesión:', err)
        } else {
          console.log("Sesion cerrada")
          res.redirect('/')//HOME
        }
      })
}

//AUTENTICACION CON GITHUB

export const emptyReqRes= async(req,res)=> {

}

export const githubcallback= async(req,res)=> {
    console.log("Callback: ",req.user)
    req.session.user = req.user
    console.log(req.session)
    res.redirect("/api/session/profile")
}

//Middleware para bloqueo de ingreso a DB 

export const authUser = async(req,res,next)=> {
    const user = req.session.user
    console.log("aa",user);
    if(user.email =="adminCoder@coder.com"){
        next()
    }else{res.send("Not Autorized, you r not admin ")}
}

//Enviar datos al front con dto current 

export const currentDTO = async(req,res)=>{
    const user = req.session.user
    const result = usersService.current(user)
    res.send({status:"success",payload:result})
}













