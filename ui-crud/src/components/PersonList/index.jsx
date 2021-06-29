import {
	StructuredListWrapper,
	StructuredListHead,
	StructuredListBody,
	StructuredListRow,
	StructuredListCell,
	StructuredListSkeleton,
	Button,
} from 'carbon-components-react';
import { Edit24, SubtractAlt24 } from '@carbon/icons-react';
import './PersonList.scss';

const PersonList = ({ people, headers, setEditModalState, onDelete }) => {
	let listHeader = [];
	let personData = [];
	let hasPeople = people.length > 0;

	const onEditClick = (person) => {
		setEditModalState({
			selectedPerson: person,
			isEditOpen: true,
		});
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
						kind='ghost'
						onClick={() => onEditClick({ id, name, job, address, phone, hasKids })}
					/>
					&nbsp;
					<Button
						className='subtract-icon'
						renderIcon={SubtractAlt24}
						iconDescription='Delete person'
						hasIconOnly
						kind='danger--ghost'
						onClick={() => onDelete(id)}
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
