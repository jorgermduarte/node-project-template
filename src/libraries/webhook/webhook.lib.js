const axios = require('axios')

class webhook {

    #endpoint_target = "";
    #data = {}

    constructor(endpoint){
        this.#endpoint_target = endpoint
    }

    setData(obj){
        this.#data = obj
        return this
    }

    getEndpoint = () => this.#endpoint_target
    getData = () => this.#data

    async send(request_type = "POST"){
        try{
            let request_data = {
                method : request_type,
                url: this.#endpoint_target,
                data : this.#data
            }
            let result = await axios(request_data)
            return result
        }catch(ex){
            console.log(ex)
            return null
        }
    }



}
module.exports = webhook