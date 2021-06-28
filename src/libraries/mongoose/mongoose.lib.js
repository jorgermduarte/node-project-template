const mongoose = require('mongoose')
const database_cfg = require('../../configurations/database.config')

var settings = {
    db : null,
    is_connected : false
}

const ConnectDatabase = async function(){
    try{
        settings.db = await mongoose.connect(database_cfg.mongodb.connection,database_cfg.mongodb.options);
        console.log(`[MONGODB] - Database connection initialized sucessfully`);
        settings.is_connected = true
    }catch(err){
        console.log(`Failed to connect MongoDB : ${err}`)
        settings.is_connected = false
    }
}

const GetDatabase = () => settings.db;
const IsConnected = () => settings.is_connected
 
module.exports = { 
    Connect : ConnectDatabase,
    Get : GetDatabase,
    IsConnected : IsConnected
 };