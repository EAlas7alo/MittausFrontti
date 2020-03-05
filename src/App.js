import React from 'react';
import styled from 'styled-components'
import AddNewForm from './components/AddNewForm';
import msrmntService from './services/measurements'
import useMeasurementsApi from './hooks./useMeasurementsApi';
import MeasurementGrid from './components/MeasurementGrid';

const Container = styled.div`
  margin-top: 2em
  display: flex
  flex: 1 1 auto
`

const MainHeader = styled.h2`

`

function App() {
  const [measurements, updateMeasurements] = useMeasurementsApi()

  const handleSubmitNew = async (data) => {
    await msrmntService.addNew(data)
    updateMeasurements()
  }

  const handleDelete = async (msrmnt) => {
    await msrmntService.del(msrmnt.id)
    updateMeasurements()
  }

  const handleEdit = async (measurement) => {
    
    await msrmntService.update(measurement)
    updateMeasurements()
  }

  return (
    <Container>
      <MainHeader>
        Mittaustietokanta
      </MainHeader>
      <MeasurementGrid
        data={measurements}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleChanges={() => {}}
        handleSubmitNew={handleSubmitNew}
      />
      
    </Container>
  );
}

export default App;
