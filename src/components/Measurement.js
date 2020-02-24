import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const DataContainer = styled.div`
  flex-direction: row
`

const DataCell = styled.div`

`

function Measurement({ data }) {


  return (
    <div></div>
  )
}

Measurement.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    referenceValueLower: PropTypes.number.isRequired,
    referenceValueUpper: PropTypes.number.isRequired,
  }).isRequired,
}

export default Measurement

