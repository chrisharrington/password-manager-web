import * as Communication from '../communication';
import * as Config from 'config.json';
import Password from 'models/password';

class PasswordService {
    async get(search: string, page: Number, count: Number) {
        return await Communication.get(`${Config.api}/passwords?search=${search}&page=${page}&count=${count}`);
    }

    async upsert(password: Password) {
        return await Communication.post(`${Config.api}/passwords`, password);
    }
}

export default new PasswordService();