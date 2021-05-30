require('dotenv').config()

module.exports = {
    cors : {
        origin: "*",
        methods: "OPTIONS,GET,POST,PUT,DELETE",
        allowedHeaders : [ 'Content-Type', 'Content','Authorization'],
        preflightContinue: false,
        optionsSuccessStatus: 204
    },
    port : process.env.PORT || 3000,
}