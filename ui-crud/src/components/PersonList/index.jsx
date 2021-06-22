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