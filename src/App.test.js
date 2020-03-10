import React from 'react'
import { render, waitForElement, fireEvent, act } from '@testing-library/react'
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
    addNew: jest.fn(),
    update: jest.fn(),
    del: jest.fn()
  }
})



const originalError = console.error
beforeAll(() => {
  // https://github.com/DevExpress/devextreme-reactive/issues/2709
  console.error = (...args) => {
    if (/Warning: Cannot update a component from inside the function body of a different component./.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

const setup = () => {
  const utils = render(<App />)
  return {
    getByText: utils.getByText,
    container: utils.container,
    ...utils,
  }
}


it('renders without errors and shows initial data', async () => {
  const { getByText, container } = setup()
  await waitForElement(() => getByText('Hemoglobiini'))
  expect(container).toHaveTextContent('Hemoglobiini')
})


it('adding a new measurement', async () => {
  const { getByText, container } = setup()
  await waitForElement(() => getByText('Hemoglobiini'))
  const newButton = container.querySelector('button[id="add"]')
  fireEvent.click(newButton)       

  const inputs = container.querySelectorAll('input[type="text"]:not([readonly=""])')

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

it('editing an existing measurement', async () => {
  const { getByText, container } = setup()
  await waitForElement(() => getByText('Hemoglobiini'))
  const editButton = container.querySelector('button[id="edit"]')

  fireEvent.click(editButton)

  const inputToChange = container.querySelector('input[value="Hemoglobiini"]')

  fireEvent.change(inputToChange, { target: { value: 'Gemohlobiini' } }) 

  const submitButton = container.querySelector('button[id="commit"]')
  fireEvent.click(submitButton)

  expect(msrmntServiceMock.update).toHaveBeenCalledTimes(1)
})

it('deleting a measurement', async () => {
  const { getByText, container } = setup()
  await waitForElement(() => getByText('Hemoglobiini'))
  
  const deleteButton = container.querySelector('button[id="delete"]')
  act(() => {
    fireEvent.click(deleteButton)
  })

  expect(msrmntServiceMock.del).toHaveBeenCalledTimes(1)
  expect(msrmntServiceMock.del).toHaveBeenCalledWith(1)
})

