const WebHook = require('../../libraries/webhook/webhook.lib')
const webhook_cfgs = require('../../configurations/webhooks.config')
const response = require('../../libraries/myresponse/myresponse.lib')

module.exports = {
    Index : (req,res) => {
        new response.response(req,res).Send(null,response.response_types.success,'Hello World')
    },

    TestWebhook : async (req,res) => {
        
        let webhook_test = new WebHook(webhook_cfgs.discord.url)
        .setData({
            content : 'Some text example',
            color: '#0B71EB',
            tts : false
        });

        let responsedata = await webhook_test.send()
        if(responsedata){
            new response.response(req,res).Send(null,response.response_types.success,'Webhook sent')
        }else{
            new response.response(req,res).Send(null,response.response_types.error,'Something went wrong calling the webhook',response.status_types.internal_server_error)
        }
    }
}