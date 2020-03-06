import React from 'react';
import PropTypes from 'prop-types';
import { TableEditColumn } from '@devexpress/dx-react-grid-material-ui'

function EditableCell({ errors, ...props }) {
  return (
    <TableEditColumn.Cell {...props}>
      {React.Children.map(props.children, child =>
        child && child.props.id === 'commit'
          ? React.cloneElement(child, { disabled: errors[props.tableRow.rowId] })
          : child,
      )}
    </TableEditColumn.Cell>
  );
}

EditableCell.propTypes = {
  errors: PropTypes.object.isRequired,
};

export default EditableCell
