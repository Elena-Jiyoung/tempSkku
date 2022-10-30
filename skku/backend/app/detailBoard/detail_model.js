const config = require("../config");
var detail = module.exports;

//CREATE 새 데이터 테이블에 추가
const insertNewPostQry = 
"INSERT INTO mydb.report (title, userId, content) VALUES (?,?,?)"

//READ 첫 페이지 불러올 때 총 게시글 개수 및 10개 데이터 불러오기
const getTotalPostsNumQry = "SELECT COUNT(*) AS pageNum FROM mydb.report"
const getFirstPageQry = "SELECT * FROM mydb.report LIMIT 10 OFFSET 0;"
//READ 페이지번호에 해당하는 게시물 불러오기
const getPageNumBoardQry = "SELECT * FROM mydb.report WHERE ? <id <= ? + 10"

//UPDATE title content 수정
const updatePostQry = "UPDATE mydb.report SET title = ?, content=? WHERE id = ?"
const deletePostQry = "DELETE FROM mydb.report WHERE id=?"

//DELETE 테이블에서 받아온 id 에 해당하는 데이터 삭제
const getDetailsQry = "SELECT * FROM mydb.report WHERE id = ?"


//CREATE 새 게시글 작성
detail.writeNewPost = function writeNewPost(title, userId, content, callback) {
    config.db.query(insertNewPostQry, [title, userId, content], (err, result) => {
        if (err) callback(err, null);
        callback(null, result);
    })
} 

//READ 첫페이지 불러올 때 총 페이지 구하기 위한 총 데이터 개수
detail.getTotalPageNum = function getTotalPageNum(callback) {
    config.db.query(getTotalPostsNumQry, (err, res)=> {
        if (err) callback(err, null);

        callback(null, res);
        
    })
}
//READ 첫 페이지에 보이는 10개의 게시글 불러오기
detail.getfirstPage = function getfirstPage(callback) {
    config.db.query(getFirstPageQry, (err, result) => {
        if (err) callback(err, null);

        callback(null, result);
    }) 
}
//READ 페이지번호 받아와서 해당 게시글 불러오기
detail.getBoardPageNum = function getBoardPageNum(pageNum, callback) {
    var start = 0
    if (pageNum == 1){
        start = 0
    }
    else{
        start = ((pageNum-1) *10)
    }
    config.db.query(getPageNumBoardQry, [start, start], (err, result) => {

        if(err) callback(err, null);
        callback(null, result);
    })
}

//UPDATE 글 수정 title & content
detail.updatepost = function updatepost(id, title, content, callback) {
    config.db.query(updatePostQry, [title, content, id], (err, result) => {
        if (err) callback(err, null);
        callback(null, result);
    })
}

//DELETE 글 삭제
detail.deletepost = function deletepost(id, callback) {
    config.db.query(deletePostQry, [id], (err, result) => {
        if (err) callback(err, null);
        callback(null, result);
    })
}

//READ 게시글 디테일
detail.detailData = function detailData(id, callback) {
    config.db.query(getDetailsQry, [id], (err, result) => {
        if (err) callback(err, null);
        callback(null, result);
    })
}