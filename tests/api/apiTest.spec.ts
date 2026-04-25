import { test, expect } from '@playwright/test';
import { checkInvalidMethod, expectProductStructure, Product } from './helpers/apiAssertion';
import { createUser, user } from '../../Utiles/userFactory';
import { createUserViaApi, deleteUserViaApiAndExpectSuccess } from './helpers/userApi';

test('API 1: should return all products', async ({ request }) => {
    const response = await request.get('/api/productsList');
    expect(response.status()).toBe(200);

    const body = await response.json() as { products: Product[] };
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);

    for (const product of body.products) {
        expectProductStructure(product);
    }
});

test('API 2: POST To All Products List', async ({ request }) => {
    const response = await request.post('/api/productsList');
    expect(response.status()).toBe(200);

    const body = await response.json();
    checkInvalidMethod(body);
});

test('API 3: Get All Brands List', async ({ request }) => {
    const response = await request.get('/api/brandsList');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
        responseCode: 200,
        brands: expect.any(Array),
    }));
    expect(body.brands.length).toBeGreaterThan(0);

    for (const brand of body.brands) {
        expect(brand).toEqual(expect.objectContaining({
            id: expect.any(Number),
            brand: expect.any(String),
        }));
    }
});

test('API 4: PUT To All Brands List', async ({ request }) => {
    const response = await request.put('/api/brandsList');
    expect(response.status()).toBe(200);

    const body = await response.json();
    checkInvalidMethod(body);
});

test('API 5: POST To Search Product', async ({ request }) => {
    const nameOfProduct = 'top';
    const response = await request.post('/api/searchProduct', {
        form: {
            search_product: nameOfProduct,
        },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
        responseCode: 200,
        products: expect.any(Array),
    }));

    for (const info of body.products) {
        const name = info.name.toLowerCase();
        const category = info.category.category.toLowerCase();

        expect(name.includes(nameOfProduct) || category.includes(nameOfProduct)).toBeTruthy();
    }
});

test('API 6: POST To Search Product without search_product parameter', async ({ request }) => {
    const response = await request.post('/api/searchProduct');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
        responseCode: 400,
        message: 'Bad request, search_product parameter is missing in POST request.',
    }));
});

test('API 7: POST To Verify Login with valid details', async ({ request }) => {
    const newUser = createUser()
    await createUserViaApi(request, newUser)

    const response = await request.post('/api/verifyLogin', {
        form: {
            email: newUser.email,
            password: newUser.password,
        },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
        responseCode: 200,
        message: 'User exists!',
    }));
});

test('API 8: POST To Verify Login without email parameter', async ({ request }) => {
    const response = await request.post('/api/verifyLogin');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
        responseCode: 400,
        message: 'Bad request, email or password parameter is missing in POST request.',
    }));
});

test('API 9: DELETE To Verify Login', async ({ request }) => {
    const response = await request.delete('/api/verifyLogin');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
        responseCode: 405,
        message: 'This request method is not supported.',
    }));
});

test('API 10: POST To Verify Login with invalid details', async ({ request }) => {
    const response = await request.post('/api/verifyLogin', {
        form: {
            email: 'invalid@email.com',
            password: '1234',
        },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
        responseCode: 404,
        message: 'User not found!',
    }));
});

test('API 11: POST To Create/Register User Account', async ({ request }) => {
    const newUser = createUser();
    let userCreated = false;

    try {
        const response = await createUserViaApi(request, newUser);
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body).toEqual(expect.objectContaining({
            responseCode: 201,
            message: 'User created!',
        }));
        userCreated = true;
    } finally {
        if (userCreated) {
            await deleteUserViaApiAndExpectSuccess(request, newUser);
        }
    }
});

test('API 12: DELETE METHOD To Delete User Account', async ({ request }) => {
    const newUser = createUser();
    const response = await createUserViaApi(request, newUser);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
        responseCode: 201,
        message: 'User created!',
    }));

    await deleteUserViaApiAndExpectSuccess(request, newUser);
});

test('API 13: PUT METHOD To Update User Account', async ({ request }) => {
    const newUser = createUser();
    const response = await createUserViaApi(request, newUser);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
        responseCode: 201,
        message: 'User created!',
    }));

    try {
        const updateUserResponse = await request.put('/api/updateAccount', {
            form: {
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                title: 'Mrs',
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
        expect(updateUserResponse.status()).toBe(200);

        const updateUserResponseBody = await updateUserResponse.json();
        expect(updateUserResponseBody).toEqual(expect.objectContaining({
            responseCode: 200,
            message: 'User updated!',
        }));
    } finally {
        await deleteUserViaApiAndExpectSuccess(request, newUser);
    }
});

test('API 14: GET user account detail by email', async ({ request }) => {
    const newUser = createUser();
    const response = await createUserViaApi(request, newUser);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
        responseCode: 201,
        message: 'User created!',
    }));

    try {
        const getInfoResponse = await request.get('/api/getUserDetailByEmail', {
            params: {
                email: newUser.email,
            },
        });
        expect(getInfoResponse.status()).toBe(200);

        const getInfoResponseBody = await getInfoResponse.json();
        expect(getInfoResponseBody).toEqual(expect.objectContaining({
            responseCode: 200,
            user: expect.any(Object),
        }));
    } finally {
        await deleteUserViaApiAndExpectSuccess(request, newUser);
    }
});
