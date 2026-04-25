import {expect} from "@playwright/test"

export type Product ={
    id: number
  name: string
  price: string
  brand: string
  category: {
    usertype: object
    category: string
  }
}



export function checkInvalidMethod(body: any){
    expect(body).toEqual(expect.objectContaining({
    responseCode: 405,
    message: 'This request method is not supported.'
    }))
}

export function expectProductStructure(product: Product){
    expect(product).toEqual(expect.objectContaining({
    id: expect.any(Number),
    name: expect.any(String),
    price: expect.any(String),
    brand: expect.any(String),
    category: expect.any(Object),
    }))
    expect(product.category).toEqual(expect.objectContaining({
    usertype: expect.any(Object),
    category: expect.any(String),
    }))
}
