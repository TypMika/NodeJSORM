import express from "express";
import dotenv from 'dotenv';
import {Routes} from '../routes/routes.js'
import {Database} from './database.js'
import cors from 'cors';

//Inicializar el enviroment
dotenv.config();

class App {
    //Instanciamos las clases de cada uno
    app = express.application;
    routes = new Routes();
    db= new Database();

    constructor(){
        this.initializeApp();
    }

    async initializeApp(){
        this.app = express();
        this.config()
        this.routes.routes(this.app);
        await this.database()
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

    /**
     * Conexion a la base de datos
     */
    async database(){
        let connection = await this.db.connecton();
        console.log(connection.message);
    }
}

export default App = new App();

