const bodyParser = require('body-parser');
const authmiddleware =  require('./tools/auth-middleware');

const setupMiddlewares = (app) => {
    app.use(bodyParser.json());
    authmiddleware.init();
    app.use(authmiddleware.protectWithJwt);
}

exports.setupMiddlewares = setupMiddlewares;