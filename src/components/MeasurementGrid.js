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

  const changeAddedRows = value => {
    const initialized = value.map(row => (Object.keys(row).length ? row : { city: 'Tokio' }));
    setAddedRows(initialized);
  }

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
          />
        <Table />
        <TableHeaderRow />
        <TableEditRow />
          <TableEditColumn
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

