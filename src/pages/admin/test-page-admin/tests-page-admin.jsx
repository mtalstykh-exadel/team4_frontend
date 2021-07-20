
import styles from './test-page-admin.scss';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const createData = (name, calories, fat, carbs, protein) => {
    return { name, calories, fat, carbs, protein };
};

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const AdminTestPage = () => {


    console.log(styles);

    return (
        <TableContainer component={Paper} className="table-container">
            <Table className="table" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={styles.headRowItem}>Level</TableCell>
                        <TableCell align="right" className="head-row-item">Assigned</TableCell>
                        <TableCell align="right" className="head-row-item">Deadline</TableCell>
                        <TableCell align="right" className="head-row-item">Coach</TableCell>
                        <TableCell align="right" className="head-row-item">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminTestPage;
