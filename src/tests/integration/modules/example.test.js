
let assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const server = require('../../../start/server')
const should = chai.should()

describe('[Feature/Integration Test] - Example', () => {

    //actual api test 
    describe('/helloworld', () => {
       
        it('it should status ok', (done) => {
            chai.request(server)
                .get('/helloworld')
                // .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    })

    after(function(done){
        server.close()
        done()
    })

})
