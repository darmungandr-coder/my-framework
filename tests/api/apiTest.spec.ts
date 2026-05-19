import { test, expect } from '@playwright/test';
import { checkInvalidMethod, expectProductStructure, Product } from './helpers/apiAssertion';
import { createUser } from '../../Utiles/userFactory';
import { createUserViaApi, deleteUserViaApiAndExpectSuccess } from './helpers/userApi';

test('API 1: should return all products', async ({ request }) => {
    // Send request to get the full product list.
    const response = await request.get('/api/productsList');
    expect(response.status()).toBe(200);

    // Verify response structure and that the list is not empty.
    const body = await response.json() as { products: Product[] };
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);

    // Check every product contract with a reusable assertion helper.
    for (const product of body.products) {
        expectProductStructure(product);
    }
});

test('API 2: POST To All Products List', async ({ request }) => {
    // This endpoint should not support POST method.
    const response = await request.post('/api/productsList');
    expect(response.status()).toBe(200);

    // Verify API-level error response for unsupported method.
    const body = await response.json();
    checkInvalidMethod(body);
});

test('API 3: Get All Brands List', async ({ request }) => {
    // Send request to get all available brands.
    const response = await request.get('/api/brandsList');
    expect(response.status()).toBe(200);

    // Verify response body contains successful API code and brands array.
    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
        responseCode: 200,
        brands: expect.any(Array),
    }));
    expect(body.brands.length).toBeGreaterThan(0);

    // Check basic contract for each brand item.
    for (const brand of body.brands) {
        expect(brand).toEqual(expect.objectContaining({
            id: expect.any(Number),
            brand: expect.any(String),
        }));
    }
});

test('API 4: PUT To All Brands List', async ({ request }) => {
    // This endpoint should not support PUT method.
    const response = await request.put('/api/brandsList');
    expect(response.status()).toBe(200);

    // Verify API-level error response for unsupported method.
    const body = await response.json();
    checkInvalidMethod(body);
});

test('API 5: POST To Search Product', async ({ request }) => {
    // Prepare search value and send it as form data.
    const nameOfProduct = 'top';
    const response = await request.post('/api/searchProduct', {
        form: {
            search_product: nameOfProduct,
        },
    });
    expect(response.status()).toBe(200);

    // Verify successful response with products array.
    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
        responseCode: 200,
        products: expect.any(Array),
    }));

    // Verify every returned product is relevant to the search value.
    for (const info of body.products) {
        const name = info.name.toLowerCase();
        const category = info.category.category.toLowerCase();

        expect(name.includes(nameOfProduct) || category.includes(nameOfProduct)).toBeTruthy();
    }
});

test('API 6: POST To Search Product without search_product parameter', async ({ request }) => {
    // Send invalid request without required form parameter.
    const response = await request.post('/api/searchProduct');
    expect(response.status()).toBe(200);

    // Verify expected validation error from API.
    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
        responseCode: 400,
        message: 'Bad request, search_product parameter is missing in POST request.',
    }));
});

test('API 7: POST To Verify Login with valid details', async ({ request }) => {
    // Prepare test user before checking login.
    const newUser = createUser();
    await createUserViaApi(request, newUser);

    // Send login verification request with valid credentials.
    const response = await request.post('/api/verifyLogin', {
        form: {
            email: newUser.email,
            password: newUser.password,
        },
    });
    expect(response.status()).toBe(200);

    // Verify API confirms that the user exists.
    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
        responseCode: 200,
        message: 'User exists!',
    }));
});

test('API 8: POST To Verify Login without email parameter', async ({ request }) => {
    // Send invalid login verification request without credentials.
    const response = await request.post('/api/verifyLogin');
    expect(response.status()).toBe(200);

    // Verify expected validation error from API.
    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
        responseCode: 400,
        message: 'Bad request, email or password parameter is missing in POST request.',
    }));
});

test('API 9: DELETE To Verify Login', async ({ request }) => {
    // This endpoint should not support DELETE method.
    const response = await request.delete('/api/verifyLogin');
    expect(response.status()).toBe(200);

    // Verify API-level error response for unsupported method.
    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
        responseCode: 405,
        message: 'This request method is not supported.',
    }));
});

test('API 10: POST To Verify Login with invalid details', async ({ request }) => {
    // Send login verification request with credentials that do not exist.
    const response = await request.post('/api/verifyLogin', {
        form: {
            email: 'invalid@email.com',
            password: '1234',
        },
    });
    expect(response.status()).toBe(200);

    // Verify API returns user-not-found response.
    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
        responseCode: 404,
        message: 'User not found!',
    }));
});

test('API 11: POST To Create/Register User Account', async ({ request }) => {
    // Generate unique user data for isolated test execution.
    const newUser = createUser();
    let userCreated = false;

    try {
        // Create user through API and verify successful response.
        const response = await createUserViaApi(request, newUser);
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body).toEqual(expect.objectContaining({
            responseCode: 201,
            message: 'User created!',
        }));
        userCreated = true;
    } finally {
        // Clean up only if the user was created successfully.
        if (userCreated) {
            await deleteUserViaApiAndExpectSuccess(request, newUser);
        }
    }
});

test('API 12: DELETE METHOD To Delete User Account', async ({ request }) => {
    // Prepare user that will be deleted by the test.
    const newUser = createUser();
    const response = await createUserViaApi(request, newUser);
    expect(response.status()).toBe(200);

    // Verify user was created before deletion.
    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
        responseCode: 201,
        message: 'User created!',
    }));

    // Delete user and verify successful cleanup in helper.
    await deleteUserViaApiAndExpectSuccess(request, newUser);
});

test('API 13: PUT METHOD To Update User Account', async ({ request }) => {
    // Prepare existing user because update requires an account.
    const newUser = createUser();
    const response = await createUserViaApi(request, newUser);
    expect(response.status()).toBe(200);

    // Verify user was created before update.
    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
        responseCode: 201,
        message: 'User created!',
    }));

    try {
        // Send update request with full account data.
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

        // Verify API confirms that the user was updated.
        const updateUserResponseBody = await updateUserResponse.json();
        expect(updateUserResponseBody).toEqual(expect.objectContaining({
            responseCode: 200,
            message: 'User updated!',
        }));
    } finally {
        // Always clean up created user, even if update assertion fails.
        await deleteUserViaApiAndExpectSuccess(request, newUser);
    }
});

test('API 14: GET user account detail by email', async ({ request }) => {
    // Prepare user because account details are requested by email.
    const newUser = createUser();
    const response = await createUserViaApi(request, newUser);
    expect(response.status()).toBe(200);

    // Verify user was created before requesting details.
    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
        responseCode: 201,
        message: 'User created!',
    }));

    try {
        // Request account details for the created user's email.
        const getInfoResponse = await request.get('/api/getUserDetailByEmail', {
            params: {
                email: newUser.email,
            },
        });
        expect(getInfoResponse.status()).toBe(200);

        // Verify successful response and that user object is returned.
        const getInfoResponseBody = await getInfoResponse.json();
        expect(getInfoResponseBody).toEqual(expect.objectContaining({
            responseCode: 200,
            user: expect.any(Object),
        }));
    } finally {
        // Always clean up created user after the test.
        await deleteUserViaApiAndExpectSuccess(request, newUser);
    }
});
