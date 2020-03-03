import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import styled from 'styled-components'

const Form = styled.form`
  display: flex
  flex-direction: column
`

function AddNewForm({ handleSubmit }) {

  const formik = useFormik({
    initialValues: { 
      name: '', 
      quantity: '', 
      referenceValueLower: '', 
      referenceValueUpper: '' 
    },
    onSubmit: (data) => {
      handleSubmit(data)
      formik.resetForm()
    }
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <label>
        Mittaus
        <input 
          aria-label="name"
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </label>
      <label>
        Mittayksikkö
        <input
          aria-label="quantity"
          type="text"
          name="quantity"
          value={formik.values.quantity}
          onChange={formik.handleChange}
        />
      </label>
      <label>
        Alempi viitearvo
        <input 
          aria-label="referenceValueLower"
          type="text"
          name="referenceValueLower"
          value={formik.values.referenceValueLower}
          onChange={formik.handleChange}
        />
      </label>
      <label>
        Ylempi viitearvo
        <input 
          aria-label="referenceValueUpper"
          type="text"
          name="referenceValueUpper"
          value={formik.values.referenceValueUpper}
          onChange={formik.handleChange}
        />
      </label>
      <button type="submit">Lisää uusi mittaus</button>
    </Form>
  )
}

AddNewForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default AddNewForm

