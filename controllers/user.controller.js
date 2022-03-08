import {UserModel} from '../models/user.model.js'
class UserController{


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

    async createUser(request,response){
      
        try {
            const users = await UserModel.create(request.body)
            return response.status(200).json({
                ok:true,
                data:users,
                message: "User created correctly"
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