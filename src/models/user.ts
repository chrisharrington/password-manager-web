export default class User {
    email: string;
    firstName: string;
    lastName: string;
    key: string;

    name() {
        return this.firstName + ' ' + this.lastName;
    }
}