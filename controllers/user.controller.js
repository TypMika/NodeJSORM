
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

    async signIn(request,response){
      
        try { 
            const user = await UserModel.findOne({where: {
                email: request.body.email
            } })

            if(user){
                if (await request.body.password === await user.password){
                    response.status(200).json({
                        ok:true,
                        message: 'User logged correctly',
                        user: user
                    })
                }else{
                    response.json({
                        error: 'Error en usuario o contrasenassssssssssss'
                    })
                }
            }else{
                response.json({
                    error: 'Error en usuario o contrasena'
                })
            }
            
        } catch (e){
            return response.status(500).json({
                ok:false,
                error: e
            });
        }
    }

    
}


export const userController = new UserController();