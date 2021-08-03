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
   not_implemented : 501,
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
        if(status_type)
            r.status_type = status_type;
        else
            r.status_type = status_types.ok;

        if(r.status_type == status_types.bad_request){
            delete r.result;
            if(result?.errors)
                r.errors = result.errors;
            else
                r.errors = result;
        }
        
        this.#_res.status(r.status_type).send(r)
    }

    Unauthorized(message = ""){
        let r = Object.create(this.obj)
        r.response_type = response_types.unauthorized
        r.message = message
        r.status_type = status_types.unauthorized
        this.#_res.status(r.status_type).send(r)
    }

    Success(result,message){
        let r = Object.create(this.obj)
        r.response_type = response_types.success;
        r.status_type = status_types.ok;

        if(result) r.result = result;
        if(message) r.message = message;
        
        this.#_res.status(r.status_type).send(r)
    }

    Error(message){
        let r = Object.create(this.obj)
        r.response_type = response_types.error
        r.message = message
        r.status_type = status_types.internal_server_error
        this.#_res.status(r.status_type).send(r)        
    }

    NotImplemented(){
        let r = Object.create(this.obj)
        r.response_type = response_types.error
        r.message = "Method not implemented"
        r.status_type = status_types.not_implemented
        this.#_res.status(r.status_type).send(r)
    }

    BadRequest(errors = {},message = ""){
        let r = Object.create(this.obj);
        r.status_type = status_types.bad_request;
        r.message = message;
        r.response_type =  response_types.invalid;
        delete r.result

        if(errors){
            if(errors.errors)
                r.errors = errors.errors;
            else
                r.errors = errors
        }else{
            r.errors = {}
        }
        
        this.#_res.status(r.status_type).send(r)
    }

}

module.exports = {
    response_types : response_types,
    status_types : status_types,
    response : Response
}