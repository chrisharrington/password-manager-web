export default class Password {
    _id: string;
    domain: string;
    username: string;
    password: string;

    constructor() {
        this._id = '';
        this.domain = '';
        this.username = '';
        this.password = '';
    }
}