export default class UsersDTO {
    constructor(user) {
        this.fullname = (user.first_name + user.last_name)
        this.email = user.email
        this.password= user.password
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.age = user.age
        this.role = user.role
        this.cart = user.cart
    }

}