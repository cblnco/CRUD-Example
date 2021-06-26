# Session 12: Reusable Component.

## Steps for this session:

1. Rename the component the directory `CreateModal` to `CrudModal`.

2. Also rename every file that contains `CreateModal` into `CrudModal`, this iclude import sentences and `.scss` files.

3. Change the style class name `.create-modal__row` to `.crud-modal__row` in `CrudModal.scss`:

4. Now we have to integrate new props, `.scss` style import and update the `personData` initialization into our `CrudModal` component:

```jsx
import { useState } from 'react';
import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	TextInput,
	Checkbox,
} from 'carbon-components-react';
import PersonService from '../../services/PersonService';
import './CrudModal.scss';

const CrudModal = ({
	title,
	type,
	primaryBtnText,
	isOpen,
	setIsOpen,
	selectedPerson,
	refresh,
}) => {
	const personInitialData = selectedPerson || {
		name: '',
		job: '',
		address: '',
		phone: '',
		hasKids: false,
	};

	.
	.
	.

};
```

5. Update the `CrudModal` state hooks and `onPhoneBlur`, `onClose` and `onSubmit` events with the following changes:

```jsx
	const [isNameInvalid, setIsNameInvalid] = useState(false);
	const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);
	const [personData, setPersonData] = useState(personInitialData);

	.
	.
	.

	const onPhoneBlur = (event) => {
		const value = event.target.value;
		setIsPhoneInvalid(!value);
	};

	const onClose = () => {
		// Clean person data.
		setPersonData(personInitialData);
		setIsNameInvalid(false);
		setIsPhoneInvalid(false);
		setIsOpen(false);
	};

	const onSubmit = () => {
		if (!isNameInvalid && !isPhoneInvalid) {
			switch (type) {
				case 'create':
					PersonService.create(personData)
						.then(() => {
							console.log('The new person was created.');
							refresh();
						})
						.catch((e) =>
							console.log('An error happened while registering a new person.', e)
						);
					break;

				case 'update':
					const { id, ...newPersonData } = personData;
					PersonService.update(id, newPersonData)
						.then(() => {
							console.log('The new person was update.');
							refresh();
						})
						.catch((e) => console.log('An error happened while updating the person.', e));
					break;

				default:
					break;
			}

			onClose();
		}
	};
```

6. Then, we need to update our function event references and class names in the `jsx` code of the `CrudModal` component:

```jsx
const { name, job, address, phone, hasKids } = personData;

return (
	<ComposedModal open={isOpen} onClose={onClose}>
		<ModalHeader title={title} />
		<ModalBody hasForm>
			<div className='bx--grid bx--grid--full-width'>
				<div className='bx--row crud-modal__row'>
					<div className='bx--col-lg-8'>
						<TextInput
							id='person-name'
							name='name'
							data-modal-primary-focus
							labelText='Name'
							placeholder='Jhon Smith'
							value={name}
							invalid={isNameInvalid}
							invalidText='Your name shouldnt be empty and should be loger than 5 characters.'
							onBlur={onNameBlur}
							onChange={onChange}
						/>
					</div>
					<div className='bx--offset-lg-8' />
				</div>
				<div className='bx--row crud-modal__row'>
					<div className='bx--col-lg-6'>
						<TextInput
							id='person-job'
							name='job'
							data-modal-primary-focus
							labelText='Job'
							placeholder='Lawyer'
							value={job}
							onChange={onChange}
						/>
					</div>
					<div className='bx--offset-lg-10' />
				</div>
				<div className='bx--row crud-modal__row'>
					<div className='bx--col-lg-9'>
						<TextInput
							id='person-address'
							name='address'
							data-modal-primary-focus
							labelText='Address'
							placeholder='Great st. #1124'
							value={address}
							onChange={onChange}
						/>
					</div>
					<div className='bx--offset-lg-7' />
				</div>
				<div className='bx--row crud-modal__row'>
					<div className='bx--col-lg-4'>
						<TextInput
							id='person-phone'
							type='number'
							name='phone'
							data-modal-primary-focus
							labelText='Phone'
							placeholder='8834000'
							value={phone}
							invalid={isPhoneInvalid}
							invalidText='Please add numbers only.'
							onChange={onChange}
							onBlur={onPhoneBlur}
						/>
					</div>
					<div className='bx--offset-lg-12' />
				</div>
				<div className='bx--row crud-modal__row'>
					<div className='bx--col-lg-3'>
						<Checkbox
							id='person-haskids'
							name='hasKids'
							title='Family information'
							labelText='Do you have kids?'
							checked={hasKids}
							onChange={onHasKidsChange}
						/>
					</div>
					<div className='bx--offset-lg-12' />
				</div>
			</div>
		</ModalBody>
		<ModalFooter
			primaryButtonText={primaryBtnText}
			secondaryButtonText='Cancel'
			onRequestClose={onClose}
			onRequestSubmit={onSubmit}
		/>
	</ComposedModal>
);
```

