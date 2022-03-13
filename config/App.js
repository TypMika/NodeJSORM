import express from "express";
import dotenv from 'dotenv';
import {Routes} from '../routes/routes.js'
import {Database} from './database.js'
import cors from 'cors';
import http from 'http';
import {SocketIo} from "./socket.js";
dotenv.config();

class App {
    app = express.application;
    routes = new Routes();
    db= new Database();
    server = null;
    socket = new SocketIo;
    constructor(){

        this.app = express();
        this.initializeApp();
        this.server= http.createServer(this.app);
        this.socket.startSocket(this.server);
    }
    async initializeApp(){
        this.config();
        this.routes.routes(this.app);
        await this.database();

    }
    config(){
        this.app.use(cors({origin:"*"}));
        this.app.use(
            express.urlencoded({
                extended:true
            })
        );
        this.app.use(express.json())
    }
    async database(){
        let connection = await this.db.connecton();
        console.log(connection.message);
    }
}

export default App = new App();

