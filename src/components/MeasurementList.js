import React from 'react'
import PropTypes from 'prop-types'
import { useTable } from 'react-table'
import Measurement from './Measurement'
import EditableCell from './EditableCell';

const defaultColumn = {
  
}

function MeasurementList({ columns, data }) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data,
    defaultColumn
  })

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

MeasurementList.defaultProps = {
  measurements: []
}

MeasurementList.propTypes = {

}

export default MeasurementList

