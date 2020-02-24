import React from 'react';
import logo from './logo.svg';
import styled from 'styled-components'
import MeasurementList from './components/MeasurementList';
import EditButton from './components/EditButton';


const Container = styled.div`
  margin-top: 2em
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

  const columns = React.useMemo(
    () => [
      {
        Header: 'Mittaus',
        columns: [
          {
            Header: 'Tunnus',
            accessor: 'id',
          },
          {
            Header: 'Nimi',
            accessor: 'name',
          },
          {
            Header: 'Mittayksikkö',
            accessor: 'quantity',
          },
        ],
      },
      {
        Header: 'Viitearvot',
        columns: [
          {
            Header: 'Alaraja',
            accessor: 'referenceValueLower'
          },
          {
            Header: 'Yläraja',
            accessor: 'referenceValueUpper',
          },
        ],
      },
      {
        Header: () => null,
        id: 'editButton',
        Cell: ({ row }) => (
          <EditButton row={row} />
        ),
      },
      {
        Header: () => null,
        id: 'deleteButton',
        Cell: ({ row }) => (
          <button>Poista</button>
        ),
      }
  ])

  return (
    <Container>
      <MainHeader>
        Mittaustietokanta
      </MainHeader>
      <AddNewButton>Lisää uusi mittaus</AddNewButton>
      <MeasurementList columns={columns} data={measurements} />
    </Container>
  );
}

export default App;
