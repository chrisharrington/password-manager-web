import * as Communication from '../communication';
import * as Config from 'config.json';

class PasswordService {
    async get(search: string, page: Number, count: Number) {
        return await Communication.get(`${Config.api}/passwords?search=${search}&page=${page}&count=${count}`);
    }
}

export default new PasswordService();