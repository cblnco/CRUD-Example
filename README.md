# Session 1: Working with a NodeJS server.

## Prerequisites:

```
Nodejs v12+.
npm.
Personal GitHub repository.
Code editor of your preference.
Postman.
```

## Steps for this session:

1. Create a GitHub reporitory in your account, name it however you want and include a README.md file.
2. Create a `.gitignore` file in the root directory with the following line:

```.gitignore
/node_modules
```

3. Execute the `npm init` command and answer the questions accordingly, at the end of the execution you'll have a `package.json` file.
4. Run the following command:

```bash
npm install -S body-parser cors express mongoose
```

5. Create a `server.js` file in the root of your project with the following content.

```js
// Initialize section.
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// CORS setup.
const corsOptions = {
	origin: "http://localhost:9001",
};

app.use(cors(corsOptions));

// Parse application/json requests.
app.use(bodyParser.json());

// Parse urlencoded requests.
app.use(bodyParser.urlencoded({ extended: true }));

// Main route.
app.get("/", (req, res) => {
	res.json({ response: "CRUD GET response." });
});

// Server port to listen requests.
const PORT = process.env.PORT || 9001;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
```

6. Add a script in `package.json` to run the node server:

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "node": "node server.js"
  },
```

7. Open a terminal in the prohect directory and run the previous script with `npm run node`.

8. Make a `GET` request to http://localhost:9001/ with your browser and then with Postman.

## Extra steps:

- Add a `PUT`, `POST`, `PATCH` and a `DELETE` handlers in `server.js`.
- Send an unique response in each one of them.
- Make requests with Postman to the local server and retrieve the answer of each of them.
