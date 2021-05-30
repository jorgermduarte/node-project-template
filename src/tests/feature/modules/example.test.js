
let assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const server = require('../../../start/server')
const should = chai.should()

describe('[Feature/Integration Test] - Example', () => {

    //actual api test 
    describe('/', () => {
       
        it('it should ok for the main api endpoint', (done) => {
            chai.request(server)
                .get('/')
                // .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    })

    describe('/test/idrequired', () => {
        it('should return badrequest since we didnt sent an id',(done) => {
            chai.request(server)
            .get('/test/idrequired')
            // .send(user)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
        })

        it('shoud return success since we sent an id',(done) => {
            chai.request(server)
            .get('/test/idrequired?id=1')
            // .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        })
    })

    after(function(done){
        server.close()
        done()
    })

})
