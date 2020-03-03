import React from 'react'
import { act } from 'react-dom/test-utils';
import { render, cleanup, waitForElement, fireEvent, wait } from '@testing-library/react'
import AddNewForm from './AddNewForm'

const handleSubmit = jest.fn()

const setup = () => {
  const utils = render(<AddNewForm handleSubmit={handleSubmit} />)
  const name = utils.getByLabelText('name')
  const quantity = utils.getByLabelText('quantity')
  const referenceValueLower = utils.getByLabelText('referenceValueLower')
  const referenceValueUpper = utils.getByLabelText('referenceValueUpper')

  return {
    name,
    quantity,
    referenceValueLower,
    referenceValueUpper,
    ...utils,
  }
}

it('empties fields on submit', async () => {
  const { 
    name, 
    quantity,
    referenceValueLower,
    referenceValueUpper, 
    ...utils 
  } = setup()

  await wait(() => {
    fireEvent.change(name, { target: { value: 'Verenpaine-systolinen' } })
    fireEvent.change(quantity, { target: { value: 'mmHg' } })
    fireEvent.change(referenceValueLower, { target: { value: '110' } })
    fireEvent.change(referenceValueUpper, { target: { value: '140' } })
  })

  expect(name.value).toBe('Verenpaine-systolinen')
  expect(quantity.value).toBe('mmHg')
  expect(referenceValueLower.value).toBe('110')
  expect(referenceValueUpper.value).toBe('140')

  const submit = utils.getByText('Lisää uusi mittaus')
  
  await wait(() => {
    fireEvent.click(submit)
  })

  expect(name.value).toBe('')
  expect(quantity.value).toBe('')
  expect(referenceValueLower.value).toBe('')
  expect(referenceValueUpper.value).toBe('')

})