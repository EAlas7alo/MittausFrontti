import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Measurements from './measurements'
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

test('should fetch measurements', () => {
  const resp = { data: measurements }

  axiosMock.get.mockResolvedValue(resp)

  return Measurements.getAll().then(data => expect(data).toEqual(measurements))
})