import React, { useState } from 'react'
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

const validate = (rows, columns) => {
  const errors = map(row => 
    columns.some(column => 
      column.number 
      && row[column.name] !== undefined 
      && !isNumber(row[column.name])), 
      rows);
  return errors
}
  

function MeasurementGrid({ 
  data,
  handleEdit,
  handleDelete,
  handleSubmitNew,
}) {
  const columns = [
    { name: 'id', title: 'Tunnus' },
    { name: 'name', title: 'Mittaus', editable: true },
    { name: 'quantity', title: 'Mittayksikkö', editable: true },
    { name: 'referenceValueLower', title: 'Alempi viitearvo', editable: true, number: true },
    { name: 'referenceValueUpper', title: 'Ylempi viitearvo', editable: true, number: true },
  ]
  const [editingRowIds, setEditingRowIds] = useState([])
  const [deletedRowIds, setDeletedRowIds] = useState([])
  const [addedRows, setAddedRows] = useState([])
  const [editingStateColumnExtensions] = useState([
    { columnName: 'id', editingEnabled: false}
  ])
  const [errors, setErrors] = useState({})

  const changeAddedRows = value => {
    const initialized = value.map(row => (Object.keys(row).length ? row : { city: 'Tokio' }));
    setAddedRows(initialized);
  }

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows = []
    let deletable = []

    if (added) {
      added.forEach(row => {
        delete row['city']
        handleSubmitNew(row)
      })
    }
    if (changed) {
      data.map(row => {
        if (changed[row.id-1]) changedRows.push({ ...row, ...changed[row.id-1] })
      })
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      deletable = data.filter(row => deletedSet.has(row.id-1));
    }

    changedRows.forEach(row => {
      handleEdit(row)
    })
    deletable.forEach(row => {
      handleDelete(row)
    })
  }

  const onEdited = 
    edited => {
      console.log(edited)
      const errors = validate(edited, columns);
      setErrors(errors)
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
            deletedRowIds={deletedRowIds}
            onDeletedRowIdsChange={setDeletedRowIds}
            onCommitChanges={commitChanges}
            addedRows={addedRows}
            onAddedRowsChange={changeAddedRows}
            columnExtensions={editingStateColumnExtensions}
            onRowChangesChange={onEdited}
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

