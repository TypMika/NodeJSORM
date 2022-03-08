import express from "express";
import {userController} from "../controllers/user.controller.js"

export class Routes {
  routes(app = express.application) {



    app.post('/api/create-user',userController.createUser)


  }
}
 