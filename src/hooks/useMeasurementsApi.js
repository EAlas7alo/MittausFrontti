import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import msrmntService from '../services/measurements'

function useMeasurementsApi(initialStatus = [] ) {
  const [measurements, setMeasurements] = useState(initialStatus)
  
  const getMeasurements = async () => {
    const res = await msrmntService.getAll()
    setMeasurements(res.data)
  }

  useEffect(() => {
    getMeasurements()
  }, [])

  const updateMeasurements = () => {
    getMeasurements()
  }

  return [
    measurements,
    updateMeasurements
  ]
}

useMeasurementsApi.propTypes = {
  initialStatus: PropTypes.arrayOf(PropTypes.object)
}

export default useMeasurementsApi
