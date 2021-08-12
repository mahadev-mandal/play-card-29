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
import { Fab } from '@material-ui/core';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 20,
        padding: 10,

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
        fontSize: 22,
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
    const [nmes, setNames] = useState(names)

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
        if (document.getElementById('name' + row + col).style.border === '2px solid red') {
            return (-values['name' + row + col]).toFixed(1).toString().split('.')
        } else {
            if (values['name' + row + col] === '') {
                return (0).toFixed(1).toString().split('.')
            } else {
                return (values['name' + row + col]).toFixed(1).toString().split('.')
            }
        }
    }
    //sum all values in each name field
    const sum = () => {
        //arrMatrix = [[['',''],...5],...4]
        var arrMatrix = columns.map((col) =>
            rows.map((row) =>
                checkIfCircle(row, col)
            )

        )
        //totalArr = ['','','','']
        var totalArr = arrMatrix.map((col) => {
            var beforeDot = 0;
            var afterDot = 0;
            col.map((row) => {
                beforeDot += parseInt((row[0]))
                afterDot += parseInt((row[1]))
                return 0
            })
            if (afterDot > 9) {
                beforeDot += 1;
                afterDot -= 10
            }
            return parseFloat(beforeDot.toString() + '.' + afterDot.toString())
        })
        setTotal0(totalArr[0])
        setTotal1(totalArr[1])
        setTotal2(totalArr[2])
        setTotal3(totalArr[3])
    }
    // Circle the last not empty value in table
    const handleClick = (event) => {
        let col = parseInt(event.target.id)
        for (let row = rows.length - 1; row >= 0; row--) {
            if (values['name' + rows[row] + col] !== '') {
                document.getElementById('name' + rows[row] + col).style.border = '2px solid red';
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
    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight)
    }, [])
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
        <div style={disabled ? { pointerEvents: 'none', opacity: 0.9 } : { height: '90vh' }}>
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
                                        style={{ color: 'white', width: '100%', margin: 0, fontSize: 15, }}
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
            <Fab variant="extended"
                size='small'
                color='secondary'
                style={{ margin: 10 }}
                onClick={() => { onClick(nmes) }}
            >
                Add Table
            </Fab>
        </div>
    );
}

export default TableComp;