var fs = require('fs');
module.exports = {
    setmailoptions: setmailoptions
};

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
        html: emailData.html,
        attachments: att
      }
}