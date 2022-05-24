import User from "../models/User.js";

class UserService {
    async create(user) {
        const createUser = await User.create(user);
        console.log('createdUser', createUser._id)
        return createUser;
    }

    async getAll() {
        const users = await User.find();
        return users;
    }
}

export default new UserService();