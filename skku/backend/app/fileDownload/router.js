var router = require("express").Router();
var awsFile = require("../aws/awsFile")

function fileDownload(req, res) {
    console.log(req.body)
    const boardtype = req.body.boardtype
    const filename = req.body.filename

    awsFile.downloadFile(boardtype, filename, (err, file) => {
        console.log(file)
        if (err) {
            console.log(err)
            res.send({ errMsg: "Error on downloading file" })
        }
        else {
            res.send(file)
        }
    })
    
}

router.post('/downloadFile', fileDownload);
module.exports = router;