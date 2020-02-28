import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/measurements'

const addNew = async measurement => {
  try {
    const response = await axios.post(baseUrl, measurement)
    console.log(response)
    return response.data
  } catch(e) {
    console.log(e)
  }
}

const del = async id => {
  try {
    const response = await axios.delete(`${id}`)

    return response.data
  } catch(e) {
    console.log(e)
  }
}

const update = async measurement => {
  try {
    const response = await axios.update(`${measurement.id}`, measurement)

    return response.data
  } catch(e) {
    console.log(e)
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default {
  addNew,
  del,
  update,
  getAll
}