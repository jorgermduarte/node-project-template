
let Middlewares = require('../../app/middlewares/index')
let Validators = require('../../app/validators/index.validator')

const initialize = (router,dbModel) => {

    let crud_controller = require('./crud.controller')(dbModel)
    
    router
    .route('/')
    .get(crud_controller.List)

    router
    .route('/:id')
    .get([
            Validators.generic._id,
            Middlewares.auto_validator,
        ],crud_controller.ViewDetails
    )

    router
    .route('/')
    .post(crud_controller.Create)

    router
    .route('/:id')
    .put([
            Validators.generic._id,
            Middlewares.auto_validator,
        ],crud_controller.Update
    )

    router
    .route('/:id')
    .delete([
        Validators.generic._id,
        Middlewares.auto_validator,
    ],crud_controller.Delete)
    
    
}

module.exports = {
  Initialize : initialize
}