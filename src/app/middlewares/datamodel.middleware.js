const { check, oneOf, validationResult } = require('express-validator');
const { response_types , status_types , response } = require('../../libraries/myresponse/myresponse.lib')

module.exports = function(req,res,next){
    const errors = validationResult(req)
    if (errors.isEmpty())
        next()
    else
        new response(req,res).Send(errors,response_types.invalid,"Failed to validate the model",status_types.bad_request)
}