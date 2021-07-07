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
	id = '',
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
		<ComposedModal id={id} open={isOpen} onClose={onClose}>
			<ModalHeader id={`${id}-header`} title={title} />
			<ModalBody id={`${id}-body`} hasForm>
				<div className='bx--grid bx--grid--full-width'>
					<div className='bx--row crud-modal__row'>
						<div className='bx--col-lg-8'>
							<TextInput
								id={`${id}person-name`}
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
								id={`${id}person-job`}
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
								id={`${id}person-address`}
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
								id={`${id}person-phone`}
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
								id={`${id}person-haskids`}
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
