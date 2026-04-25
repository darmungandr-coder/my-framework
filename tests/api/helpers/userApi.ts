import { APIRequestContext } from "@playwright/test"
import { User } from "../../../Utiles/userFactory"

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
            }
        })
}