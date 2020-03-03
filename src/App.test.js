import React from 'react'
import { render, cleanup, waitForElement, wait, act } from '@testing-library/react'
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
    getAll: jest.fn(() => Promise.resolve(measurements))
  }
})
/*beforeEach(() => {
  jest.spyOn(msrmntService, 'getAll').mockImplementation(() => {
    return measurements
  })
})

afterEach(() => {
  jest.clearAllMocks()
})*/

const setup = async () => {
  let component = render(<App />)
  return {
    ...component
  }
}

describe('App.js', () => {
  it('renders without errors', async () => {
    const { getByText, container } = await setup()
    
  })
})