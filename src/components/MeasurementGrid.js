import React, { useState, useEffect } from 'react'
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
}) {

  const [editingRowIds, setEditingRowIds] = useState([])
  const [deletedRowIds, setDeletedRowIds] = useState([])
  const [editingStateColumnExtensions] = useState([
    { columnName: 'id', editingEnabled: false}
  ])

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows = []
    let deletable = []
    console.log(changed, deleted)
    /*if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }*/
    if (changed) {
      changedRows = data.map(row => (changed[row.id-1] ? { ...row, ...changed[row.id-1] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      deletable = data.filter(row => deletedSet.has(row.id-1));
    }

    changedRows.forEach(row => {
      console.log(row)
      handleEdit(row)
    })
    deletable.forEach(row => {
      handleDelete(row)
    })
  }

  return (
    <Grid    
      rows={data}
      columns={[
        { name: 'id', title: 'Tunnus' },
        { name: 'name', title: 'Mittaus', editable: true },
        { name: 'quantity', title: 'Mittayksikkö', editable: true },
        { name: 'referenceValueLower', title: 'Alempi viitearvo', editable: true },
        { name: 'referenceValueUpper', title: 'Ylempi viitearvo', editable: true },
      ]}
    >
        <EditingState
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={setEditingRowIds}
          deletedRowIds={deletedRowIds}
          onDeletedRowIdsChange={setDeletedRowIds}
          onCommitChanges={commitChanges}
          columnExtensions={editingStateColumnExtensions}
        />
      <Table />
      <TableHeaderRow />
      <TableEditRow />
        <TableEditColumn
          showEditCommand
          showDeleteCommand
        />
    </Grid>
  )
}

MeasurementGrid.defaultProps = {
  data: [],
  selectedRows: []
}

MeasurementGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  selectedRows: PropTypes.arrayOf(PropTypes.number),
  setSelectedRows: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default MeasurementGrid

