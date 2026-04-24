    import { test, expect } from '@playwright/test';

    test('Get all products', async ({request}) =>{
        const response = await request.get('https://automationexercise.com/api/productsList')
        expect(response.status()).toBe(200)
        const body = await response.json()
        expect(Array.isArray(body.products)).toBeTruthy()
        expect(body.products.length).toBeGreaterThan(0)
        for(const product of body.products){
            expect(product).toHaveProperty('id')
            expect(product).toHaveProperty('name')
            expect(product).toHaveProperty('price')
            expect(product).toHaveProperty('brand')
            expect(product).toHaveProperty('category')
            expect(product.category).toHaveProperty('usertype')

        }
})

    test('Post to All Products List', async ({request}) => {
        const response = await request.post('https://automationexercise.com/api/productsList')
        expect(response.status()).toBe(200)
        const body = await response.json()        
        expect(body).toHaveProperty('responseCode')
        expect(body.responseCode).toBe(405)
        expect(body).toHaveProperty('message')
        expect(body.message).toBe('This request method is not supported.')
        })