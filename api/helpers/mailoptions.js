var fs = require('fs');
var nodemailer = require('nodemailer');

module.exports = {
    setmailoptions: setmailoptions,
    gettransport: gettransport
};

function gettransport(){
    return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "testmailputoczky@gmail.com",
            pass: "aqdkwmlqugidynww"
        }
      });
}
function setmailoptions(emailData) {
    var att = [];
    fs.readdirSync('uploads/').forEach(element => {
        if(emailData.attachmentIds.indexOf(element.slice(0, element.lastIndexOf("."))) > -1){
            att.push({
                path: 'uploads/' + element
            });
        }
    });
    return mailOptions = {
        from: process.env.FROM || 'testmailputoczky@gmail.com',
        to: emailData.to.join(","),
        cc: emailData.cc.join(","),
        subject: emailData.subject,
        text: emailData.text,
        html: emailData.html,
        attachments: att
      }
}