import User from 'models/user';

const user = new User();
user.firstName = 'Chris';
user.lastName = 'Harrington';
user.email = 'chrisharrington99@gmail.com';

class UserService {
    async signIn(username: string, password: string, rememberEmail: boolean) : Promise<User> {
        return Promise.resolve(user);
    }

    async get(token: string) : Promise<User> {
        return Promise.resolve(user);
    }
}

export default new UserService();