# Session 10: Creating new entries in our API.

## Steps for this session:

1. First we need to include the `phone` value our `PersonList` component, so we can display all the registered values:

```jsx
const getPersonData = () =>
	people.map(({ name, job, address, phone, hasKids }) => (
		<StructuredListRow label>
			<StructuredListCell>{name}</StructuredListCell>
			<StructuredListCell>{job}</StructuredListCell>
			<StructuredListCell>{address}</StructuredListCell>
			<StructuredListCell>{phone}</StructuredListCell>
			<StructuredListCell>{hasKids.toString()}</StructuredListCell>
		</StructuredListRow>
	));
```

2. Make sure to include the `Phone` header in the props of `PersonList` that is used in `App.js`:

```jsx
<div className='bx--row app__person-row'>
	<div className='bx--offset-lg-2 bx--col-lg-12'>
		<PersonList
			headers={['Name', 'Job', 'Address', 'Phone', 'Has Kids']}
			people={people}
		/>
	</div>
	<div className='bx--offset-lg-2' />
</div>
```

3. Add a `CreateModal.scss` file under `/src/components/CreateModal` with the following content:

```scss
@import 'carbon-components/scss/globals/scss/vendor/@carbon/layout/scss/breakpoint.scss';
@import 'carbon-components/scss/globals/scss/vars.scss';

.create-modal__row {
	margin-bottom: $spacing-05 + $spacing-01;
}
```

3. Then we need to modify our `CreateModal` component and import the `ModalFooter` and `Checkbox` components:

```jsx
import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	TextInput,
	Checkbox,
} from 'carbon-components-react';
```

4. Also import the `PersonService` object so we can communicate with the Mongo API:

```jsx
import PersonService from '../../services/PersonService';
```

5. Import `useState` from React and add the following variables and event functions:

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

6. Now we need to integrate all the components, event functions and data ito our modal body:

```jsx
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
						onBlur={onBlur}
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
						onBlur={onBlur}
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
						onBlur={onBlur}
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
						onBlur={onBlur}
					/>
				</div>
				<div className='bx--offset-lg-12' />
			</div>
			<div className='bx--row create-modal__row'>
				<div className='bx--col-lg-3'>
					<Checkbox
						id='person-haskids'
						name='hasKids'
						labelText='Has kids'
						checked={personData.hasKids}
						onBlur={onBlur}
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
```

7. At the end, our `CreateModal` component should look like this:

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
								onBlur={onBlur}
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
								onBlur={onBlur}
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
								onBlur={onBlur}
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
								onBlur={onBlur}
							/>
						</div>
						<div className='bx--offset-lg-12' />
					</div>
					<div className='bx--row create-modal__row'>
						<div className='bx--col-lg-3'>
							<Checkbox
								id='person-haskids'
								name='hasKids'
								labelText='Has kids'
								checked={personData.hasKids}
								onBlur={onBlur}
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

8. Now we can add new entries into our API.

**Note:** _You can check all the files in this branch to see all the code changes we have made._
