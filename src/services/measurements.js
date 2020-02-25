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
  console.log('do')
}

const update = async measurement => {

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