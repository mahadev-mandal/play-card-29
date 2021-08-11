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
import { Button, Input, TextField } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: '',
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
        fontSize: 16,
        background: 'transparent',
        textAlign: 'center',
        textTransform:'capitalize'
    },
});

const initialValues = {}
//push value to object
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        initialValues['name' + i + j] = ''
    }
}

const id = ['0', '1', '2', '3'];

function TableComp({ onClick, disabled, names, onChange }) {

    const classes = useStyles();

    const [total0, setName0] = useState(0)
    const [total1, setName1] = useState(0)
    const [total2, setName2] = useState(0)
    const [total3, setName3] = useState(0)

    const { handleChange, values } = useFormik({
        initialValues: initialValues,
        validationSchema: cardSchema,
        onSubmit() {

        }
    })
    const checkIfCircle = (i, j) => {
        if (document.getElementById('name' + j + i).style.border === '1px solid red') {
            return -values['name' + j + i]
        } else {
            return values['name' + j + i]
        }
    }
    // sum all values in each name field
    const sum = () => {
        var a = 0;
        var b = 0;
        var c = 0;
        var d = 0;
        for (let i = 0; i <= 3; i++) {
            for (let j = 0; j <= 3; j++) {
                if (i === 0) {
                    a += checkIfCircle(i, j)
                } else if (i === 1) {
                    b += checkIfCircle(i, j)
                } else if (i === 2) {
                    c += checkIfCircle(i, j)

                } else if (i === 3) {
                    d += checkIfCircle(i, j)
                }
            }
        }
        setName0(a)
        setName1(b)
        setName2(c)
        setName3(d)
    }
    // Circle the last not empty value in table
    const handleClick = (event) => {
        let i = parseInt(event.target.id)
        for (let j = 3; j >= 0; j--) {
            if (values['name' + j + i] !== '') {
                document.getElementById('name' + j + i).style.border = '1px solid red';
                document.getElementById('name' + j + i).style.borderRadius = '50%';
                document.getElementById('name' + j + i).disabled = 'disabled';
                sum()
                break;
            }
        }
    }

    useEffect(() => {
        sum()
    })

    return (
        <>
            <TableContainer component={Paper}
                style={disabled ? { pointerEvents: 'none', opacity: 0.9 } : {}}
            >
                <Table className={classes.table} aria-label="customized table">
                    <TableHead >
                        <TableRow>
                            <StyledTableCell >s.n</StyledTableCell>
                            {id.map((n, index) =>
                                <StyledTableCell
                                    align='center'
                                    style={{ padding: 8 }}
                                    key={n}
                                >
                                    <input type='text'
                                        style={{ color: 'white', width: '100%', margin: 0, }}
                                        className={classes.input}
                                        value={names['name' + index]}
                                        onChange={(event) => { onChange(event.target.value, index) }}

                                    />
                                </StyledTableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell></StyledTableCell>
                            {id.map((id) =>
                                <StyledTableCell key={id} >
                                    <img id={id}
                                        onClick={handleClick} src={cancel}
                                        style={{ width: 7, display: 'block', margin: 'auto' }}
                                        alt="cross icon"
                                    />
                                </StyledTableCell>
                            )}
                        </StyledTableRow>
                        {id.map((id0, index0) => (
                            <StyledTableRow key={id0}>
                                <StyledTableCell >
                                    {index0 + 1}.
                                </StyledTableCell>
                                {id.map((id1, index1) => (
                                    <StyledTableCell key={id1} scope="row" align='center'>
                                        <input type="number"
                                            id={'name' + index0 + index1}
                                            onChange={handleChange}
                                            className={classes.input}
                                            value={values['name' + index0 + index1]}
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
                onClick={() => { onClick() }}
            >
                Add Table
            </Button>
        </>
    );
}

export default TableComp;