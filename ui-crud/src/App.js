import { useState } from 'react';
import { 
  Header, 
  HeaderName, 
  Button,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
 } from 'carbon-components-react';
import PersonService from './services/PersonService';
import './App.css';

function App() {

  const [people, setPeople] = useState([]);

  const onFetch = () => {
    PersonService.getAll()
    .then(response => {
      setPeople(response.data);
    })
    .catch(e => {
      console.log("Something wrong happened");
    });
  };

  const getPersonData = () => (people.map(({name, job, address}) => (
    <StructuredListRow label>
      <StructuredListCell>{name}</StructuredListCell>
      <StructuredListCell>{job}</StructuredListCell>
      <StructuredListCell>{address}</StructuredListCell>
    </StructuredListRow>   
  )));

  return (
    <div className="App">
      <Header aria-label="IBM Platform Name">
        <HeaderName href="#" prefix="CRUD">
          Sample Application
        </HeaderName>
      </Header>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      { people.length > 0 && (
        <StructuredListWrapper>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head>Name</StructuredListCell>
              <StructuredListCell head>Job</StructuredListCell>
              <StructuredListCell head>Address</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            {getPersonData()}
          </StructuredListBody>
        </StructuredListWrapper>
      )}
      <br />
      <br />
      <br />
      <Button onClick={onFetch}>
        Fetch
      </Button>
    </div>
  );
}

export default App;
