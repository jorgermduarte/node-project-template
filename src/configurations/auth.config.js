module.exports = {
    session : {
        secret: 'randomsecret',
        resave: false,
        saveUninitialized: true,
        cookie: { 
            secure: false 
        }
    }
}