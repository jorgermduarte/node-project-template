const faker = require("faker")
const MongoClient = require("mongodb").MongoClient
const Server = require('mongodb').Server

const databaseConfig = require('../../configurations/database.config').mongodb

let client = null

const database_connection = databaseConfig.connection
const database_name = databaseConfig.database_name
const collection_name = "users";

const preConnection = async (callback) => {
    client = new MongoClient(database_connection, {native_parser: true});
    try{
        await client.connect()
        console.log("database connected successfully!")
        if(client.isConnected())
            callback()
    }catch(ex){
        throw ex
    }
}

const seedDatabase = function(){ 
    preConnection( async () => { //O(n)

        //since we connected successfully to the database, lets seed it
        const collection = client.db(database_name).collection(collection_name)
        
        const createdCollections = await client.db(database_name).collections()
        if(createdCollections.map( s => s.collectionName).filter( s => s == collection_name).length >= 1){
            // The drop() command destroys all data from a collection.
            console.log(`collection with the name "${collection_name}" dropped.`)
            collection.drop();
        }
        let fakeUsers = [];

        //now lets generate the fake data
        for(var i = 0; i < 50000;i++){
            let newUser = {
                email : faker.internet.email(),
                nickname : faker.random.word(),
                password : faker.random.alphaNumeric(10),
                date_create : Date.now(),
                settings : {
                    activation_secret : faker.random.alphaNumeric(10),
                    api_secret : faker.random.alphaNumeric(10)
                }
            }
            fakeUsers.push(newUser)
        }

        console.log(`generated ${fakeUsers.length} fake users!`)
        collection.insertMany(fakeUsers).then( r => {
            console.log("Database seeded");
        })
        
        client.close()
    })
}

seedDatabase()