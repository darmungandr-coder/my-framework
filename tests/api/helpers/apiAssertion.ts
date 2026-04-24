import { expect } from "@playwright/test"



export function checkInvalidMethod(body: any){
    expect(body).toEqual(expect.objectContaining({
    responseCode: 405,
    message: 'This request method is not supported.'
    }))
}