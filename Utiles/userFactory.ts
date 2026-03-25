export function createUser(){
    const timeStamp = Date.now()
    const name :string= `Daniel ${timeStamp}`;
    const email :string = `Daniel${timeStamp}@gmail.com`;
    const password : string = `554478896${timeStamp}`;
    return {
        name,
        email,
        password
    }
}