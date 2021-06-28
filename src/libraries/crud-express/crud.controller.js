let Mongo = require('../../app/models/auth/user.model')
const response = require('../myresponse/myresponse.lib')
var object_id = require('mongoose').Types.ObjectId;

module.exports = (dbModel) => {
    
    return {
        List : (req,res) => {

            let { limit, last_id} = req.query;
            let options_request = {}

            if(last_id && object_id.isValid(last_id)){
                options_request = {
                    _id : {
                        $gt : last_id
                    }
                }
            }
            if(limit && !isNaN(limit)){
                if(limit > 100)
                    limit = 100
                else{
                    try{
                        limit = Number.parseInt(limit)
                    }catch{
                        limit = 10
                    }
                }
                    
            }else
                limit = 10
                dbModel.find(options_request).limit(limit).exec( (err,data) => {
                if(data){
                    if(data.length == 0){
                        new response.response(req,res)
                        .Send(data,response.response_types.nodata,'No data found',response.status_types.not_found)
                    }else{
                        new response.response(req,res)
                        .Send(data,response.response_types.success,'Success',response.status_types.ok)
                    }
                }else{
                    new response.response(req,res)
                    .Send(null,response.response_types.error,`Internal server error: ${err}`,response.status_types.internal_server_error);
                }
            })
        
        },

        ViewDetails : (req,res) => {

            const {id} = req.params
    
            var target = Mongo.model.findById(id)
            .then(r => {
                if(r){
                    new response.response(req,res)
                    .Send(r,response.response_types.success,'Success',response.status_types.ok)
                }else{
                    new response.response(req,res)
                    .Send(null,response.response_types.notfound,'Not found',response.status_types.not_found);
                }
            }).catch(err => {
                new response.response(req,res)
                .BadRequest(err,'Something went wrong doing the request');
            })
        },

        Create :(req,res) => {
            const data = req.body

            if(data && typeof data === 'object'){

                const newObject =  new dbModel(data)
        
                newObject.save()
                .then( r => {
                    new response.response(req,res)
                    .Send(newObject.toObject(),response.response_types.success,"Inserted successfully",response.status_types.ok)
                })
                .catch(err => {
                    new response.response(req,res)
                    .BadRequest(err,'Invalid model provided')
                })
            
            }else{
                new response.response(req,res)
                .BadRequest(null,'Invalid model provided')
            }
            


        },
        Update : (req,res) => {

            const { id } = req.params
            const data = req.body;

            if(data && typeof data === 'object'){
                let target_update = dbModel.findById(id);

                if(target_update != null){

                    dbModel.updateOne({ _id: id},data)
                    .then( dataresult => {
                        new response.response(req,res)
                        .Send(dataresult,response.response_types.success,'Updated Sucessfully',response.status_types.ok)
                    })
                    .catch(err => {
                        new response.response(req,res)
                        .BadRequest(err,'Invalid model provided')
                    })

                }else{
                    new response.response(req,res)
                    .Send(null,response.response_types.notfound,'Not found', response.status_types.not_found)
                }

            }else{
                console.log("wut?")
                new response.response(req,res)
                .BadRequest(null,'Invalid model provided')
            }

        },
        Delete : (req,res) => {

            const { id } = req.params

            //now we need to delete the entry from the database
            dbModel.deleteOne({ _id : id}).then( r => {
                new response.response(req,res)
                .Send(true,response.response_types.success,'Deleted successfully')
            })
            .catch( err => {
                new response.response(req,res)
                .Send(err,response.response_types.invalid,`Failed to delete ${_id} `, response.status_types.bad_request)
            
            })

        }
    }
}