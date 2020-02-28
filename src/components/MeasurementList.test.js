import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, waitForElement } from '@testing-library/react'
import MeasurementList from './MeasurementList'

afterEach(cleanup)

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

test('renders list', async () => {
    const component = render(
      <MeasurementList data={measurements} />
    )
    //console.log(component.container)
    const container = await waitForElement(() => {
      return component.container
    })

    expect(container).toHaveTextContent(
      'Tunnus'
    )
})