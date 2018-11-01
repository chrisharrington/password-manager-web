export default class Password {
    id: number;
    domain: string;
    username: string;
    password: string;

    constructor() {
        this.domain = '';
        this.username = '';
        this.password = '';
    }
}