import ProductsDTO from "../DTO/products.dto.js"

export default class ProductsRepository {

    constructor(dao){
        this.dao = dao
    }

    getProducts = async () => { return await this.dao.getProducts()}

    getProductByID = async (id) => { return await this.dao.getProductByID(id)}

    createProduct = async (product) =>  {

        const result = new ProductsDTO(product)

        return await this.dao.createProduct(result)
    }

    updateStockProduct = async (id,number) => {return await this.dao.updateStockProduct(id,number)}

    deleteProduct = async(id) => { return await this.dao.deleteProduct(id)}
}