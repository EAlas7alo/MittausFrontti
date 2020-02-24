import React, { useState } from 'react'
import PropTypes from 'prop-types'

function EditButton({ row }) {
  const [buttonText, setButtonText] = useState('Muokkaa')
  const [enabled, isEnabled] = useState(false)
  
  const onPress = e => {
    if (enabled) {
      setButtonText('Muokkaa')
      isEnabled(false)
    } else {
      setButtonText('Tallenna muutokset')
      isEnabled(true)
    }
  }

  console.log(row)
  return (
    <button onClick={onPress}>{buttonText}</button>
  )
}

EditButton.propTypes = {

}

export default EditButton

