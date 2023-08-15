import { Router } from "express";
import productPagModel from "../DAO/mongoManager/models/productpag.model.js"

const router = Router()

router.get("/", async (req, res)=> {
  const page = parseInt(req.query?.page || 1)
  const limit = parseInt(req.query?.limit || 10)
  const query = req.query?.query
  const sort =  parseInt(req.query?.sort || 1)//sort -1 precio asd-des, sort 1 precio des-asd

  const categoria = () => {
    if (query) {
      return {idCategoria : query} 
    }else {
      return {}
    }
  }

  const result = await productPagModel.paginate(categoria(), {
      page,
      limit,
      lean: true, //pasar a formato json
      sort: {["precio"]:sort} // filtro de ascendente descendente
  })

  result.prevLink = result.hasPrevPage ? `/api/products/?page=${result.prevPage}&limit=${limit}` : ""
  result.nextLink = result.hasNextPage ? `/api/products/?page=${result.nextPage}&limit=${limit}` : ""
  console.log(result);

  res.render("products",result)
})
export default router