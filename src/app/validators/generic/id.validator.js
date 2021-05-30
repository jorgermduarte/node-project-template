const { check } = require('express-validator')

module.exports = [
    check('id').isNumeric()
]