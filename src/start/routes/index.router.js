const { Router }  = require('express')

let router = new Router()

const mainController = require('../../app/controllers/index.controller')
const middlewares = require('../../app/middlewares')
const validators = require('../../app/validators/index.validator')

router.get('/',[],mainController.Index)

router.get('/test/idrequired',[
    validators.generic.id,
    middlewares.auto_validator
],mainController.Index)

module.exports = router;
