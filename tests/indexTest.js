// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
let app  = require('../app');
// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Index", () => {
    describe("GET /", () => {
        // Test to get all students record
        it("should get homepage", (done) => {
             chai.request(app)
                 .get('/')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
        
    });
});