var router = require("express").Router();
var awsFile = require("../aws/awsFile")
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file was uploaded.');
    }
    awsFile.uploadFile(req.file.originalname, req.file.buffer)
    res.send('File received successfully.');
});

router.post('/download', (req, res) => {
    console.log(req.body)
    if (!req.body.filename) {
        return res.status(400).send('No such file.');
    }
    awsFile.downloadFile(req.body.boardname, req.body.filename, (err, file) => {
        console.log(file)
        if (err) {
            console.log(err)
            res.send({ errMsg: "Error on downloading file" })
        }
        else {
            res.send(file)
        }
    })
})

module.exports = router;
