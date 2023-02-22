import React, { useContext, useEffect, useState, Component } from 'react'
import { SocketContext } from "../../api/logics";
import API_URL from '../../api/serverURL';
import { JOURNAL_DATA } from './tempData';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from 'moment';
import axios from 'axios';
import { uploadFile } from 'react-s3';
import AWS from 'aws-sdk';


const { BoardContainer, Title } = require('./styles');
// const awsKeys = require("../../awsKeys");


function Journal() {
   const { journal, book, journalState, bookState, journalPage,
      bookPage, journalContent, bookContent, JCState, BCState,
      getJournalBoard, getBookBoard, getJournalBoardPage, getBookBoardPage,
      getJournalContent, getBookContent } = useContext(SocketContext);

   // const [selectedFiles, setSelectedFiles] = useState({});
   // function handleFileChange(event) {
   //    console.log(event.target.files)
   //    selectedFiles["files"] = event.target.files
   // }


   // const handleUploadClick = (event) => {
   //    event.preventDefault();
   //    console.log(selectedFiles)
   //    console.log(selectedFiles["files"])

   //    if (!selectedFiles["files"]) {
   //       return;
   //    }
   //    const formData = new FormData();

   //    for (let i = 0; i < selectedFiles["files"].length; i++) {
   //       formData.append("files", selectedFiles["files"][i]);
   //    }

   //    console.log(formData)
   //    // 👇 Uploading the files using the fetch API to the server
   //    // fetch(`${API_URL}/upload`, {
   //    //    method: 'POST',
   //    //    body: formData,
   //    //    headers: {
   //    //       "Content-Type": "multipart/form-data"
   //    //    }
   //    // })
   //    //    .then((res) => res.json())
   //    //    .then((data) => console.log(data))
   //    //    .catch((err) => console.error(err));
   // };

   const [file, setFile] = useState(null);
   const handleFileChange = (event) => {
      setFile(event.target.files[0]);
   };

   const handleUploadClick = (event) => {
      event.preventDefault();

      if (!file) {
         console.error('No file selected');
         return;
      }
      console.log(file)

      const formData = new FormData();
      formData.append('file', file);

      try {
         axios.post(`${API_URL}/upload`, formData, {
            headers: {
               "Content-Type": "multipart/form-data"
            }
         }).then((response) => {
            console.log(response)
         })
      } catch (error) {
         console.error(error)
      }
      // fetch(`${API_URL}/upload`, {
      //    method: 'POST',
      //    body: formData
      // })
      //    .then(response => {
      //       if (!response.ok) {
      //          throw new Error('Failed to send PDF');
      //       }
      //       console.log('PDF sent successfully');
      //    })
      //    .catch(error => {
      //       console.error(error);
      //    });
   };

   /*

   const [selectedFile, setSelectedFile] = useState({});

   const onChangeHandler = (event) => {
      
      selectedFile["selectedFile"]= event.target.files;
   }

 

function onClickHandler ()
{
   /*
   if (!selectedFile) {
      return;
   }
   const data = new FormData();
   for (const file of selectedFile["selectedFile"] ){
      data.append(`file`, file)
   }
   
   
   const formData = new FormData();
   formData.append("name", selectedFile["selectedFile"].name);
   for(let i =0; i < selectedFile["selectedFile"].length; i++) {
         formData.append("files", selectedFile["selectedFile"].files[i]);
   }
   
   
   fetch("http://localhost:3001/upload", {method: 'POST', body: formData, headers: {
      "Content-Type": "multipart/form-data"
   }})
   .then((res) => res.json())
   .then((data) => console.log(data))
   .catch((err) => console.error(err));

}
*/

   return (
      <div className="journalList">
         <BoardContainer>
            <TableContainer>

               <Title><h1>Journal</h1></Title>


               <Table sx={{ minWidth: 650 }} aria-label="simple table">

                  <TableHead>
                     <TableRow>
                        <TableCell align="center">번호</TableCell>
                        <TableCell align="center">제목</TableCell>
                        <TableCell align="center">파일명</TableCell>
                        <TableCell align="center">첨부파일</TableCell>
                        <TableCell align="center">작성일시</TableCell>
                        <TableCell align="center">다운로드수</TableCell>

                     </TableRow>
                  </TableHead>


                  <TableBody>
                     <TableRow
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                     >
                        <TableCell component="th" scope="row" align="center">
                        </TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>

                     </TableRow>

                  </TableBody>
               </Table>

            </TableContainer>
         </BoardContainer>

         <div>
            <input type='file' id='file' name='file' onChange={handleFileChange} multiple />

            <button onClick={handleUploadClick}>Upload</button>
         </div>


      </div>
   );
}


export default Journal;






