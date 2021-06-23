import React, { Fragment } from 'react';
// import Reservation from "./Reservation";
// import CurrentTranslator from "./CurrentTranslator";
import NavBar from "./NavBar";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CurrentTranslator from './CurrentTranslator';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Tokyo Banana', 6.0, "Japanese, English"),
  createData('Roppongi Minato', 9.0, "Japanese, English"),
  createData('Saitama Tako', 16.0, "Chinese, English"),
  createData('Oko Nomiyaki', 3.7, "Japanese, English"),
  createData('Napo Litano', 16.0, "Japanese, English")
];

export default function Customer() {
  const classes = useStyles();

  return (
    <Fragment>
      <NavBar />
      <div>
        <h1>CHOOSE A TRANSLATOR</h1>
        </div>
      <TableContainer component={Paper}>
     
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Language</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Book a meeting</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right"><CurrentTranslator/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>

       
      </Fragment>
  );
}




// import React, { Fragment, useState } from "react";
// import Reservation from "./Reservation";
// import CurrentTranslator from "./CurrentTranslator";
// import NavBar from "./NavBar";

// function Customer() {
//   const[isDefault,setIsDefault]=useState(true)
//   const[currentTranslator,setCurrentTranslator]=useState(null)

//   const clickHandler = ()=>{
//     setIsDefault(false)
//   }

//   const clickSelectHandler = ()=>{
//     setCurrentTranslator("this translator")
//   }


//   return (
//     <Fragment>
//       <NavBar/>
//       {isDefault === true ? (
//         <div>
//           {currentTranslator===null? (
//             <div>
//               <div>all translators here</div>
//               <div>get   /api/translator</div>
//               <div>翻訳者を選んだらsetCurrentTranslator()でいれる</div>
//               <button onClick={clickSelectHandler}>select this translator</button>
//               <button onClick={clickHandler}>reservation</button>
//             </div>
//           ): (
//             <div>
//               <CurrentTranslator setCurrentTranslator={setCurrentTranslator}/>
//             </div>
//           )}
          
//         </div>
//       ): (
//         <Reservation setIsDefault={setIsDefault}/>  
//       )}
//     </Fragment>
//   );
// }

// export default Customer;