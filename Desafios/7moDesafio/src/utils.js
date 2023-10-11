import {faker} from "@faker-js/faker";

 

export const generateP = ()=> {

    const numOfProducts = faker.number.int({max:100})

    const products = []

    for (let i = 0; i < numOfProducts; i++) {
        products.push(generateProduct())
        
    }

    return {
        products
    }
}

const generateProduct = () => {
    
    return {
        nombre: faker.commerce.productName(),
        precio:faker.commerce.price(),
        category:faker.commerce.department(),
        stock:faker.number.int({max:100}),
        id: faker.database.mongodbObjectId(),
        imagen: faker.image.urlLoremFlickr()
    }
}