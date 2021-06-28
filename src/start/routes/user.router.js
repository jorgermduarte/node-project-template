const { Router }  = require('express')

let router = new Router()

const crud_library = require('../../libraries/crud-express/crud-express-mongo')
const user_model = require('../../app/models/auth/user.model').model

crud_library.Initialize(router,user_model)

module.exports = router;

