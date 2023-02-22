var router = require("express").Router();
var detail = require("./detail_model");

//CREATE
function writeNewPost (req, res) {
    const boardtype = req.body.boardtype;
    const title = req.body.title;
    const userId = req.body.userId; //관리자 로그인 이메일(아이디) 인풋으로 받아오기
    const content = req.body.content;
    detail.writeNewPost(boardtype, title, userId, content, (err, result)=> {
        if (err) {
            console.log(err);
            res.json({ errMsg: "Error: Failed to create a new post"});

        }
        else {
            console.log("Values Inserted");
        }
    }) 
}

//READ 첫 페이지

function getBoardPage(req, res) {
    const boardtype = req.body.boardtype;
    detail.getfirstPage(boardtype, (error, result1) => {
        if (error) {
            console.log(error);
            res.json({ errMsg: "Error: Failed to get the first page"})
        } else {
            detail.getTotalPageNum(boardtype, (err, result2) => {

                if (err) {
                    console.log(err);
                    res.json({ errMsg: "Error: Failed to get the first page"})
                }
                else{
                    
                    res.json({
                        pageNum : Math.ceil((result2[0]['pageNum'])/10),
                        boardData : result1
                    })
                }
        })
    }
})
};

//READ 특정 페이지

function getBoardDataPagenum(req, res) {
    const boardtype = req.body.boardtype;
    const pageNum = req.body.pageNum
    detail.getBoardPageNum(boardtype, pageNum, (err, result)=>{
        if (err) {
            console.log(err);
            res.json({ errMsg: "Error: Failed to get the page"})
        } else {
            res.json(result)
        }
    })
}

//UPDATE 글 수정하기

function updateBoardData(req, res) {
    const boardtype = req.body.boardtype;
    const title = req.body.title;
    const content = req.body.content;
    const id = req.body.id;
    detail.updatepost(boardtype, title, content, id, (err, result) => {
    if (err) {
        console.log(err);
        res.json({ errMsg: "Error: Failed to update the post"})
    } else {
        console.log("New Data Inserted")

    }
})
}

//DELETE 글 삭제하기
function deleteBoardData(req, res) {
    const boardtype = req.body.boardtype;
    const id = req.body.id;
    detail.deletepost(boardtype, id, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ errMsg: "Error: Failed to delete the post"})
        } else {
            console.log("Data Deleted")
        }
    })
}

//READ 게시글 디테일 페이지
function getDetailPage(req, res){
    const boardtype = req.body.boardtype;
    const id = req.body.id;
    detail.detailData(boardtype, id, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ errMsg: "Error: Failed to get the details"})
        } else {
            res.json({boardData : result})
        }
    }
    )
}




router.post("/createPost", writeNewPost);
router.get("/boardpage", getBoardPage);
router.post("/board_with_pagenum", getBoardDataPagenum);
router.post("/updatePost", updateBoardData)
router.post("/deletePost", deleteBoardData)
router.post("/postDetails", getDetailPage)
module.exports = router;