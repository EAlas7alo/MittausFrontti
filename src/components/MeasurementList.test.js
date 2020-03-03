import React from 'react'
import { render, cleanup } from '@testing-library/react'
import MeasurementList from './MeasurementList'

//afterEach(cleanup)

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

xit('renders list', async () => {
  console.log(measurements)
  const component = render(
    <MeasurementList
      data={measurements}
      setSelectedRows={jest.fn()}
      updateRow={jest.fn()}
    />
  )
  component.debug()

  expect(component.container).toHaveTextContent(
    'Tunnus'
  )
})