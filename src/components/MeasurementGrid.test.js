import React from 'react'
import { render, fireEvent } from '@testing-library/react' 
import MeasurementGrid from './MeasurementGrid'


let measurements = [
  {
    id: 1,
    name: "Hemoglobiini",
    quantity: "g/l",
    referenceValueLower: 134,
    referenceValueUpper: 167,
  },
  {
    id: 2,
    name: "LDL-kolesteroli",
    quantity: "mmol/l",
    referenceValueLower: 0,
    referenceValueUpper: 3,
  }
]

const helperFn = {
  handleEdit: jest.fn(),
  handleDelete: jest.fn(),
  handleSubmitNew: jest.fn()
}

const setup = () => {
  const { getByText, container, ...component} = render(
    <MeasurementGrid
      data={measurements}
      handleDelete={helperFn.handleDelete}
      handleEdit={helperFn.handleEdit}
      handleSubmitNew={helperFn.handleSubmitNew}
    />
  )
  const editButton = container.querySelector('button[id="edit"]')
  const deleteButton = container.querySelector('button[id="delete"]')
  const newButton = container.querySelector('button[id="add"]')

  return {
    getByText,
    container,
    editButton,
    deleteButton,
    newButton,
    ...component,
  }
}

describe('MeasurementGrid', () => {
  beforeEach(() => {
    
  })
  it('renders without errors', () => {
    setup()
  })

  it('renders data', () => {
    const { container, debug } = setup()
    debug()
    expect(container).toHaveTextContent('LDL-kolesteroli')
  })

  describe('event handlers', () => {
    it('calls editing handler on edit', () => {
      const { editButton, container } = setup()

      fireEvent.click(editButton)
    
      const input = container.querySelector('input[value="Hemoglobiini"]')
      fireEvent.change(input, { target: { value: 'valueChanged' } })
    
      const saveButton = container.querySelector('button[id="commit"]')
      fireEvent.click(saveButton)
      expect(helperFn.handleEdit).toHaveBeenCalledTimes(1)
    })

    it('calls delete handler on delete', () => {
      const { deleteButton } = setup()

      fireEvent.click(deleteButton)

      expect(helperFn.handleDelete).toHaveBeenCalledTimes(1)
    })

    it('calls submit handler on submit', () => {
      const { newButton, container } = setup()

      fireEvent.click(newButton)
      const saveButton = container.querySelector('button[id="commit"]')
      fireEvent.click(saveButton)

      expect(helperFn.handleSubmitNew).toHaveBeenCalledTimes(1)
    })
  })

})