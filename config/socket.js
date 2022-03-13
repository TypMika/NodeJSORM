import  {Server} from "socket.io";
import  {UserModel} from "../models/user.model.js";

const io = new Server();
export class SocketIo{

    startSocket(server){
        this.io = new Server(server,{cors:{
            origin:"*",methods: ["GET","POST"]
        }});

        const users = {}

        this.io.on('connection',(socket)=>{

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