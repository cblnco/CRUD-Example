# Session 6: Retrieving resources from an API.

## Steps for this session:

1. Install axios on your front-end project direcotyr with the following command:
```bash
yarn add axios
```

3. Start your react application with `yar start`.

4. Remove the sample `create-react-app` code in the `App.js` unti you have something like this:
```jsx
<div className="App">
     
</div>
```

5. Now import the `Header` component from the `carbon-components-react` package:
```jsx
import {Header, HeaderName } from 'carbon-components-react';
....
<div className="App">
  <Header aria-label="IBM Platform Name">
    <HeaderName href="#" prefix="CRUD">
      Sample Application
    </HeaderName>
  </Header>
</div>
```

6. Now we will start to create the files needed to fetch API data. Create an `utils` directory under `src`.

7. Add a `http-common.js` file with the following content:
```js
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});

```

8. Create a `services` folder under `src`.

9. Now add a `PersonService.js` file in the previously created `services` directory:
```js
import http from "../http-common";

const getAll = () => {
  return http.get("/person");
};

const get = id => {
  return http.get(`/person/${id}`);
};

const create = data => {
  return http.post("/person", data);
};

const update = (id, data) => {
  return http.put(`/person/${id}`, data);
};

const remove = id => {
  return http.delete(`/person/${id}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
};
```

10. Import the `PersonService.js` file and start retrieving data:
```js
PersonDataService.create(data)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
```

11. Use the `PersonService` object to fetch data when you click a button:
```jsx
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
```

11. At the end the `App.js` file should look like this:
```jsx
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
```