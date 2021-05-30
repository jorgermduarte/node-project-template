const { response_types , status_types , response } = require('../../libraries/myresponse/myresponse.lib')
module.exports = (req,res,next) => new response(req,res).Send(null,response_types.notfound,"Route not found",status_types.not_found)
