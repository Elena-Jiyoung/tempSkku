const express = require('express');
const multer = require('multer');
const filesController = require('./filesController');

const {receiveFiles} = filesController;

const router = express.Router();

router.route('/upload').post(
    multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 }})
    .array('file'),
    receiveFiles
    );



module.exports = router;
