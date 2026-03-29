export type User = {
    name: string;
    email: string;
    password: string;
    dateOfBirth: string;
    monthOfBirth: string;
    yearOfBirth: string;
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    mobilePhone: string;
};

export const user: User = {
    name: 'Daniil',
    email: 'Daniil@gmail.com',
    password: '554478896',
    dateOfBirth: '5',
    monthOfBirth: '6',
    yearOfBirth: '1997',
    firstName: 'Daniil',
    lastName: 'Gladkiy',
    company: 'Frelance',
    address1: 'Address1',
    address2: 'Address2',
    country: 'Canada',
    state: 'Illinois',
    city: 'Chicago',
    zipCode: '60654',
    mobilePhone: '962461838'
};


export function createUser(): User {
    const uniqueId = Date.now();
    return {
        name: `Daniil${uniqueId}`,
        email: `Daniil${uniqueId}@gmail.com`,
        password: '554478896',
        dateOfBirth: '5',
        monthOfBirth: '6',
        yearOfBirth: '1997',
        firstName: 'Daniil',
        lastName: 'Gladkiy',
        company: 'Canada',
        address1: 'Address1',
        address2: 'Address2',
        country: 'Canada',
        state: 'Illinois',
        city: 'Chicago',
        zipCode: '60654',
        mobilePhone: '962461838'
    };
}