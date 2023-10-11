export const generateProdErrorInfo= prod=>{
    return `
        Uno o mas propiedades estan incompletos o son invalidos.
        Lista de propiedades obligatorias:
            - name:Must be a string (${prod?.name})
            - price: Must be a number (${prod?.price})
            - stock:Must be a number (${prod?.stock})

    `
}

