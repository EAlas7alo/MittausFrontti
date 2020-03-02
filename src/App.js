import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import MeasurementList from './components/MeasurementList';
import AddNewForm from './components/AddNewForm';
import msrmntService from './services/measurements'
import 'react-data-grid/dist/react-data-grid.css'


const Container = styled.div`
  margin-top: 2em
  display: flex
  flex: 1 1 auto
`

const MainHeader = styled.h2`

`

const RemoveButton = styled.button`
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'}
`

function App() {
  const [measurements, setMeasurements] = useState([])
  const [selectedRows, setSelectedRows] = useState(new Set())
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false)

  useEffect(() => {
    let measurements
    const getMeasurements = async () => {
      measurements = await msrmntService.getAll()
      setMeasurements(measurements)
    }
    getMeasurements()
  }, [])

  useEffect(() => {
    selectedRows.size > 0 
      ? setDeleteButtonVisible(true)
      : setDeleteButtonVisible(false)
  }, [selectedRows])

  const handleSubmitNew = async (data) => {
    await msrmntService.addNew(data)
    setMeasurements(await msrmntService.getAll())
  }

  const handleDelete = async () => {
    if (!deleteButtonVisible) return
    /* 
      Jokainen id on oma delete-kutsunsa, 
      kutsut voisi tietenkin rajoittaa yhteen muulla ratkaisulla mutta
      ottaen huomion projektin skaalan ja RESTissä pysymisen
      olen päättänyt käyttää tätä ratkaisua.
    */
    for (const row of selectedRows) {

      await msrmntService.del(row)
    }
    setSelectedRows(new Set())
    setMeasurements(await msrmntService.getAll())
  }

  const handleEdit = async (measurement) => {
    console.log(measurement)
    await msrmntService.update(measurement)
    setMeasurements(await msrmntService.getAll())
  }

  return (
    <Container>
      <MainHeader>
        Mittaustietokanta
      </MainHeader>
      <AddNewForm handleSubmit={handleSubmitNew} />

      <RemoveButton
        onClick={handleDelete}
        isVisible={deleteButtonVisible}
        >
          Poista valitut mittaukset
      </RemoveButton>

      <MeasurementList 
        data={measurements}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        updateRow={handleEdit}
      />
    </Container>
  );
}

export default App;
