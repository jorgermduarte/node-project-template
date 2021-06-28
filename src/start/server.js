const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const server_configuration = require('../configurations/app.config')
const middlewares = require('../app/middlewares/index')
const MongooseConnection = require('../libraries/mongoose/mongoose.lib')

let server = express()

MongooseConnection.Connect()
server.use(helmet())
server.use(cors(server_configuration.cors))
server.disable('x-powered-by')
server.set('trust proxy', 1)

server.use(express.json())

require('./routes/definer')(server)

//serve static files
// server.use('/',express.static(__dirname + '/../public'))

server.use('*',middlewares.route_not_found)
let exportedserver = server.listen(server_configuration.port, () => console.log(`Server initialized succesfully at port ${server_configuration.port}`))

module.exports = exportedserver