import { APIRequestContext, expect } from '@playwright/test';
import { User } from '../../../Utiles/userFactory';

export function createUserViaApi(request: APIRequestContext, newUser: User) {
    return request.post('/api/createAccount', {
        form: {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            title: 'Mr',
            birth_date: newUser.dateOfBirth,
            birth_month: newUser.monthOfBirth,
            birth_year: newUser.yearOfBirth,
            firstname: newUser.firstName,
            lastname: newUser.lastName,
            company: newUser.company,
            address1: newUser.address1,
            address2: newUser.address2,
            country: newUser.country,
            zipcode: newUser.zipCode,
            state: newUser.state,
            city: newUser.city,
            mobile_number: newUser.mobilePhone,
        },
    });
}

export async function deleteUserViaApiAndExpectSuccess(request: APIRequestContext, newUser: User) {
    const deleteResponse = await request.delete('/api/deleteAccount', {
        form: {
            email: newUser.email,
            password: newUser.password,
        },
    });
    expect(deleteResponse.status()).toBe(200);

    const deleteResponseBody = await deleteResponse.json();
    expect(deleteResponseBody).toEqual(expect.objectContaining({
        responseCode: 200,
        message: 'Account deleted!',
    }));
}
