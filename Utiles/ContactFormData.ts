export type ContactFormData = {
    name: string,
    email: string,
    subjectText: string,
    yourMessageText: string,
    attachFilePath: string,
}



export const contactFormData: ContactFormData = {
    name: 'Maja',
    email: 'MajaStrikker@gmail.com',
    subjectText: 'Lorem Lorem',
    yourMessageText: 'Lorem lorem lorem',
    attachFilePath: './tests/test-data/contact-us-test-data.txt',
    
}