'use strict';

var nodemailer = require('nodemailer');
var multer = require('multer');
var fs = require('fs');
var idGenerator = require('../helpers/idgenerator');
var mailOptions = require('../helpers/mailoptions');

module.exports = {
  attachment: attachment,
  sendmail: sendmail
};

multer({ dest: './uploads'});
var transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
      user: "testmailputoczky@gmail.com",
      pass: "aqdkwmlqugidynww"
  }
});

function sendmail(req, res){
  var emailData = req.swagger.params.maildata.value;
  var options = mailOptions.set(emailData);
  transport.sendMail(options, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
  res.status(200).json({'message': "Email was sent."});
}

function attachment(req, res){
  var file = req.swagger.params.file.value;
  if(file.size > 625000) {
    res.status(413).json({"error":"The attachment is larger than 5Mb."})
    var err = {
      message: "The attachment is larger than 5Mb."
    };
    return next(err);
  }
  var id = idGenerator.generator();
  var fileExtension = file.originalname.slice(file.originalname.lastIndexOf("."));
  var path = 'uploads/'+ id + fileExtension;
  fs.writeFile( path , file.buffer , function (err) {
    if (err) {
      debug(err);
      var err = {
        message: 'File not uploaded'
      };
      return next(err);
    }
  });
  res.status(200).json({"id":id});
}
