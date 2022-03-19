
import {userController} from "../controllers/user.controller.js"

export class Routes {
  routes(app = express.application) {


    app.get('/',(req,res)=>res.send("uwu"))
    app.post('/api/create-user',userController.createUser)
    app.post('/api/login',userController.signIn)
    app.post('/api/load-conversation',userController.loadConversation);
    app.post('/api/save-message',userController.saveConversation);


  }
}
 