var fs = require('fs');

module.exports = {
    isfiletypematch: isfiletypematch,
    isfilesizelessthen: isfilesizelessthen,
    createdirectoryforattachment: createdirectoryforattachment
};
var AllowedExtension = process.env.ALLOWED_EXTENSION.split(",") || [".jpg", ".docx", ".png", ".txt"];
function isfiletypematch(fileExtension){
    return AllowedExtension.indexOf(fileExtension.toLowerCase()) === -1 ? true : false;
}

function isfilesizelessthen(file, sizeinbyte){
    return file.size > sizeinbyte ? true : false;
}

function createdirectoryforattachment(){
    var dir = './uploads';

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}