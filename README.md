# Session 9: Creating React components.
## Steps for this session:

1. Create a `components` directory inside of `src`:

2. Add a `HeaderCRUD` folder inside of `components` and create an `index.jsx` file with this content:

```jsx
import React from 'react';
import { Header, HeaderName } from 'carbon-components-react';

const HeaderCRUD = (prop) => {
  const { ariaLabel, prefix, children } = prop;
  return (
    <Header aria-label={ariaLabel}>
    <HeaderName prefix={prefix}>{children}</HeaderName>
  </Header>
  );
};

export default HeaderCRUD;
```

3. Now create a `PersonList/index.jsx` under `components` with the following code:

```jsx
import React from 'react';
import { 
	StructuredListWrapper,
	StructuredListHead,
	StructuredListBody,
	StructuredListRow,
	StructuredListCell,
	StructuredListSkeleton, 
} from 'carbon-components-react';

const PersonList = ({ people, headers }) => {

	let listHeader = [];
	let personData = [];
	let hasPeople = people.length > 0;
	
	const getListHeaders = () => headers.map(
		(headerName) => <StructuredListCell head>{headerName}</StructuredListCell>
	);

	const getPersonData = () =>
		people.map(({ name, job, address, hasKids }) => (
			<StructuredListRow label>
				<StructuredListCell>{name}</StructuredListCell>
				<StructuredListCell>{job}</StructuredListCell>
				<StructuredListCell>{address}</StructuredListCell>
				<StructuredListCell>{hasKids.toString()}</StructuredListCell>
			</StructuredListRow>
	));

	listHeader = getListHeaders();
	personData = getPersonData();

	return (
		<>
		{hasPeople ? (
			<StructuredListWrapper>
				<StructuredListHead>
					<StructuredListRow head>
						{listHeader}
					</StructuredListRow>
				</StructuredListHead>
				<StructuredListBody>
					{personData}
				</StructuredListBody>
			</StructuredListWrapper>
		) : (
			<StructuredListSkeleton />
		)}
		</>
	);
};

export default PersonList;
```

4. Add a `CreateModal/index.jsx` structure and add the following content to it:

```jsx
import React from 'react';
import { ComposedModal, ModalHeader, ModalBody, TextInput } from 'carbon-components-react';

const CreateModal = ({ isCreateOpen, setIsCreateOpen }) => {
  return (
    <ComposedModal open={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
      <ModalHeader />
        <ModalBody hasForm>
          <TextInput data-modal-primary-focus labelText="Enter something" />
          <p className="bx--modal-content__text bx--modal-content__regular-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            cursus fermentum risus, sit amet fringilla nunc pellentesque quis. Duis
            quis odio ultrices, cursus lacus ac, posuere felis. Donec dignissim libero
            in augue mattis, a molestie metus vestibulum. Aliquam placerat felis
            ultrices lorem condimentum, nec ullamcorper felis porttitor.
          </p>
      </ModalBody>
</ComposedModal>
  );
};

export default CreateModal;
```

5. Finally we can import all these components in the `App.js` file like so:

```jsx
import HeaderCRUD from './components/Header';
import PersonList from './components/PersonList';
import CreateModal from './components/CreateModal';
.
.
.

return (
		<>
  <HeaderCRUD ariaLabel="IBM Crud Example" prefix="CRUD">
		Sample Application
	</HeaderCRUD>
  <div className="bx--grid bx--grid--full-width app__grid">
	<div className="bx--row">
  <div className="bx--offset-lg-12 bx--col-lg-3">
    <Button className="app__new-btn" onClick={() => setIsCreateOpen(true)}>Add new entry</Button>
    <Button>Refresh</Button>
  </div>
  <div className="bx--offset-lg-1" />
</div>
    <div className="bx--row app__person-row">
      <div className="bx--offset-lg-2 bx--col-lg-12">
				<PersonList headers={["Name", "Job", "Address", "Has Kids"]} people={people} />
      </div>
      <div className="bx--offset-lg-2" />
    </div>
  </div>
	<CreateModal isCreateOpen={isCreateOpen} setIsCreateOpen={setIsCreateOpen} />
</>
	);
```

6. After these changes, we added the new `isCreateOpen` and `setIsCreateOpen` objects with `useState`. Now the `App.js` file should look like this:

```jsx
import { useState, useEffect } from 'react';
import { Button } from 'carbon-components-react';
import HeaderCRUD from './components/Header';
import PersonList from './components/PersonList';
import CreateModal from './components/CreateModal';
import PersonService from './services/PersonService';
import './App.scss';

function App() {
	useEffect(() => {
		onFetch();
	}, []);

	const [people, setPeople] = useState([]);
	const [isCreateOpen, setIsCreateOpen] = useState(false);

	const onFetch = () => {
		PersonService.getAll()
			.then((response) => {
				setPeople(response.data);
			})
			.catch((e) => {
				console.log('Something wrong happened');
			});
	};

	return (
		<>
  <HeaderCRUD ariaLabel="IBM Crud Example" prefix="CRUD">
		Sample Application
	</HeaderCRUD>
  <div className="bx--grid bx--grid--full-width app__grid">
	<div className="bx--row">
  <div className="bx--offset-lg-12 bx--col-lg-3">
    <Button className="app__new-btn" onClick={() => setIsCreateOpen(true)}>Add new entry</Button>
    <Button>Refresh</Button>
  </div>
  <div className="bx--offset-lg-1" />
</div>
    <div className="bx--row app__person-row">
      <div className="bx--offset-lg-2 bx--col-lg-12">
				<PersonList headers={["Name", "Job", "Address", "Has Kids"]} people={people} />
      </div>
      <div className="bx--offset-lg-2" />
    </div>
  </div>
	<CreateModal isCreateOpen={isCreateOpen} setIsCreateOpen={setIsCreateOpen} />
</>
	);
}

export default App;
```

7. With this we completed the refactor of `App.js`, also now we have a modal that will allow us to add more entries on our DB eventually.