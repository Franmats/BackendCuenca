import UsersDTO from "../DTO/users.dto.js";
import UsersDTOFront from "../DTO/usersFront.dto.js";
export default class UsersRepository{

    constructor(dao){
        this.dao = dao
    }

    getUserByEmail = async (emailjson) => {return await this.dao.getUserByEmail(emailjson)}

    createUser = async (newUser) => {
        const result = new UsersDTO(newUser)
        console.log(result)
        return await this.dao.createUser(result)
    }

    getUserByID = async (id) => {return await this.dao.getUserByID(id)}

    current = async (user)=> {
        console.log("aaaaaaaaaa",user);
        const result = new UsersDTOFront(user)
        console.log(result);
        return result
    }

}