import User from 'models/user';

import * as Communication from 'data/communication';

import Config from 'config.json';

const user = new User();
user.firstName = 'Chris';
user.lastName = 'Harrington';
user.email = 'chrisharrington99@gmail.com';

class UserService {
    async signIn(email: string, password: string, rememberEmail: boolean) : Promise<User> {
        let response = await Communication.post(`${Config.api}/users`, { email, password });
        return await response.json() as User;
    }

    async get(token: string) : Promise<User> {
        throw 'Not implemented';
    }
}

export default new UserService();