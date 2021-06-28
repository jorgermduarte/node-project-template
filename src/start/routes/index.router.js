const { Router }  = require('express')

let router = new Router()
const main_controller = require('../../app/controllers/index.controller')


router.get('/helloworld',[],main_controller.Index)
router.get('/webhook',main_controller.TestWebhook)


module.exports = router;
