import React from 'react'
import { render, cleanup, waitForElement, wait, act } from '@testing-library/react'
import App from './App'
import DataGrid, { SelectColumn } from 'react-data-grid'

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
    addNew: jest.fn((data) => measurements.concat(data))
  }
})

describe('App.js', () => {
  it('renders without errors', async () => {
    const component = render(<App />)

    component.rerender(<App />)
    
    
  })
})