import React from 'react'
import { render, cleanup, waitForElement } from '@testing-library/react'

import App from './App'
import axiosMock from 'axios'

jest.mock('axios')

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

beforeAll(() => {
  axiosMock.get.mockResolvedValue({
    data: measurements
  })
})

describe('App.js', () => {
  it('renders without errors', async () => {
    const { getByText, getByRole } = render(<App />)
    
  })
})