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
var AllowedExtension = process.env.ALLOWEDEXTENSION || [".jpg", ".docx", ".png", ".txt"]
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
  var fileExtension = file.originalname.slice(file.originalname.lastIndexOf("."));
  if(AllowedExtension.indexOf(fileExtension.toLowerCase()) === -1) {
    return res.status(400)
              .json({"error":"The file extension is not supported."});
  }
  if(file.size > 625000) {
    return res.status(400)
              .json({"error":"The attachment is larger than 5Mb."})
  }
  var id = idGenerator.generator();
  var path = 'uploads/'+ id + fileExtension;
  fs.writeFile( path , file.buffer , function (err) {
    if (err) {
      return res.status(400)
                .json({"error":"The file is not uploaded."})
    }
  });
  res.status(200).json({"id":id});
}
