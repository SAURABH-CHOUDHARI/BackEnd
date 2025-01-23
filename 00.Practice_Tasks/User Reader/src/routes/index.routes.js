const {Router} = require("express") ;
const indexRouter = Router()
const {formController,createController,allUsersController,findUserController,deleteController} = require("../controllers/index.controller") 

indexRouter.get("/", formController)
indexRouter.post("/create", createController)
indexRouter.get("/users", allUsersController)
indexRouter.get("/users/:id", findUserController)
indexRouter.post("/delete", deleteController)

module.exports = indexRouter;