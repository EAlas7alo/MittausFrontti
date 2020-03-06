import '@testing-library/jest-dom/extend-expect'
import msrmntService from './measurements'
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
describe('GET /api/measurements', () => {
  it('should fetch measurements', () => {
    const resp = { data: measurements }
  
    axiosMock.get.mockResolvedValue(resp)
  
    msrmntService.getAll().then(res => expect(res.data).toEqual(measurements))
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(axiosMock.get).toHaveBeenCalledWith(
      'http://localhost:3001/api/measurements/',
    )
  })
})

describe('DELETE', () => {
  it('calls axios correctly', () => {
    axiosMock.delete.mockResolvedValueOnce({ status: 203 })

    msrmntService.del(measurements[0].id)
    expect(axiosMock.delete).toHaveBeenCalledTimes(1)
    expect(axiosMock.delete).toHaveBeenCalledWith(
      'http://localhost:3001/api/measurements/1',
    )
  })
})

describe('PUT', () => {
  it('calls axios correctly', () => {

    msrmntService.update(measurements[0])

    expect(axiosMock.put).toHaveBeenCalledTimes(1)
    expect(axiosMock.put).toHaveBeenCalledWith(
      'http://localhost:3001/api/measurements/1',
      {
        ...measurements[0]
      }
    )
  })
})

describe('POST', () => {
  it('calls axios correctly', () => {

    const newMsrmnt = {
      name: 'test',
      quantity: 'test',
      referenceValueLower: 100,
      referenceValueUpper: 101,
    }

    msrmntService.addNew(newMsrmnt)

    expect(axiosMock.post).toHaveBeenCalledTimes(1)
    expect(axiosMock.post).toHaveBeenCalledWith(
      'http://localhost:3001/api/measurements/',
      {
        ...newMsrmnt
      }
    )
  })
})
