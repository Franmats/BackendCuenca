import passport from "passport";
import local from "passport-local"
import userModel from "../DAO/mongoManager/models/user.model.js"
import GitHubStrategy from "passport-github2"
import { createHash, isValidPassword } from "../utils.js";
import CartModel from "../DAO/mongoManager/models/cart.model.js";


const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use("github", new GitHubStrategy({
        clientID:"Iv1.16aeb94733f59b12",
        clientSecret:"c7dd33998ef19c5c0c8daba8b7d94da454e7e1a1",
        callbackURL:"http://127.0.0.1:8080/api/session/githubcallback"
    },
    async (accessToken, refreshToken, profile,done) => {

        try{
            const user = await userModel.findOne({email:profile._json.email})
            if(user){
                console.log("user already existe")
                return done(null,user)
            }
            const carrito = async()=> {
                if(!user){
                    const a = await CartModel.create({products:[]})
                    const id =a._id.toHexString()
                    console.log(id);
                    return id
                }
                
            }
            
            const newUser = {
                first_name:profile._json.name,
                email:profile._json.email,
                role:"usuario",
                cart:await carrito(),
                password:""
            }

            const result = await userModel.create(newUser)
            return done(null,result)
        } catch(e) {
            return done("Error to login"+ e)
        }

    }
    
    ))
    //Register es el nombre para registrar con local
    passport.use("register", new LocalStrategy(
        {
            passReqToCallback:true,
            usernameField:"email"
        },
        async(req,username,password,done) => {
            let {first_name,last_name,age,role,cart,email} = req.body
            try{
                const user = await userModel.find({email:username})
                if (!user){
                    console.log("User already exist")

                    return done(null, false)
                }


                const carrito = async()=> {
                    if(user){
                        const a = await CartModel.create({products:[]})
                        const id =a._id.toHexString()
                        console.log(id);
                        return id
                    }
                    
                }
                const tipo = ()=> {
                    if ((email == "adminCoder@coder.com") && (password == "adminCod3r123")){
                        role="admin"
                        return role
                    } else {
                        role="usuario"
                        return role
                    }
                }

                const newUser = {
                    first_name,
                    last_name,
                    role: tipo(),
                    cart:await carrito(),
                    age,
                    email,
                    password:createHash(password)
                }
                console.log(newUser);
                const result = await userModel.create(newUser)
                return done(null, result)
            }catch(e){
                return done("error to register " + e)
            }
        }
    ))
    //Login es el nombre para iniciar sesion con local
    passport.use("login", new LocalStrategy(
        {usernameField:"email"},
        async (username,password,done) => {
            try{
            const user = await userModel.findOne({email:username}).lean().exec()
            if(!user){
                console.error("User doesnt exist")
                return done(null,false)
            }

            if(!isValidPassword(user,password)){
                console.error("Password not valid")
                return done(null,false)
            }
            return done(null,user)
            }catch(e) {
                return done("Error login " + error)
            }
        }
    ))
    //Login es el nombre para iniciar sesion con local
    passport.use("current", new LocalStrategy(
        {usernameField:"email"},
        async (username,password,done) => {
            try{
            const user = await userModel.findOne({email:username}).lean().exec()
            if(!user){
                console.error("User doesnt exist")
                return done(null,false)
            }

            if(!isValidPassword(user,password)){
                console.error("Password not valid")
                return done(null,false)
            }
            return done(null,user)
            }catch(e) {
                return done("Error login " + error)
            }
        }
    ))

    passport.serializeUser((user,done) => {
        done(null,user._id)
    })

    passport.deserializeUser(async(id,done)=> {
        const user = await userModel.findById(id)
        done(null,user)
    })

}

export default initializePassport