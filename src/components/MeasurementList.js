import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactDataGrid from 'react-data-grid'

function MeasurementList({ data }) {

  const [rows, setRows] = useState(data)
  const [selectedIndexes, setSelectedIndexes] = useState([])

  const columns = [
    { key: 'id', name: 'Tunnus' },
    { key: 'name', name: 'Mittaus', editable: true },
    { key: 'quantity', name: 'Mittayksikkö', editable: true },
    { key: 'referenceValueLower', name: 'Alempi viitearvo', editable: true },
    { key: 'referenceValueUpper', name: 'Ylempi viitearvo', editable: true },
  ]

  useEffect(() => {
    setRows(data)
  }, [data])

  const onGridRowsUpdated = ({ fromRow, toRow, updated}) => {
    setRows(() => {
      const newRows = rows.slice()
      
      for (let i = fromRow; i <= toRow; i++) {
        newRows[i] = { ...rows[i], ...updated }
      }

      return newRows
    })
  }
  
  const onRowsSelected = rows => {
    setSelectedIndexes(
      selectedIndexes.concat(
        rows.map(r => r.rowIdx)
      )
    )
  }

  const onRowsDeselected = rows => {
    let rowIndexes = rows.map(r => r.rowIdx)
    setSelectedIndexes(
      selectedIndexes.filter(
        i => rowIndexes.indexOf(i) === -1
      )
    )
  }

  console.log(rows)
  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => rows[i]}
      rowsCount={rows.length}
      minHeight={500}
      enableCellSelect
      onGridRowsUpdated={onGridRowsUpdated}
      rowSelection={{
        showCheckbox: true,
        enableShiftSelect: true,
        onRowsSelected: onRowsSelected,
        onRowsDeselected: onRowsDeselected,
        selectBy: {
          indexes: selectedIndexes,
        }
      }}
    />
  )
}

MeasurementList.defaultProps = {
  data: []
}

MeasurementList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
}

export default MeasurementList

