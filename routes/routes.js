
import {userController} from "../controllers/user.controller.js"

export class Routes {
  routes(app = express.application) {



    app.post('/api/create-user',userController.createUser)
    app.post('/api/login',userController.signIn)


  }
}
 