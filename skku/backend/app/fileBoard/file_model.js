var fileBoard = module.exports;
const config = require("../config");

const getPageQry = "SELECT COUNT (*) AS pageNum FROM mydb.book"

//처음 bookboard 열었을때 
const getBookQry = "SELECT * FROM mydb.book LIMIT 10 OFFSET 0";

//pageNum 받았을 때 table에서 받아오기
const getBookPageQry = "SELECT * FROM mydb.book LIMIT 10 OFFSET ?";

//book 정보 받으면 table 에 추가
const insertBookQry = 
    "INSERT INTO mydb.book  VALUES ( null, ?, ?, ?, NOW(), 0, 1)";

//받은 id에 해당하는 row 수정
const updateBookQry = 
    "UPDATE mydb.book SET title = ?, filename = ?, file = ?, uploadDate = NOW() " +
    "WHERE id = ?";

//받은 id에 해당하는 row 삭제
const deleteBookQry = "DELETE FROM mydb.book WHERE id=?";

//받은 id에 해당하는 file 반환
const getBookFileQry = "SELECT file FROM mydb.book WHERE id=?";


fileBoard.getPageNum = function getPageNum(callback){
    config.db.query(getBookPageQry, (err,result) => {
        if(err) callback(err,null);

        callback(null, result);
    });
}

fileBoard.getBook = function getBook(callback) {
    config.db.query(getBookQry, (err, result) => {
        if (err) callback(err, null);

        callback(null, result);
    });
}   

fileBoard.getBookPage = function getBookPage(pageNum, callback){
    var start = 0
    if (pageNum == 1){
        start = 0
    }
    else{
        start = ((pageNum-1) *10)
    }
    config.db.query(getBookPageQry, start, (err, result) => {
        if (err) callback(err,null);
        callback(null, result);
    });
}

fileBoard.insertBook = function insertBook(title, filename, file, callback) {
    const info = [title, filename, file];
    config.db.query(insertBookQry, info, (err, result) => {
        if (err) callback(err, null);

        callback(null, result);
    });
}

fileBoard.updateBook = function updateBook(id, title, filename, file, callback){
    const info = [title, filename, file, id];
    config.db.query(updateBookQry, info, (err, result) => {
        if (err) callback(err, null);

        callback(null, result);
    });
    
}

fileBoard.deleteBook = function deleteBook(id, callback) {
    config.db.query(deleteBookQry, id, (err, result) => {
        if (err) callback(err, null);

        callback(null, result);
    });
}

fileBoard.getBookFile = function getBookFile( id, callback){
    config.db.query(getBookFileQry, id, (err, result) => {
        if (err) callback(err, null);

        callback(null, result);
    });
}
