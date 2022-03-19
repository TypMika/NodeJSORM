import  {Server, Socket} from "socket.io";
import  {UserModel} from "../models/user.model.js";
import  {MessageModel} from "../models/message.model.js";

const io = new Server();
export class SocketIo{

    startSocket(server){
        this.io = new Server(server,{cors:{
            origin:"*",methods: ["GET","POST"]
        }});

        const users = {}

        this.io.on('connection',(socket)=>{

            console.log("User connected");

            // socket.on('chat message', (data) => {
            //     console.log("MENSAJE RECIBIDO")
            //     this.io.emit('chat message', data);
            // });

            socket.on('messageSent',async (data)=>{
                const msgs = await MessageModel.findAll({where:{conversation_uuid: data.uuidMessage}});
                console.log("Enviando observable a "+data.userSocket)
                socket.to(data.userSocket).emit("msg-received",msgs);
            })

            socket.on('login', async (user)=>{
                const data = socket.id;
                console.log(data)
                await UserModel.update(
                    {socket_id: data,online:true},
                    {where: {id: user.id}, logging:console.log
                });
                const onlineUsers = await UserModel.findAll({where:{online:true}});

                this.io.emit('new-user-online',onlineUsers);
            });

            socket.on('disconnect',async ()=> {
                console.log("User disconnected")
                await UserModel.update(
                    {socket_id: socket.id,online:false},
                    {where: {socket_id: socket.id}

                });
                const onlineUsers = await UserModel.findAll({where:{online:true}});
                this.io.emit('new-user-online',onlineUsers);
            })
        })
    }
}