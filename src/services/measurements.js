import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/measurements/'

const addNew = async measurement => {
  try {
    const response = await axios.post(baseUrl, measurement)
    
    return response
  } catch(e) {
    console.log(e)
  }
}

const del = async id => {
  try {
    const response = await axios.delete(baseUrl + id)

    return response
  } catch(e) {
    console.log(e)
  }
}

const update = async measurement => {
  try {
    const response = await axios.put(baseUrl.concat(measurement.id), measurement)
    return response
  } catch(e) {
    console.log(e)
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response
}

export default {
  addNew,
  del,
  update,
  getAll
}