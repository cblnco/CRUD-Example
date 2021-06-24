# Session 11: Automatic DB entries refresh and name validation.

## Steps for this session:

1. We are going to put a placeholder for the `Update` and `Delete` buttons in our `PersonList` component:

```jsx
const getPersonData = () =>
	people.map(({ name, job, address, phone, hasKids }) => (
		<StructuredListRow label>
			<StructuredListCell>{name}</StructuredListCell>
			<StructuredListCell>{job}</StructuredListCell>
			<StructuredListCell>{address}</StructuredListCell>
			<StructuredListCell>{phone}</StructuredListCell>
			<StructuredListCell>{hasKids.toString()}</StructuredListCell>
			<StructuredListCell>Update | Delete</StructuredListCell>
		</StructuredListRow>
	));
```

2. Add a new prop called `refresh` in the `CreateModal` component used in `App.js` and add an `onFetch` reference to it:

```jsx
<CreateModal
	isCreateOpen={isCreateOpen}
	setIsCreateOpen={setIsCreateOpen}
	refresh={onFetch}
/>
```

3. Include the new `refresh` prop in `CreateModal` component:

```jsx
.
.
.
const CreateModal = ({ isCreateOpen, setIsCreateOpen, refresh }) => {
	.
	.
	.
};
```

4. Now create a `personInitialData` object in `CreateModal` and set it to `personData`:

```jsx
.
.
.
const CreateModal = ({ isCreateOpen, setIsCreateOpen, refresh }) => {
	const personInitialData = {
		name: '',
		job: '',
		address: '',
		phone: '',
		hasKids: false,
	};

	const [isNameInvalid, setIsNameInvalid] = useState(false);
	const [personData, setPersonData] = useState(personInitialData);
};
```

5. Now remove the `onBlur` function and add the following function events:

```jsx
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

const onClose = () => {
	// Clean person data.
	setPersonData(personInitialData);
	setIsCreateOpen(false);
};

const onSubmit = () => {
	if (!isNameInvalid) {
		PersonService.create(personData)
			.then(() => {
				console.log('The new person was created');
				refresh();
			})
			.catch((e) => console.log('An error happened while registering a new person.', e));
	}

	onClose();
};
```

6. Import `useState` from React and add the following variables and event functions:

```jsx
import { useState } from 'react';
.
.
.
const CreateModal = ({ isCreateOpen, setIsCreateOpen }) => {
	const [personData, setPersonData] = useState({
		name: '',
		job: '',
		address: '',
		phone: 21111,
		hasKids: false,
	});

	const onBlur = (event) => {
		const inputName = event.target.name;
		const value = event.target.value;
		const newPerson = { ...personData };
		newPerson[inputName] = value;
		setPersonData(newPerson);
	};

	const onClose = () => {
		setPersonData({
			name: '',
			job: '',
			address: '',
			phone: 21111,
			hasKids: false,
		});
		setIsCreateOpen(false);
	};

	const onSubmit = () => {
		PersonService.create(personData)
			.then(() => console.log('The new person was created'))
			.catch((e) => console.log('An error happened while registering a new person', e));

		onClose();
	};

	.
	.
	.
};
```

7. To fully control our `TextInput` components we need to add a refernece of the `name` value to them and also integrate the `onChange` event:

```jsx
const { name, job, address, phone, hasKids } = personData;

return (
	<ComposedModal open={isCreateOpen} onClose={onClose}>
		<ModalHeader title='Add a new person.' />
		<ModalBody hasForm>
			<div className='bx--grid bx--grid--full-width'>
				<div className='bx--row create-modal__row'>
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
				<div className='bx--row create-modal__row'>
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
				<div className='bx--row create-modal__row'>
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
				<div className='bx--row create-modal__row'>
					<div className='bx--col-lg-4'>
						<TextInput
							id='person-phone'
							type='number'
							name='phone'
							data-modal-primary-focus
							labelText='Phone'
							placeholder='8834000'
							value={phone}
							onChange={onChange}
						/>
					</div>
					<div className='bx--offset-lg-12' />
				</div>
				<div className='bx--row create-modal__row'>
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
			primaryButtonText='Add'
			secondaryButtonText='Cancel'
			onRequestClose={onClose}
			onRequestSubmit={onSubmit}
		/>
	</ComposedModal>
);
```

8. At the end, our `CreateModal` component should look like this:

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
import './CreateModal.scss';

const CreateModal = ({ isCreateOpen, setIsCreateOpen, refresh }) => {
	const personInitialData = {
		name: '',
		job: '',
		address: '',
		phone: '',
		hasKids: false,
	};

	const [isNameInvalid, setIsNameInvalid] = useState(false);
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

	const onPhoneBlur = () => {
		const newPhone = personData.phone;
		const newPerson = { ...personData };
		newPerson.phone = newPhone.replace(/\D/, '');
		setPersonData(newPerson);
	};

	const onClose = () => {
		// Clean person data.
		setPersonData(personInitialData);
		setIsCreateOpen(false);
	};

	const onSubmit = () => {
		if (!isNameInvalid) {
			PersonService.create(personData)
				.then(() => {
					console.log('The new person was created');
					refresh();
				})
				.catch((e) =>
					console.log('An error happened while registering a new person.', e)
				);
		}

		onClose();
	};

	const { name, job, address, phone, hasKids } = personData;

	return (
		<ComposedModal open={isCreateOpen} onClose={onClose}>
			<ModalHeader title='Add a new person.' />
			<ModalBody hasForm>
				<div className='bx--grid bx--grid--full-width'>
					<div className='bx--row create-modal__row'>
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
					<div className='bx--row create-modal__row'>
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
					<div className='bx--row create-modal__row'>
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
					<div className='bx--row create-modal__row'>
						<div className='bx--col-lg-4'>
							<TextInput
								id='person-phone'
								type='number'
								name='phone'
								data-modal-primary-focus
								labelText='Phone'
								placeholder='8834000'
								value={phone}
								onChange={onChange}
							/>
						</div>
						<div className='bx--offset-lg-12' />
					</div>
					<div className='bx--row create-modal__row'>
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
				primaryButtonText='Add'
				secondaryButtonText='Cancel'
				onRequestClose={onClose}
				onRequestSubmit={onSubmit}
			/>
		</ComposedModal>
	);
};

export default CreateModal;
```

**Note:** _You can check all the files in this branch to see all the code changes we have made._
