const config = require("../config");
var detail = module.exports;

//CREATE 새 데이터 테이블에 추가
const insertNewPostQry1 = 
"INSERT INTO mydb."
const insertNewPostQry2 = " (title, userId, content) VALUES (?,?,?)"

//READ 첫 페이지 불러올 때 총 게시글 개수 및 10개 데이터 불러오기
const getTotalPostsNumQry = "SELECT COUNT(*) AS pageNum FROM mydb."
const getFirstPageQry1 = "SELECT * FROM mydb." 
const getFirstPageQry2 = " LIMIT 10 OFFSET 0;"
//READ 페이지번호에 해당하는 게시물 불러오기
const getPageNumBoardQry1 = "SELECT * FROM mydb."
const getPageNumBoardQry2 = " WHERE ? <id <= ? + 10;"

//UPDATE title content 수정
const updatePostQry1 = "UPDATE mydb." 
const updatePostQry2 = " SET title = ?, content=? WHERE id = ?"
const deletePostQry1 = "DELETE FROM mydb."
const deletePostQry2 =  " WHERE id=?"

//DELETE 테이블에서 받아온 id 에 해당하는 데이터 삭제
const getDetailsQry1 = "SELECT * FROM mydb."
const getDetailsQry2 = " WHERE id = ?"


//CREATE 새 게시글 작성
detail.writeNewPost = function writeNewPost(boardtype, title, userId, content, callback) {
    config.db.query(insertNewPostQry1+ boardtype + insertNewPostQry2, [title, userId, content], (err, result) => {
        if (err) callback(err, null);
        callback(null, result);
    })
} 

//READ 첫페이지 불러올 때 총 페이지 구하기 위한 총 데이터 개수
detail.getTotalPageNum = function getTotalPageNum(boardtype, callback) {
    config.db.query(getTotalPostsNumQry+ boardtype, (err, res)=> {
        if (err) callback(err, null);

        callback(null, res);
        
    })
}
//READ 첫 페이지에 보이는 10개의 게시글 불러오기
detail.getfirstPage = function getfirstPage(boardtype, callback) {
    config.db.query(getFirstPageQry1 + boardtype + getFirstPageQry2, (err, result) => {
        if (err) callback(err, null);

        callback(null, result);
    }) 
}
//READ 페이지번호 받아와서 해당 게시글 불러오기
detail.getBoardPageNum = function getBoardPageNum(boardtype, pageNum, callback) {
    var start = 0
    if (pageNum == 1){
        start = 0
    }
    else{
        start = ((pageNum-1) *10)
    }
    config.db.query(getPageNumBoardQry1 + boardtype + getPageNumBoardQry2, [start, start], (err, result) => {

        if(err) callback(err, null);
        callback(null, result);
    })
}

//UPDATE 글 수정 title & content
detail.updatepost = function updatepost(boardtype, id, title, content, callback) {
    config.db.query(updatePostQry1 + boardtype + updatePostQry2, [title, content, id], (err, result) => {
        if (err) callback(err, null);
        callback(null, result);
    })
}

//DELETE 글 삭제
detail.deletepost = function deletepost(boardtype, id, callback) {
    config.db.query(deletePostQry1 + boardtype + deletePostQry2, id, (err, result) => {
        if (err) callback(err, null);
        callback(null, result);
    })
}

//READ 게시글 디테일
detail.detailData = function detailData(boardtype, id, callback) {
    config.db.query(getDetailsQry1 + boardtype + getDetailsQry2, id, (err, result) => {
        if (err) callback(err, null);
        callback(null, result);
    })
}