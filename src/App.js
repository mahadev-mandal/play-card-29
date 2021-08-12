import { Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import TableComp from './TableComp'


function App() {
  const [rows, setRows] = useState([['0', '1', '2', '3', '4']]);
  const [columns, setColumns] = useState([['0', '1', '2', '3']])
  const [tables, setTables] = useState([1])
  const [names, setNames] = useState([{
    name0: 'A',
    name1: 'B',
    name2: 'C',
    name3: 'D',
  }])

  const addTable = (nmes) => {
    const arr1 = []
    const arr2 = []
    for (let i = rows.length * 5; i < (rows.length + 1) * 5; i++) {
      arr1.push(i.toString())
    }
    for (let i = columns.length * 4; i < (columns.length + 1) * 4; i++) {
      arr2.push(i.toString())
    }
    setColumns([...columns, arr2]);
    setRows([...rows, arr1]);
    setNames([...names, nmes]);
    setTables([...tables, tables.length + 1]);
  }

  return (

    <Grid container justifyContent='center'>
      <Grid item sm={7} md={6} lg={5} xl={4}>
        <Typography variant='h5'
          component='h1'
          style={{ textAlign: 'center', padding: 10, background: 'green', color: 'white' }}
        >
          Play Cards
        </Typography>

        {tables.map((t, i) => (
          <TableComp key={t}
            rows={rows[i]}
            columns={columns[i]}
            disabled={t < tables.length ? true : false}
            onClick={addTable}
            names={names[i]}
          />
        ))}

      </Grid>
    </Grid>
  )
}

export default App
