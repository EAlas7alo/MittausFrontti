import React, { useState } from 'react'
import PropTypes from 'prop-types'

const EditableCell = ({
  cell: { value: initialValue },
  row: { index },
  column: { id },
  updateData,
}) => {
  const [value, setValue] = useState(initialValue)


  const onChange = e => {
    setValue(e.target.value)
  }

  const onBlur = () => {
    updateData(index, id, value)
  }

  return (
    <input value={value} onChange={onChange} onBlur={onBlur} />
  )
}

EditableCell.propTypes = {

}

export default EditableCell