7. The full `CrudModal` component changes should look like this at the end:

```jsx
import { useState } from 'react';
import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	TextInput,
	Checkbox,
} from 'carbon-components-react';
import PersonService from '../../services/PersonService';
import './CrudModal.scss';

const CrudModal = ({
	title,
	type,
	primaryBtnText,
	isOpen,
	setIsOpen,
	selectedPerson,
	refresh,
}) => {
	const personInitialData = selectedPerson || {
		name: '',
		job: '',
		address: '',
		phone: '',
		hasKids: false,
	};

	const [isNameInvalid, setIsNameInvalid] = useState(false);
	const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);
	const [personData, setPersonData] = useState(personInitialData);

	const onChange = (event) => {
		const inputName = event.target.name;
		const value = event.target.value;
		const newPerson = { ...personData };
		newPerson[inputName] = value;
		setPersonData(newPerson);
	};

	const onHasKidsChange = ({ value }) => {
		const newPerson = { ...personData };
		newPerson.hasKids = value;
		setPersonData(newPerson);
	};

	const onNameBlur = (event) => {
		const value = event.target.value;
		setIsNameInvalid(!value || value.length < 5);
	};

	const onPhoneBlur = (event) => {
		const value = event.target.value;
		setIsPhoneInvalid(!value);
	};

	const onClose = () => {
		// Clean person data.
		setPersonData(personInitialData);
		setIsNameInvalid(false);
		setIsPhoneInvalid(false);
		setIsOpen(false);
	};

	const onSubmit = () => {
		if (!isNameInvalid && !isPhoneInvalid) {
			switch (type) {
				case 'create':
					PersonService.create(personData)
						.then(() => {
							console.log('The new person was created.');
							refresh();
						})
						.catch((e) =>
							console.log('An error happened while registering a new person.', e)
						);
					break;

				case 'update':
					const { id, ...newPersonData } = personData;
					PersonService.update(id, newPersonData)
						.then(() => {
							console.log('The new person was update.');
							refresh();
						})
						.catch((e) => console.log('An error happened while updating the person.', e));
					break;

				default:
					break;
			}

			onClose();
		}
	};

	const { name, job, address, phone, hasKids } = personData;

	return (
		<ComposedModal open={isOpen} onClose={onClose}>
			<ModalHeader title={title} />
			<ModalBody hasForm>
				<div className='bx--grid bx--grid--full-width'>
					<div className='bx--row crud-modal__row'>
						<div className='bx--col-lg-8'>
							<TextInput
								id='person-name'
								name='name'
								data-modal-primary-focus
								labelText='Name'
								placeholder='Jhon Smith'
								value={name}
								invalid={isNameInvalid}
								invalidText='Your name shouldnt be empty and should be loger than 5 characters.'
								onBlur={onNameBlur}
								onChange={onChange}
							/>
						</div>
						<div className='bx--offset-lg-8' />
					</div>
					<div className='bx--row crud-modal__row'>
						<div className='bx--col-lg-6'>
							<TextInput
								id='person-job'
								name='job'
								data-modal-primary-focus
								labelText='Job'
								placeholder='Lawyer'
								value={job}
								onChange={onChange}
							/>
						</div>
						<div className='bx--offset-lg-10' />
					</div>
					<div className='bx--row crud-modal__row'>
						<div className='bx--col-lg-9'>
							<TextInput
								id='person-address'
								name='address'
								data-modal-primary-focus
								labelText='Address'
								placeholder='Great st. #1124'
								value={address}
								onChange={onChange}
							/>
						</div>
						<div className='bx--offset-lg-7' />
					</div>
					<div className='bx--row crud-modal__row'>
						<div className='bx--col-lg-4'>
							<TextInput
								id='person-phone'
								type='number'
								name='phone'
								data-modal-primary-focus
								labelText='Phone'
								placeholder='8834000'
								value={phone}
								invalid={isPhoneInvalid}
								invalidText='Please add numbers only.'
								onChange={onChange}
								onBlur={onPhoneBlur}
							/>
						</div>
						<div className='bx--offset-lg-12' />
					</div>
					<div className='bx--row crud-modal__row'>
						<div className='bx--col-lg-3'>
							<Checkbox
								id='person-haskids'
								name='hasKids'
								title='Family information'
								labelText='Do you have kids?'
								checked={hasKids}
								onChange={onHasKidsChange}
							/>
						</div>
						<div className='bx--offset-lg-12' />
					</div>
				</div>
			</ModalBody>
			<ModalFooter
				primaryButtonText={primaryBtnText}
				secondaryButtonText='Cancel'
				onRequestClose={onClose}
				onRequestSubmit={onSubmit}
			/>
		</ComposedModal>
	);
};

export default CrudModal;
```

