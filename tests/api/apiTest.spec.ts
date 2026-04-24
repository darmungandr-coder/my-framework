    import { test, expect } from '@playwright/test';
import { request } from 'http';

    test('Get all products', async ({request}) =>{
        const response = await request.get('/api/productsList')
        expect(response.status()).toBe(200)
        const body = await response.json()
        expect(Array.isArray(body.products)).toBeTruthy()
        expect(body.products.length).toBeGreaterThan(0)
        for(const product of body.products){
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
})
    test('Post to All Products List', async ({request}) => {
        const response = await request.post('/api/productsList')
        expect(response.status()).toBe(200)
        const body = await response.json()
        expect(body).toEqual(expect.objectContaining({
            responseCode: 405,
            message: 'This request method is not supported.'
        }))
        })

    test('API 3: Get All Brands List', async ({request})=>{
        const response = await request.get('/api/brandsList')
        expect(response.status()).toBe(200)
        const body = await response.json()
        expect(body).toEqual(expect.objectContaining({
            responseCode: 200,
            brands: expect.any(Array)
        }))
        expect(body.brands.length).toBeGreaterThan(0)
        for (const brand of body.brands){
            expect(brand).toEqual(expect.objectContaining({
                id: expect.any(Number),
                brand: expect.any(String)
            }))
        }
    })