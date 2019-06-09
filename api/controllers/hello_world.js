'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');
var nodemailer = require('nodemailer');
var multer = require('multer');
var fs = require('fs');
var idGenerator = require('../helpers/idgenerator')


/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  hello: hello,
  attachment: attachment
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
var transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
      user: "testmailputoczky@gmail.com",
      pass: "aqdkwmlqugidynww"
  }
});
var mailOptions = {
  from: 'testmailputoczky@gmail.com',
  to: 'david.putoczky@gmail.com',
  subject: 'Welcome Email'
};

var ids = new Array();

multer({ dest: './uploads'});
function hello(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var hello = util.format('Hello, Dávid',);
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
  res.json(hello);
}

function attachment(req, res){
  var file = req.swagger.params.file.value;
  var path = 'uploads/';
  var id = idGenerator.generator();
  var fileExtension = file.originalname.slice(file.originalname.lastIndexOf("."));
  fs.writeFile( path + id + fileExtension, file.buffer , function (err) {
    if (err) {
      debug(err);
      var err = {
        message: 'File not uploaded'
      };
      return next(err);
    }
  });
}
