import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { 
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn
} from '@devexpress/dx-react-grid-material-ui'
import { EditingState } from '@devexpress/dx-react-grid';
import EditableCell from './EditableCell';
import { map } from 'rambda'
import isNumber from 'validator/lib/isNumeric'
import debounce from 'lodash.debounce'


const columns = [
  { name: 'id', title: 'Tunnus' },
  { name: 'name', title: 'Mittaus', editable: true },
  { name: 'quantity', title: 'Mittayksikkö', editable: true },
  { name: 'referenceValueLower', title: 'Alempi viitearvo', editable: true, number: true },
  { name: 'referenceValueUpper', title: 'Ylempi viitearvo', editable: true, number: true },
]

function MeasurementGrid({ 
  data,
  handleEdit,
  handleDelete,
  handleSubmitNew,
}) {

  const [editingRowIds, setEditingRowIds] = useState([])
  const [deletedRowIds, setDeletedRowIds] = useState([])
  const [editingStateColumnExtensions] = useState([
    { columnName: 'id', editingEnabled: false}
  ])
  const [errors, setErrors] = useState({})

  const validation = useCallback(debounce(edited => {
    const errors = validate(edited, columns);
    setErrors(errors)
  }, 200), [])

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows = []
    let deletable = []

    if (added) {
      added.forEach(row => {
        handleSubmitNew(row)
      })
    }
    if (changed) {
      data.map(row => {
        if (changed[row.id-1]) changedRows.push({ ...row, ...changed[row.id-1] })
      })
    }
    if (deleted) {
      deletable = deleted.map(row => {
        return data[row]
      })
    }

    changedRows.forEach(row => {
      handleEdit(row)
    })
    deletable.forEach(row => {
      handleDelete(row)
    })
  }

  const validate = (rows, columns) => {
    const errors = map(row => 
      columns.some(column => 
        column.number 
        && row[column.name] !== undefined 
        && !isNumber(row[column.name])), 
        rows)
    
    return errors
  }

  const changeAddedRows = value => {
    validation(Object.assign({}, value))
  }

  const onEdited = (value) => {
    validation(value)
  }

  return (
    <div>
      <Grid    
        rows={data}
        columns={columns}
      >
          <EditingState
            editingRowIds={editingRowIds}
            onEditingRowIdsChange={setEditingRowIds}
            onRowChangesChange={onEdited}
            deletedRowIds={deletedRowIds}
            onDeletedRowIdsChange={setDeletedRowIds}
            onCommitChanges={commitChanges}
            onAddedRowsChange={changeAddedRows}
            columnExtensions={editingStateColumnExtensions}
          />
        <Table />
        <TableHeaderRow />
        <TableEditRow />
        <TableEditColumn
          cellComponent={props => <EditableCell {...props} errors={errors} />}
          showAddCommand
          showEditCommand
          showDeleteCommand
        />
      </Grid>
    </div>
  )
}

MeasurementGrid.defaultProps = {
  data: [],
}

MeasurementGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleSubmitNew: PropTypes.func.isRequired,
}

export default MeasurementGrid

