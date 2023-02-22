const path = require('path');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
app.use(cors());
// parse application/json
// app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: true}));
// serving static files
// app.use('/uploads', express.static('uploads'));
app.use(express.json());

app.use(require("./app/fileBoard/router"));
app.use(require("./app/detailBoard/router"));
app.use(require("./app/Homepage/router"));

app.use(require("./app/fileUpload/router"));
app.use(require("./app/fileDownload/router"));


// const db = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "password",
//   database: "mydb",
// });



// //홈페이지 announcement 최근게시글 3개 보내기
// //홈페이지 최근게시물 2개 보내기
// app.get("/", (req, res) => {
//   const sqlQuery1 = "SELECT * FROM ( SELECT * FROM mydb.announcement ORDER BY uploadDate DESC LIMIT 3 OFFSET 0) as announcement_desc GROUP BY title;"
//   const sqlQuery2 = "SELECT * FROM ( SELECT * FROM mydb.project ORDER BY uploadDate DESC LIMIT 2 OFFSET 0) as project_desc GROUP BY title;"
//   const res1 = {}

//   db.query(sqlQuery1, function (err, data1) {
//     db.query(sqlQuery2, function (err, data2) {
//       res1.announcement = data1
//       res1.project = data2
//       res.end(JSON.stringify(res1))
//     })
//   });
// })




// //게시판1 CREATE 
// //출처: https://www.tutsmake.com/node-js-mysql-rest-api-file-upload/
// // var storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //      cb(null, 'uploads');
// //   },
// //   filename: function (req, file, cb) {
// //      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
// //   }
// // });

// // var upload = multer({ storage: storage });

// // app.post("/book/create", upload.single('dataFile'), (req, res, next) => {
// //   const title = req.body.title;
// //   const filename= req.body.filename
// //   const file = req.body.file;
// //   if (!file) {
// //       return res.status(400).send({ message: 'Please upload a file.' });
// //   }
// //   db.query(
// //     "INSERT INTO book (title, filename, file, uploadDate, downloadNum) VALUES (?,?,?,?,?)",
// //     [title, filename , file, now(), 0],
// //     (err, result) => {
// //       if (err) {
// //         console.log(err);
// //       } else {
// //         res.send("Values Inserted");
// //       }
// //     }
// //   )
// // });

// //게시판1 READ

// app.get("/journal", (req, res) => {
//   const sqlQuery1 = "SELECT COUNT(*) FROM mydb.journal"
//   const sqlQuery2 =
//     "SELECT * FROM mydb.journal LIMIT 10 OFFSET 0;"
//   const res1 = {}
//   db.select(sqlQuery1, function (err, data1) {
//     db.select(sqlQuery2, function (err, data2) {
//       res1.pageNum = data1
//       res1.boardData = data2
//       res.end(JSON.stringify(res1))
//     })
//   });
// });


// // app.get("/book", (req, res)=>{
// //   const sqlQuery1 = "SELECT COUNT(*) FROM mydb.book"
// //   const sqlQuery2 = 
// //     "SELECT * FROM mydb.book LIMIT 10 OFFSET 0;"
// //   const res1 = {}
// //   db.select(sqlQuery1, function(err, data1) {
// //     db.select(sqlQuery2, function(err, data2) {
// //       res1.pageNum = data1
// //       res1.boardData = data2
// //       res.end(JSON.stringify(res1))
// //     })
// //   });
// // });

// app.get("/journal_with_pagenum", (req, res) => {
//   // req.body 안에 num 담겨있음
//   console.log("/journal_with_pagenum", req.body);
//   var pageNum = parseInt(req.body.pageNum);

//   const sqlQuery =
//     "SELECT * FROM mydb.journal LIMIT ? OFFSET ? - 10;";
//   //  [num]이 ?에 들어감
//   db.query(sqlQuery, [pageNum * 10], (err, result) => {
//     // 그 결과가 result에 담기고 app에 res에게 전달
//     res.send(result);
//   });
// });


// app.post("/book_with_pagenum", (req, res) => {
//   // req.body 안에 num 담겨있음
//   console.log("/book_with_pagenum", req.body);
//   var num = parseInt(req.body.pageNum);

//   const sqlQuery =
//     "SELECT * FROM mydb.book LIMIT ? OFFSET ? - 10;";
//   //  [num]이 ?에 들어감
//   db.query(sqlQuery, [num], (err, result) => {
//     // 그 결과가 result에 담기고 app에 res에게 전달
//     res.json({ pageNum: num, boardData: result });
//   });
// });

// //게시판1 File Download


// app.get("/research/journal_id", function (req, res) {
//   const id = req.body.id
//   const sqlQuery = "SELECT file from mydb.journal where id = ?;"
//   db.query(sqlQuery, [id], (err, result) => {
//     res.download(result); //file: 'text.pdf'
//   })
// });


// //게시판1 UPDATE

// app.put("/book/update", (req, res) => {
//   const id = req.body.id
//   const title = req.body.title;
//   const filename = req.body.filename;
//   const file = req.body.file
//   db.query(
//     "UPDATE mydb.book SET title= ?, filename = ?, file=? WHERE id = ?;",
//     [title, filename, file, id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

// //게시판1 DELETE

// app.delete("/book/delete/:id", (req, res) => {
//   const id = req.params.id;
//   db.query("DELETE FROM mydb.book WHERE id = ?;", id, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// //게시판2 CREATE
// app.post("/report/create", (req, res) => {
//   const title = req.body.title;
//   const email = req.body.email; //관리자 로그인 이메일(아이디) 인풋으로 받아오기
//   const content = req.body.content;

//   db.query(
//     "INSERT INTO report (title, email, content, uploadDate, downloadNum) VALUES (?,?,?,?,?)",
//     [title, email, content, now(), 0],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("Values Inserted");
//       }
//     }
//   );
// });
// //게시판2 READ
// //  첫번째 페이지
// /*
// app.get("/report", (req, res) => {
//   const sqlQuery1 = "SELECT COUNT(*) FROM mydb.report"
//   const sqlQuery2 = 
//     "SELECT * FROM mydb.report LIMIT 10 OFFSET 0;"
//   const res1 = {}
//   db.select(sqlQuery1, function(err, data1) {
//     db.select(sqlQuery2, function(err, data2) {
//       res1.pageNum = data1
//       res1.boardData = data2
//       res.end(JSON.stringify(res1))
//     })
//   });
// });
// */
// //  요청된 페이지번호에 맞는 게시글들 10개
// app.get("/report_with_pagenum", (req, res) => {
//   var num = parseInt(req.body.pageNum);

//   const sqlQuery =
//     "SELECT * FROM mydb.report LIMIT ? OFFSET ? - 10;";
//   //  [num]이 ?에 들어감
//   db.query(sqlQuery, [num], (err, result) => {
//     // 그 결과가 result에 담기고 app에 res에게 전달
//     res.json({ pageNum: num, boardData: result }); //pagenum: 페이지번호, boardData: 10개 게시글 데이터
//   });
// })


// //게시판2 UPDATE
// app.put("/report/update", (req, res) => {
//   const id = req.body.id;
//   const title = req.body.title;
//   const content = req.body.content;
//   db.query(
//     "UPDATE mydb.report SET title = ?, content=? WHERE id = ?",
//     [title, content, id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

// //게시판2 DELETE

// app.delete("/report/delete/:id", (req, res) => {
//   const id = req.params.id;
//   db.query("DELETE FROM mydb.report WHERE id = ?", id, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

app.listen(3001, function (err) {
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", 3001);
});
