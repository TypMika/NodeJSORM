import {UserModel} from '../models/user.model.js'
class UserController{
    async sayHello(request,response){
        return response.status(200).json({
            ok:true,
            message: 'Hello'
        });
    }

    async sayHolaMundo(request,response){
        return response.status(200).json({
            ok:true,
            message: 'Hola mundo'
        });
    }

    async getUsers(request,response){

        try {
            const users = await UserModel.findAll()
            return response.status(200).json({
                ok:true,
                data:users
            })
        } catch (e){
            return response.status(500).json({
                ok:false,
                error: e
            });
        }
    }
}


export const userController = new UserController();