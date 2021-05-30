const mongoose = require('mongoose')

const Schema = mongoose.Schema;
let UserSchema = new Schema({
    email : { type: String, required : true},
    password : { type: String , required: true},
    avatar : { type: String },
    nickname : { type : String, required : true },
    date_create  : { type: Date, required: true },
    date_update :  { type: Date },
    settings : {
        activation_secret : { type: String, required: true }, //used to activate the account via email
        api_secret : { type: String, required: true } // used to consume our public api
    },
    active : { type: Boolean, default: true },
    deleted : { type: Boolean, default: false },
});

// specify the transform schema option
if (!UserSchema.options.toObject) UserSchema.options.toObject = {};
UserSchema.options.toObject.transform = function (doc, ret, options) {
    delete ret.password;
    delete ret.date_create;
    delete ret.date_update;
    delete ret.active;
    delete ret.deleted;
    return ret;
}


const UserModel = mongoose.model('User',UserSchema);

module.exports = {
    schema : UserSchema,
    model : UserModel
}


