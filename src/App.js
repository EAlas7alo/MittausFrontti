import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import styled from 'styled-components'
import MeasurementList from './components/MeasurementList';
import EditButton from './components/EditButton';
import AddNewForm from './components/AddNewForm';
import msrmntService from './services/measurements'


const Container = styled.div`
  margin-top: 2em
  display: flex
  flex: 1 1 auto
`

const MainHeader = styled.h2`

`

const AddNewButton = styled.button`

`

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

function App() {
  const [measurements, setMeasurements] = useState([])

  useEffect(() => {
    const getMeasurements = async () => {
      return await msrmntService.getAll()
    }
    setMeasurements(getMeasurements())
  }, [])

  console.log(measurements)
  return (
    <Container>
      <MainHeader>
        Mittaustietokanta
      </MainHeader>
      <AddNewButton>Lisää uusi mittaus</AddNewButton>
      <AddNewForm />
      <MeasurementList data={measurements} />
    </Container>
  );
}

export default App;
