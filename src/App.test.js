import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react'
import App from './App'

import msrmntServiceMock from './services/measurements'

jest.mock('./services/measurements', () => {
  const measurements = [
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
  return {
    getAll: jest.fn(() => Promise.resolve({ data: measurements })),
    addNew: jest.fn((data) => measurements.concat(data)),
    update: jest.fn(() => {}),
    del: jest.fn()
  }
})

describe('App.js', () => {
  it('renders without errors and shows initial data', async () => {
    const { getByText, container } = render(<App />)
    await waitForElement(() => getByText('Hemoglobiini'))
    expect(container).toHaveTextContent('Hemoglobiini')
  })

  describe('common use cases', () => {
    it('adding', async () => {
      const { getByText, container } = render(<App />)
      await waitForElement(() => getByText('Hemoglobiini'))
      const newButton = container.querySelector('button[id="add"]')
      fireEvent.click(newButton)

      const inputs = container.querySelectorAll('input[type="text"]:not([readonly=""])')
      console.log(inputs.length)

      inputs.forEach(input => {
        fireEvent.change(input, { target: { value: '1' } })
      })

      const submitButton = container.querySelector('button[id="commit"]')
      fireEvent.click(submitButton)

      expect(msrmntServiceMock.addNew).toHaveBeenCalledWith({
        name: '1',
        quantity: '1',
        referenceValueLower: '1',
        referenceValueUpper: '1',
      })
      expect(msrmntServiceMock.addNew).toHaveBeenCalledTimes(1)
    })

    it('editing', async () => {
      const { getByText, container, debug } = render(<App />)
      await waitForElement(() => getByText('Hemoglobiini'))
      const editButton = container.querySelector('button[id="edit"]')
      fireEvent.click(editButton)
      debug()
      const inputToChange = container.querySelector('input[value="Hemoglobiini"]')
      fireEvent.change(inputToChange, { target: { value: 'Gemohlobiini' } })

      const saveButton = container.querySelector('button[id="commit"]')
      fireEvent.click(saveButton)

      expect(msrmntServiceMock.update).toHaveBeenCalledTimes(1)
    })

    it('deleting', async () => {
      const { getByText, container } = render(<App />)
      await waitForElement(() => getByText('Hemoglobiini'))
      
      const deleteButton = container.querySelector('button[id="delete"]')
      fireEvent.click(deleteButton)

      expect(msrmntServiceMock.del).toHaveBeenCalledTimes(1)
      expect(msrmntServiceMock.del).toHaveBeenCalledWith(1)
    })
  })
})