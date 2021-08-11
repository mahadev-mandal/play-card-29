import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useFormik } from 'formik'
import { cardSchema } from './validationSchema';
import cancel from './cancel.png'
import { Button } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: '',
        padding: 17,

    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        //minWidth: 700,

    },
    input: {
        border: 'none',
        outline: 'none',
        width: '70%',
        fontSize: 16,
        background: 'transparent',
        textAlign: 'center',
        textTransform: 'capitalize'
    },
});

function TableComp({ onClick, disabled, rows, names, columns }) {
    const classes = useStyles();
    const [total0, setTotal0] = useState(0)
    const [total1, setTotal1] = useState(0)
    const [total2, setTotal2] = useState(0)
    const [total3, setTotal3] = useState(0)
    const [nmes, setNames] = useState( names )
    
    const initialValues = {}
    //push value to object
    rows.map((row) =>
        columns.map((col) =>
            initialValues['name' + row + col] = ''
        )
    )

    const { handleChange, values } = useFormik({
        initialValues: initialValues,
        validationSchema: cardSchema,
        onSubmit() {

        }
    })
    const checkIfCircle = (row, col) => {
        if (document.getElementById('name' + row + col).style.border === '1px solid red') {
            return -values['name' + row + col]
        } else {
            if (values['name' + row + col] === '') {
                return 0
            } else {
                return values['name' + row + col]
            }
        }
    }
    // sum all values in each name field
    const sum = () => {
        var a = 0;
        var b = 0;
        var c = 0;
        var d = 0;
        for (let row = 0; row < rows.length; row++) {
            for (let col = 0; col < columns.length; col++) {
                if (col === 0) {
                    a += checkIfCircle(rows[row], columns[col])
                } else if (col === 1) {
                    b += checkIfCircle(rows[row], columns[col])
                } else if (col === 2) {
                    c += checkIfCircle(rows[row], columns[col])
                } else if (col === 3) {
                    d += checkIfCircle(rows[row], columns[col])
                }
            }
        }
        setTotal0(a)
        setTotal1(b)
        setTotal2(c)
        setTotal3(d)
    }
    // Circle the last not empty value in table
    const handleClick = (event) => {
        let col = parseInt(event.target.id)
        for (let row = rows.length - 1; row >= 0; row--) {
            if (values['name' + rows[row] + col] !== '') {
                document.getElementById('name' + rows[row] + col).style.border = '1px solid red';
                document.getElementById('name' + rows[row] + col).style.borderRadius = '50%';
                document.getElementById('name' + rows[row] + col).disabled = 'disabled';
                sum()
                break;
            }
        }
    }

    useEffect(() => {
        sum()
    })
    useEffect(()=>{
        window.scrollTo(0,document.body.scrollHeight)
    },[])
    const handleNameChange = (event, index) => {
        if (index === 0) {
            setNames({ ...nmes, name0: event.target.value })
        } else if (index === 1) {
            setNames({ ...nmes, name1: event.target.value })
        } else if (index === 2) {
            setNames({ ...nmes, name2: event.target.value })
        } else if (index === 3) {
            setNames({ ...nmes, name3: event.target.value })
        }
    }
    return (
        <div style={disabled ? { pointerEvents: 'none', opacity: 0.9 } : {}}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead >
                        <TableRow>
                            <StyledTableCell >s.n</StyledTableCell>
                            {columns.map((col, index) =>
                                <StyledTableCell
                                    align='center'
                                    style={{ padding: 8 }}
                                    key={col}
                                >
                                    <input type='text'
                                        style={{ color: 'white', width: '100%', margin: 0, }}
                                        className={classes.input}
                                        value={nmes['name' + index]}
                                        onChange={(event) => { handleNameChange(event, index) }}
                                    />
                                </StyledTableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell></StyledTableCell>
                            {columns.map((column) =>
                                <StyledTableCell key={column} >
                                    <img id={column}
                                        onClick={handleClick} src={cancel}
                                        style={{ width: 7, display: 'block', margin: 'auto' }}
                                        alt="cross icon"
                                    />
                                </StyledTableCell>
                            )}
                        </StyledTableRow>
                        {rows.map((row, index) => (
                            <StyledTableRow key={row}>
                                <StyledTableCell >
                                    {index + 1}.
                                </StyledTableCell>
                                {columns.map((column) => (
                                    <StyledTableCell key={column} scope="row" align='center'>
                                        <input type="number"
                                            id={'name' + row + column}
                                            onChange={handleChange}
                                            className={classes.input}
                                            value={values['name' + row + column]}
                                        />
                                    </StyledTableCell>
                                ))}
                            </StyledTableRow>
                        ))}
                        <StyledTableRow>
                            <StyledTableCell >T</StyledTableCell>
                            <StyledTableCell align='center'>
                                {Number(total0).toFixed(1)}
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                                {Number(total1).toFixed(1)}
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                                {Number(total2).toFixed(1)}
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                                {Number(total3).toFixed(1)}
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant='contained'
                color='secondary'
                style={{ margin: 15 }}
                onClick={() => { onClick(nmes) }}
            >
                Add Table
            </Button>
        </div>
    );
}

export default TableComp;