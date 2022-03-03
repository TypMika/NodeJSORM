import express from "express";
import {userController} from "../controllers/user.controller.js"

export class Routes {
  routes(app = express.application) {


    app.get('/e',userController.sayHello)
    app.get('/data',userController.sayHolaMundo)
    app.get('/',userController.getUsers)

  }
}
 