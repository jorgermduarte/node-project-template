const mailgunjs = require("mailgun-js")

class MailGun {
    mailgun = null
    transporter = null
    from = "noreply@example.pt"

    MailGun(_transporter){
        this.transporter = transporter
        this["__#49650@#Init"]
    }

    #Init(){
        this.mailgun = mailgunjs(this.transporter)
    }

    Send(email,subject,html, callback){
        if(this.mailgun){
            let emaildata = { from : this.from, to : email, subject : subject, html : html }
            this.mailgun.messages().send(emaildata,callback)
        }
    }

    Send(email, subject,html){
        return new Promise((resolve,reject) => {
            if(this.mailgun){
                let emaildata = { from : this.from, to : email, subject : subject, html : html }
                this.mailgun.messages().send(emaildata,function(error,r){
                    if(error)
                        reject(error)
                    else
                        resolve(r)
                })
            }
        })
    }


}

module.exports = MailGun;