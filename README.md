# Session 5: Setting up React and Carbon Design System.

## Steps for this session:

1. Move `package.json`, `package-lock.json` and `server.js` inside of the `crud` directory.

2. Delete the node_modules located in the root of the project.

3. Update the `/node_modules` rule inside of `.gitignore` file with this new one:
```
*node_modules/*
```

4. Install your dependendencies inside of the `crud` directory:
```bash
cd crud/
npm install
```

5. Create a new directory to store your front-end application files (optional).

6. Run the following command inside of the front-end directory:
```bash
npx create-react-app <name-of-your-app>
```

7. Install the following Carbon Design System dependencies:
```bash
yarn add carbon-components@10.25.0 carbon-components-react@7.25.0 @carbon/icons-react@10.22.0 carbon-icons@7.0.7 sass@1.29.0
```

8. Run the previously created React application with this command:
```bash
yarn start
```

8. Create a `.env` with the following content:
```
SASS_PATH="node_modules"
```

9. Create a `src` folder and and an `index.scss` file with the following content:

```bash
@import 'carbon-components/scss/globals/scss/styles.scss';
```

10. Add a button component from Carbon Design System into your React application and it should render with the correct styling:

```jsx
import { Button } from 'carbon-components-react';
```
