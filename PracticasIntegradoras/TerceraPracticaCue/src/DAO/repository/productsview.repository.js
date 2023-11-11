export default class ProductViewRepository {
    constructor(dao){
        this.dao = dao
    }

    getProductsViews = async (category,page,limit,sort)=> {
        try {
            const result =  this.dao.getProductsViews(category,page,limit,sort)
            return await result
        } catch (error) {
            console.log("aaaaaaaa",error);
        }
        
         }
    
    getProductById = async (id)=> {
        try {
            const result = await this.dao.getProductById(id)
            return result
        } catch (error) {
            console.log("aaaaaaaaaa",error);
        }
    }

} 