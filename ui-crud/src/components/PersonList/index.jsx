import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
  StructuredListSkeleton,
  Button,
} from 'carbon-components-react';
import {Edit24, SubtractAlt24} from '@carbon/icons-react';

const PersonList = ({people, headers, setEditModalState, onDelete}) => {
  let listHeader = [];
  let personData = [];
  let hasPeople = people.length > 0;

  const onEditClick = person => {
    setEditModalState({
      selectedPerson: person,
      isEditOpen: true,
    });
  };

  const getListHeaders = () =>
    headers.map((headerName, index) => (
      <StructuredListCell head key={`header-${headerName}-${index}`}>
        {headerName}
      </StructuredListCell>
    ));

  const getPersonData = () =>
    people.map(({id, name, job, address, phone, hasKids}) => (
      <StructuredListRow label key={`person-${id}-info`}>
        <StructuredListCell key={`person-${id}-name`}>
          {name}
        </StructuredListCell>
        <StructuredListCell key={`person-${id}-job`}>{job}</StructuredListCell>
        <StructuredListCell key={`person-${id}-address`}>
          {address}
        </StructuredListCell>
        <StructuredListCell key={`person-${id}-phone`}>
          {phone}
        </StructuredListCell>
        <StructuredListCell key={`person-${id}-hasKids`}>
          {hasKids.toString()}
        </StructuredListCell>
        <StructuredListCell key={`person-${id}-buttons`}>
          <Button
            id={`btn-edit-${id}`}
            key={`person-${id}-edit-btn`}
            renderIcon={Edit24}
            iconDescription="Edit person"
            hasIconOnly
            kind="ghost"
            onClick={() =>
              onEditClick({id, name, job, address, phone, hasKids})
            }
          />
          &nbsp;
          <Button
            id={`btn-delete-${id}`}
            key={`person-${id}-del-btn`}
            className="subtract-icon"
            renderIcon={SubtractAlt24}
            iconDescription="Delete person"
            hasIconOnly
            kind="danger--ghost"
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
