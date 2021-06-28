
var object_id = require('mongoose').Types.ObjectId;
let { param, checkSchema  } = require('express-validator')
module.exports = param('id').custom((value, { req }) => {
    if(!object_id.isValid(value))
        throw new Error('Invalid object-id provided');
    else
        return true;
  })