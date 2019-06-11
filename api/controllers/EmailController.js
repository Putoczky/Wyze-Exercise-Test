'use strict';

var nodemailer = require('nodemailer');
var fs = require('fs');
var idGenerator = require('../helpers/idgenerator');
var mailOptions = require('../helpers/mailoptions');
var attachmenthelper = require('../helpers/attachment');

module.exports = {
  addattachment: addattachment,
  sendmail: sendmail
};

var transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
      user: "testmailputoczky@gmail.com",
      pass: "aqdkwmlqugidynww"
  }
});
var dir = './uploads';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

function sendmail(req, res){
  var emailData = req.swagger.params.maildata.value;
  var options = mailOptions.setmailoptions(emailData);
  transport.sendMail(options, (error, info) => {
    if (error) {
      return res.status(400)
                .json({"error":"Unexpected error occurred."})
    }
    console.log('Message sent: %s', info.messageId);
  });
  res.status(200).json({'message': "Email was sent."});
}

function addattachment(req, res){
  var file = req.swagger.params.file.value;
  var fileExtension = file.originalname.slice(file.originalname.lastIndexOf("."));
  var sizeinbyte = 1024 * 1024 * 5;
  if(attachmenthelper.isfilesizelessthen(file, sizeinbyte)){
    return res.status(400)
              .json({"error":"The attachment is larger than 5MB."})
  }
  if(attachmenthelper.isfiletypematch(fileExtension)){
    return res.status(415)
              .json({"error":"The file extension is not supported."});
  }
  var id = idGenerator.generator();
  var path = 'uploads/'+ id + fileExtension;
  fs.writeFileSync(path, file.buffer);

  return res.status(200).json({"id":id});
}
