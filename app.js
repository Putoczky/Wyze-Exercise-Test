'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var rateLimit = require("express-rate-limit");

module.exports = app; // for testing

var config = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers: {
    api_key: function (scopesOrApiKey, cb) {
      // your security code
      if ('1234' === scopesOrApiKey) {
        cb();
      } else {
        cb(new Error('Access denied!'));
      }
    }
  }
};

var limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10
});

app.use(limiter);

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 5000;
  app.listen(port);
  
  console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello');
});