import UserService from "../services/UserService.js";

class UserController {
    async createUser(req, res) {
        try {
            const user = await UserService.create(req.body)
            
            // return user;
            res.json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    //переименовать в проверку пользователей
    async getUsers(req, res) {
        console.log('query',req.query.name)
        try {
            const users = await UserService.getAll()
            console.log(users)
            //функция поиска пользователя и пароля
             //логин и пароль я передаю через query
            let result = await users.filter(user => user.name === req.query.name && user.password === req.query.password);
            console.log('result', result)
            if (result[0]) {
                res.json(result[0]);
            } else {
                res.json({userExist: true});
            } 


        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new UserController();