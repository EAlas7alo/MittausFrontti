import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactDataGrid from 'react-data-grid'
import 'react-data-grid/dist/react-data-grid.css'

function MeasurementList({ data }) {

  const [rows, setRows] = useState(data)

  const columns = [
    { key: 'id', name: 'Tunnus' },
    { key: 'name', name: 'Mittaus', editable: true },
    { key: 'quantity', name: 'Mittayksikkö', editable: true },
    { key: 'referenceValueLower', name: 'Alempi viitearvo', editable: true },
    { key: 'referenceValueUpper', name: 'Ylempi viitearvo', editable: true },
  ]

  const onGridRowsUpdated = ({ fromRow, toRow, updated}) => {
    setRows(() => {
      const newRows = rows.slice()
      
      for (let i = fromRow; i <= toRow; i++) {
        newRows[i] = { ...rows[i], ...updated }
      }

      return newRows
    })
  }
  console.log(rows)
  return (
    <ReactDataGrid 
      columns={columns}
      rowGetter={i => rows[i]}
      rowsCount={data.length}
      minHeight={150}
      enableCellSelect={true}
      onGridRowsUpdated={onGridRowsUpdated}

    />
  )
}

MeasurementList.defaultProps = {
  measurements: []
}

MeasurementList.propTypes = {

}

export default MeasurementList

