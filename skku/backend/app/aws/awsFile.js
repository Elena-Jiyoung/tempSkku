const AWS = require('aws-sdk');
const aws = require("./awsKeys");
var awsFile = module.exports;

AWS.config.loadFromPath(__dirname + "/awsconfig.json")

const s3 = new AWS.S3();

awsFile.uploadFile = (filename, file) => {
    const params = {
        Bucket: aws.bucketName,
        Key: filename,
        Body: file
    };

    s3.upload(params, (err, data) => {
        if (err) console.log(err);
        else {
            console.log('file upload successful')
        }
    })
}

awsFile.downloadFile = function downloadFile(boardtype, filename, callback) {
    const params = {
        Bucket: aws.bucketName,
        Key: boardtype+ "/" + filename
    };

    s3.getObject(params, (err, data) => {
        if (err) callback(err, null);
        else {
            callback(null, data);
        }
    })
}