const chai = require('chai');
const { expect } = require('chai');
const should = chai.should();

const { model , schema } = require('../../../app/models/auth/user.model')

describe('[Unit Tests] - Auth Model', () => {

    describe('User Model', () => {
        it('it should not return the password from the user object', () => {
            
            let test = new model({
                email : 'jorge_duarte@outlook.pt',
                password : '123456',
                settings : {
                    activation_secret : '123456',
                    api_secret : '654321'
                },
                nickname : 'Duarte',
                date_create : Date.now()
            })

            let userObject = test.toObject()
            should.equal(userObject.password,undefined)

    })
    })
    

})