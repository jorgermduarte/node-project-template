const response_types = {
    success : 1,
    nodata : 2,
    duplicated : 3,
    invalid : 4,
    error : 5,
    notfound : 6,
    unauthorized : 7
}

const status_types = {
   ok : 200,
   bad_request : 400,
   unauthorized : 401,
   not_found : 404,
   internal_server_error : 500,
   service_unavailable : 503
}

class Response{

    #_req = null;
    #_res = null;

    obj = {
        status_type : status_types.ok,
        response_type : response_types.success,
        message : "",
        result : null
    }

    constructor(req,res){
        this.#_req = req;
        this.#_res = res;
    }

    Send(result = null,response_type = null,message = null,status_type = null){
        let r = Object.create(this.obj)
        if(response_type) r.response_type = response_type;
        if(result) r.result = result;
        if(message) r.message = message;
        if(status_type) r.status_type = status_type;

        if(status_type == status_types.bad_request){
            delete r.result;
            r.errors = result.errors;
        }


        this.#_res.status(r.status_type).send(r)
    }


}

module.exports = {
    response_types : response_types,
    status_types : status_types,
    response : Response
}