var fs = require('fs');

module.exports = {
    isfiletypematch: isfiletypematch,
    checkfilesize: checkfilesize,
};
var AllowedExtension = process.env.ALLOWED_EXTENSION || [".jpg", ".docx", ".png", ".txt"]
function isfiletypematch(fileExtension){
    if(AllowedExtension.indexOf(fileExtension.toLowerCase()) === -1) {
        return true;
    }else {
        return false;
    }
}

function isfilesizelessthen(file, sizeinbyte){
    if(file.size > sizeinbyte) {
        return true;
    }else{
        return false;
    }
}