import EErrors from "../services/errors/enums.js";

export default (error,req,res,next)=>{
    console.log(error.cause);

    switch (error.code) {
        case EErrors.INVALID_TYPER_ERROR:
            res.status(400).send({
                status:"error",
                error:error.name,
                causer:error.cause
            })
            break;
    
        default:

            return res.send({status:"error",error:"Unhanled error"})
            break;
    }
}