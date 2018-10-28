import * as Communication from '../communication';
import * as Config from 'config.json';

class PasswordService {
    async get() {
        return await Communication.get(`${Config.api}/passwords`);
    }
}

export default new PasswordService();