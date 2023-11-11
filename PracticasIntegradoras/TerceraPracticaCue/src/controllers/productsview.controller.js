import {productoviewService} from "../DAO/repository/index.js";

export const getProductsViews = async (req,res)=> {
    const page = parseInt(req.query?.page || 1)
    const limit = parseInt(req.query?.limit || 10)
    const query = req.query?.query
    const sort =  parseInt(req.query?.sort || 1)//sort -1 precio asd-des, sort 1 precio des-asd

    const category = () => {
        if (query) {
          return {idCategoria : query} 
        }else {
          return {}
        }
    }
    
    const result = await productoviewService.getProductsViews(category(),page,limit,sort)

    const a = result.prevLink = result.hasPrevPage ? `/api/products/?page=${result.prevPage}&limit=${limit}` : ""
    const b = result.nextLink = result.hasNextPage ? `/api/products/?page=${result.nextPage}&limit=${limit}` : ""
    
    const info = {
      totalDocs: result.totalDocs,
      limit: result.limit,
      totalPages: result.totalPages,
      page: result.page,
      pagingCounter:result.pagingCounter,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage:result.nextPage,
      prevLink: a,
      nextLink: b
    }

    result.info = info
    console.log(result);
    res.json(result)
    
}

export const getProductById = async (req,res)=> {
    const id = req.params.id
    const user = req.session.user.cart
    const cart1  = new Object()

    cart1.cart = user
    console.log(cart1);


    const result = await productoviewService.getProductById(id)
    const resultfinal = Object.assign(result._doc,cart1)
    console.log(resultfinal);
    res.json(result)
}