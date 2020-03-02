import React from 'react'
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react'
import AddNewForm from './AddNewForm'

const setup = () => {
  const utils = render(<AddNewForm />)
  const input = utils.getByLabelText('name')
  return {
    input,
    ...utils,
  }
}

it('empties fields on submit', () => {
  const { input } = setup()
  fireEvent.change(input, { target: { value: 'Verenpaine-systolinen' } })

  expect(input.value).toBe('Verenpaine-systolinen')

})