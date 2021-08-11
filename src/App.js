import { Typography } from '@material-ui/core'
import React, { useState } from 'react'
import TableComp from './TableComp'

function App() {
  const [tables, setTables] = useState([1])
  const [names, setNames] = useState({
    name0: 'A',
    name1: 'B',
    name2: 'C',
    name3: 'D'
  })

  const addTable = () => {
    setTables([...tables, tables.length + 1])
  }
  const handleNameChange = (value, index) => {
    if (index === 0) {
      setNames({ ...names, name0: value })
    } else if (index === 1) {
      setNames({ ...names, name1: value })
    } else if (index === 2) {
      setNames({ ...names, name2: value })
    } else if (index === 3) {
      setNames({ ...names, name3: value })
    }
  }

  return (
    <div>
      <Typography variant='h5'
        component='h1'
        style={{ textAlign: 'center' }}
      >
        Play Cards
      </Typography>
      {tables.map((t) => (
        <TableComp key={t}
          disabled={t < tables.length ? true : false}
          onClick={addTable}
          names={t < tables.length ? {} : names}
          onChange={handleNameChange}
        />
      ))}
    </div>
  )
}

export default App
