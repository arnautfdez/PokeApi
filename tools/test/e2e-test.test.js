const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../../app').app;

describe('Suite de prueba e2 para el curso', () => {
    it('should return hello world', (done) => {
        chai.request(app) // decimos a chai que utilize el servidor app
            .get('/')
            .end((err, res) => {
                chai.assert.equal(res.text, "Hello World!")
                done();
            });
    });
});