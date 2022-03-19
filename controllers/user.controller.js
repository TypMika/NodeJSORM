
import {UserModel} from '../models/user.model.js'
import {ConversationModel} from "../models/conversation.model.js";
import  {MessageModel} from "../models/message.model.js";
import { v4 as uuidv4 } from 'uuid';
import {flatten} from "express/lib/utils.js";

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
        ///this part I don't understand it at all
    async loadConversation(request,response){
        const  body = request.body;
        const sender = body.sender;
        const receiver = body.receiver;
        const uuid = uuidv4();

        const fromSender = await  ConversationModel.findOne({where:{from_id:sender,to_id:receiver}});
        const fromReceiver = await  ConversationModel.findOne({where:{from_id:receiver,to_id:sender}});
        let msg = null

        if(fromSender === null && fromReceiver !== null){
            const conv = await ConversationModel.create({from_id:sender, to_id:receiver,uuid:fromReceiver.uuid});
            const msgs = await MessageModel.findAll({where:{conversation_uuid: conv.uuid}});
            return   response.status(200).json({
                ok:true, data:msgs, uuid: conv.uuid
            });
        } else if(fromReceiver === null && fromSender !== null ){
            const conv = await ConversationModel.create({from_id:sender, to_id:receiver,uuid:fromSender.uuid});
            const msgs = await MessageModel.findAll({where:{conversation_uuid: conv.uuid}});

            return   response.status(200).json({
                ok:true, data:msgs , uuid: conv.uuid
            });
        } else if(fromSender == null && fromReceiver == null) {
            const conv = await ConversationModel.create({from_id:sender, to_id:receiver,uuid:uuid});
            return   response.status(200).json({
                ok:false, data:null
            });
        } else if (fromReceiver != null && fromSender !== null){

            const msgs = await MessageModel.findAll({where:{conversation_uuid: fromSender.uuid}});
            return response.status(200).json({ok:true,data:msgs, uuid:fromSender.uuid});
        }


    }

    async saveConversation(request,response){

        const body = request.body;
        const msg = await MessageModel.create(body);

        if(msg){
            return response.status(200).json({ok:true, data:msg});
        } else {
            return response.status(400).json({ok:false, data:null});
        }
    }

    
}


export const userController = new UserController();