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
