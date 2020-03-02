import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactDataGrid, { SelectColumn } from 'react-data-grid'

function MeasurementList({
  data,
  selectedRows,
  setSelectedRows,
  updateRow
}) {

  const [rows, setRows] = useState(data)

  const columns = [
    SelectColumn,
    { key: 'id', name: 'Tunnus' },
    { key: 'name', name: 'Mittaus', editable: true },
    { key: 'quantity', name: 'Mittayksikkö', editable: true },
    { key: 'referenceValueLower', name: 'Alempi viitearvo', editable: true },
    { key: 'referenceValueUpper', name: 'Ylempi viitearvo', editable: true },
  ]

  useEffect(() => {
    setRows(data)
    setSelectedRows(new Set())
  }, [data])

  const onGridRowsUpdated = ({ fromRow, toRow, updated}) => {
    setRows(() => {
      const newRows = rows.slice()
      
      for (let i = fromRow; i <= toRow; i++) {
        newRows[i] = { ...rows[i], ...updated }
        updateRow(newRows[i])
      }

      return newRows
    })
  }
  
  const onSelectedRowsChange = rows => {
    setSelectedRows(rows)
  }

  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => rows[i]}
      rowsCount={rows.length}
      minHeight={500}
      enableCellSelect
      onGridRowsUpdated={onGridRowsUpdated}
      selectedRows={selectedRows}
      onSelectedRowsChange={onSelectedRowsChange}
      
    />
  )
}

MeasurementList.defaultProps = {
  data: [],
  selectedRows: new Set()
}

MeasurementList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  selectedRows: PropTypes.objectOf(PropTypes.number),
  setSelectedRows: PropTypes.func.isRequired,
  updateRow: PropTypes.func.isRequired,
}

export default MeasurementList

