const {Router} = require("express") ;
const indexRouter = Router()
const {formController,createController,allUsersController,findUserController} = require("../controllers/index.controller") 

indexRouter.get("/", formController)
indexRouter.post("/create", createController)
indexRouter.get("/users", allUsersController)
indexRouter.get("/users/:id", findUserController)

module.exports = indexRouter;