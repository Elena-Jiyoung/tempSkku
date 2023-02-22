var fileBoard = module.exports;
const config = require("../config");

const getPageQry = "SELECT COUNT (*) AS pageNum FROM mydb."

//처음 bookboard 열었을때 
const getBookQry1 = "SELECT * FROM mydb."
const getBookQry2 = " LIMIT 10 OFFSET 0";

//pageNum 받았을 때 table에서 받아오기
const getBookPageQry1 = "SELECT * FROM mydb."
const getBookPageQry2 = " LIMIT 10 OFFSET ?";

//book 정보 받으면 table 에 추가
const insertBookQry1 = 
    "INSERT INTO mydb."
const insertBookQry2 =
    " (title, filename, file, uploadDate, downloadNum, userId)" +
    " VALUES ( ?, ?, ?, NOW(), 0, ?)";

//받은 id에 해당하는 row 수정
const updateBookQry1 = 
    "UPDATE mydb." 
const updateBookQry2 = 
    " SET title = ?, filename = ?, file = ?, uploadDate = NOW()" +
    "WHERE id = ?";

//받은 id에 해당하는 row 삭제
const deleteBookQry1 = "DELETE FROM mydb." 
const deleteBookQry2 = " WHERE id=?";

//받은 id에 해당하는 file 반환
const getBookFileQry1 = "SELECT file FROM mydb."
const getBookFileQry2 = " WHERE id=?";


fileBoard.getPageNum = function getPageNum(boardtype, callback){
    config.db.query(getPageQry + boardtype, (err,result) => {
        if(err) callback(err,null);

        callback(null, result);
    });
}

fileBoard.getBook = function getBook(boardtype, callback) {
    config.db.query(getBookQry1 + boardtype + getBookQry2, (err, result) => {
        if (err) callback(err, null);

        callback(null, result);
    });
}   

fileBoard.getBookPage = function getBookPage(boardtype, pageNum, callback){
    var start = 0
    if (pageNum == 1){
        start = 0
    }
    else{
        start = ((pageNum-1) *10)
    }
    config.db.query(getBookPageQry1 + boardtype + getBookPageQry2, start, (err, result) => {
        // console.log(pageNum);
        // console.log(result);
        if (err) callback(err,null);
        callback(null, result);
    });
}

fileBoard.insertBook = function insertBook(boardtype, title, filename, file, userId, callback) {
    const info = [title, filename, file, userId];
    config.db.query(insertBookQry1 + boardtype + insertBookQry2, info, (err, result) => {
        if (err) callback(err, null);

        callback(null, err);
    });
}

fileBoard.updateBook = function updateBook(boardtype, id, title, filename, file, callback){
    const info = [title, filename, file, id];
    config.db.query(updateBookQry1 + boardtype + updateBookQry2, info, (err, result) => {
        if (err) callback(err, null);

        callback(null, err);
    });
    
}

fileBoard.deleteBook = function deleteBook(boardtype, id, callback) {
    config.db.query(deleteBookQry1+ boardtype + deleteBookQry2, id, (err, result) => {
        if (err) callback(err, null);

        callback(null, result);
    });
}

fileBoard.getBookFile = function getBookFile(boardtype, id, callback){
    config.db.query(getBookFileQry1+ boardtype + getBookFileQry2, id, (err, result) => {
        if (err) callback(err, null);

        callback(null, result);
    });
}
