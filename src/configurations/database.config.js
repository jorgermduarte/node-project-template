module.exports = {
    mongodb : {
        connection : `mongodb://localhost:27017/${ process.env.DATABASE || "default-project-template" }`,
        options : {
            useUnifiedTopology: true,
            useNewUrlParser : true
        }
    }
}