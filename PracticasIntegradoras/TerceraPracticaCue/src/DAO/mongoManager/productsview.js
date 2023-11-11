import ProductoViewModel from "./models/productview.model.js"

export default class ProductView {
    getProductsViews = async (category,page,limit,sort) => {
        const result = await ProductoViewModel.paginate(category, {
            page,
            limit,
            lean: true, //pasar a formato json
            sort: {["precio"]:sort} // filtro de ascendente descendente
        })

        return result
    }

    getProductById = async (id)=> {
        const result = await ProductoViewModel.findById(id)

        return result
    }
} 