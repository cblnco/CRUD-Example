import {Header, HeaderName, Button } from 'carbon-components-react';
import PersonService from './services/PersonService';
import './App.css';

function App() {

  const onFetch = () => {
    PersonService.getAll()
    .then(response => {
      console.log(response.data);
    })
    .catch(e => {
      console.log("Something wrong happened");
    });
  };

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
      <Button onClick={onFetch}>
        Fetch
      </Button>
    </div>
  );
}

export default App;
