import passport from "passport";
import local from "passport-local"
import userModel from "../DAO/mongoManager/models/user.model.js"
import GitHubStrategy from "passport-github2"
import { createHash, isValidPassword } from "../utils.js";


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

            const newUser = {
                first_name:profile._json.name,
                email:profile._json.email,
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
            const {name,email} = req.body
            try{
                const user = await userModel.find({email:username})
                if (!user){
                    console.log("User already exist")
                    return done(null, false)
                }

                const newUser = {
                    name,
                    email,
                    password:createHash(password)
                }
                const result = await userModel.create(newUser)
                return done(null,result)
            }catch(e){
                return done("error to register " + error)
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

    passport.serializeUser((user,done) => {
        done(null,user._id)
    })

    passport.deserializeUser(async(id,done)=> {
        const user = await userModel.findById(id)
        done(null,user)
    })

}

export default initializePassport