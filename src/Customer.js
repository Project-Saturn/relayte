
// // import React, { Fragment, useState } from "react";
// // import Reservation from "./Reservation";
// // import CurrentTranslator from "./CurrentTranslator";
// // import NavBar from "./NavBar";

// // function Customer() {
// //   const[isDefault,setIsDefault]=useState(true)
// //   const[currentTranslator,setCurrentTranslator]=useState(null)

// //   const clickHandler = ()=>{
// //     setIsDefault(false)
// //   }

// //   const clickSelectHandler = ()=>{
// //     setCurrentTranslator("this translator")
// //   }


// //   return (
// //     <Fragment>
// //       <NavBar/>
// //       {isDefault === true ? (
// //         <div>
// //           {currentTranslator===null? (
// //             <div>
// //               <div>all translators here</div>
// //               <div>get   /api/translator</div>
// //               <div>翻訳者を選んだらsetCurrentTranslator()でいれる</div>
// //               <button onClick={clickSelectHandler}>select this translator</button>
// //               <button onClick={clickHandler}>reservation</button>
// //             </div>
// //           ): (
// //             <div>
// //               <CurrentTranslator setCurrentTranslator={setCurrentTranslator}/>
// //             </div>
// //           )}
          
// //         </div>
// //       ): (
// //         <Reservation setIsDefault={setIsDefault}/>  
// //       )}
// //     </Fragment>
// //   );
// // }

// // export default Customer;

import faker from 'faker';
import React, { Fragment } from 'react';
import { auth } from './Login'
import NavBar from './NavBar';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
 } from '@material-ui/core';
import CurrentTranslator from './CurrentTranslator';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 1200
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
  }));

let USERS = [], STATUSES = ['Active', 'Pending', 'Blocked'];
for(let i=0;i<14;i++) {
    USERS[i] = {
        name: faker.name.findName(),
    }
}

function Customer() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <NavBar />
      <Grid
        justify="center"
        alignItems="center"
        container justify="center"
        container spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
        
      >
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Translator Info</TableCell>
            <TableCell className={classes.tableHeaderCell}>Language spoken</TableCell>
            <TableCell className={classes.tableHeaderCell}>Rate/hour</TableCell>
            <TableCell className={classes.tableHeaderCell}>Book</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.name}>
              <TableCell>
                  <Grid container>
                      <Grid item lg={2}>
                          <Avatar alt={row.name} src='.' className={classes.avatar}/>
                      </Grid>
                      <Grid item lg={10}>
                          <Typography className={classes.name}>{row.name}</Typography>
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
                  <Typography color="primary" variant="subtitle2">Japanese</Typography>
                  <Typography color="textSecondary" variant="body2">Chinese, English</Typography>
                </TableCell>
              <TableCell>¥2000</TableCell>
              <TableCell>
                  <CurrentTranslator/>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={USERS.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
        </TableContainer>
        </Grid>
      </Fragment>
  );
}

export default Customer;