9. Import the `Button` component and `Edit24` icon in the `PersonList` component:

```jsx
import {
	StructuredListWrapper,
	StructuredListHead,
	StructuredListBody,
	StructuredListRow,
	StructuredListCell,
	StructuredListSkeleton,
	Button, // New addition.
} from 'carbon-components-react';
import { Edit24 } from '@carbon/icons-react'; // New addition.
```

10. Add a `onEditClick` event into the `PersonList` component, including these changes:

```jsx
const PersonList = ({ people, headers, setSelectedPerson }) => {
	let listHeader = [];
	let personData = [];
	let hasPeople = people.length > 0;

	const onEditClick = (person) => {
		setSelectedPerson(person);
	};

	const getListHeaders = () =>
		headers.map((headerName) => (
			<StructuredListCell head>{headerName}</StructuredListCell>
		));

	const getPersonData = () =>
		people.map(({ id, name, job, address, phone, hasKids }) => (
			<StructuredListRow label>
				<StructuredListCell>{name}</StructuredListCell>
				<StructuredListCell>{job}</StructuredListCell>
				<StructuredListCell>{address}</StructuredListCell>
				<StructuredListCell>{phone}</StructuredListCell>
				<StructuredListCell>{hasKids.toString()}</StructuredListCell>
				<StructuredListCell>
					<Button
						renderIcon={Edit24}
						iconDescription='Edit person'
						hasIconOnly
						onClick={() => onEditClick({ id, name, job, address, phone, hasKids })}
					/>
				</StructuredListCell>
			</StructuredListRow>
		));

	listHeader = getListHeaders();
	personData = getPersonData();

	return (
		<>
			{hasPeople ? (
				<StructuredListWrapper>
					<StructuredListHead>
						<StructuredListRow head>{listHeader}</StructuredListRow>
					</StructuredListHead>
					<StructuredListBody>{personData}</StructuredListBody>
				</StructuredListWrapper>
			) : (
				<StructuredListSkeleton />
			)}
		</>
	);
};

export default PersonList;
```

10. Finally update the `App.js` file with these changes that add the new `CrudModal` component, `selectedPerson` and `isEditOpen` state variables:

```jsx
import CrudModal from './components/CrudModal';
import PersonService from './services/PersonService';
import './App.scss';

function App() {
	useEffect(() => {
		onFetch();
	}, []);

	const [people, setPeople] = useState([]);
	const [selectedPerson, setSelectedPerson] = useState({});
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);

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
			<HeaderCRUD ariaLabel='IBM Crud Example' prefix='CRUD'>
				Sample Application
			</HeaderCRUD>
			<div className='bx--grid bx--grid--full-width app__grid'>
				<div className='bx--row'>
					<div className='bx--offset-lg-12 bx--col-lg-3'>
						<Button className='app__new-btn' onClick={() => setIsCreateOpen(true)}>
							Add new entry
						</Button>
						<Button onClick={onFetch}>Refresh</Button>
					</div>
					<div className='bx--offset-lg-1' />
				</div>
				<div className='bx--row app__person-row'>
					<div className='bx--offset-lg-2 bx--col-lg-12'>
						<PersonList
							headers={['Name', 'Job', 'Address', 'Phone', 'Has Kids']}
							people={people}
							setIsEditOpen={setIsEditOpen}
							setSelectedPerson={setSelectedPerson}
						/>
					</div>
					<div className='bx--offset-lg-2' />
				</div>
			</div>
			<CrudModal
				title='Add a new person'
				type='create'
				primaryBtnText='Add'
				isOpen={isCreateOpen}
				setIsOpen={setIsCreateOpen}
				refresh={onFetch}
			/>
			<CrudModal
				title='Update person data'
				type='update'
				selectedPerson={selectedPerson}
				primaryBtnText='Update entry'
				isOpen={isEditOpen}
				setIsOpen={setIsEditOpen}
				refresh={onFetch}
			/>
		</>
	);
}

export default App;
```

**Note:** _You can check all the files in this branch to see all the code changes we have made._
