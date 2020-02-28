import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import styled from 'styled-components'
import MeasurementList from './components/MeasurementList';
import EditButton from './components/EditButton';
import AddNewForm from './components/AddNewForm';
import msrmntService from './services/measurements'
import 'bootstrap/dist/css/bootstrap.css'


const Container = styled.div`
  margin-top: 2em
  display: flex
  flex: 1 1 auto
`

const MainHeader = styled.h2`

`

const AddNewButton = styled.button`

`



function App() {
  const [measurements, setMeasurements] = useState([])

  useEffect(() => {
    let measurements
    const getMeasurements = async () => {
      measurements = await msrmntService.getAll()
      setMeasurements(measurements)
    }
    getMeasurements()
    
  }, [])

  const handleSubmitNew = async (data) => {
    try {
      await msrmntService.addNew(data)
      setMeasurements(await msrmntService.getAll())
    } catch(e) {
      console.log(e)
    }
    
  }

  return (
    <Container>
      <MainHeader>
        Mittaustietokanta
      </MainHeader>
      <AddNewForm handleSubmit={handleSubmitNew} />
      <MeasurementList data={measurements} />
    </Container>
  );
}

export default App;
