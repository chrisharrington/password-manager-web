export default class User {
    email: string;
    firstName: string;
    lastName: string;

    name() {
        return this.firstName + ' ' + this.lastName;
    }
}