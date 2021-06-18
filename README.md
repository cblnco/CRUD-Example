# Session 7: Render data on the UI.

## Steps for this session:

1. Fix CORS problem in our code by adding a `proxy` entry in `package.json` file:
```json
"proxy": "<Your_API_URL>",
```

2. Update the `http-common.js` file by adding `/api` in the `baseURL` property:
```js
import axios from "axios";

export default axios.create({
  baseURL: "/api", // /api is replacing the previous URL.
  headers: {
    "Content-type": "application/json"
  }
});
```

3. Now make a named import in our `PersonService.js` file to solve the ESLint warning:
```js
....
const PersonService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default PersonService;
```

4. Save the previous changes and now the application will be able to consume the MongoDB API data.

5. Import `useState` in the `App.js` file and initialize an object that coontains all the registered entries in the API like so:
```jsx
import { useState } from 'react';
// ...
function App() {

  // We initialize the people array.
  const [people, setPeople] = useState([]);  

  const onFetch = () => {
    PersonService.getAll()
    .then(response => {
      // Here we set data to our empty array and update it with the setPeople function.
      setPeople(response.data);
    })
    .catch(e => {
      console.log("Something wrong happened");
    });
  };
 // ...
}
```

6. In order to render our content we will need to put it in a `StructuredList` which is a Carbon Design System component:

```jsx
import { 
  Header, 
  HeaderName, 
  Button,
  // Below of this line are all the required components of the StructuredList collection.
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
 } from 'carbon-components-react';
```

7. Now add a function called `getPersonData` in order to put all the information retrieved from the MongoDB API:
```jsx
const getNames = () => (people.map(({name, job, address}) => (
    <StructuredListRow label>
      <StructuredListCell>{name}</StructuredListCell>
      <StructuredListCell>{job}</StructuredListCell>
      <StructuredListCell>{address}</StructuredListCell>
    </StructuredListRow>   
)));
```

8. We need to integrate the `StructuredList` components in the return section of `App.js` (the `<br />` tags are temporal, we will remove them when using the Carbon Grid):
```jsx
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
```

9. The `App.js` file should look like this after all these changes we made:
```jsx
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

```