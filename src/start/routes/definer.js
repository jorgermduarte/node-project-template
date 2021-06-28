module.exports = (server) => {
    server.use('/',require('./index.router'))
    server.use('/user',require('./user.router'))
}