import { useState, useEffect } from 'react';
import {
	Header,
	HeaderName,
	Button,
	StructuredListWrapper,
	StructuredListHead,
	StructuredListBody,
	StructuredListRow,
	StructuredListCell,
	StructuredListSkeleton,
} from 'carbon-components-react';
import PersonList from './components/PersonList';
import PersonService from './services/PersonService';
import './App.scss';

function App() {
	useEffect(() => {
		onFetch();
	}, []);

	const [people, setPeople] = useState([]);

	const onFetch = () => {
		PersonService.getAll()
			.then((response) => {
				setPeople(response.data);
			})
			.catch((e) => {
				console.log('Something wrong happened');
			});
	};

	const getPersonData = () =>
		people.map(({ name, job, address, hasKids }) => (
			<StructuredListRow label>
				<StructuredListCell>{name}</StructuredListCell>
				<StructuredListCell>{job}</StructuredListCell>
				<StructuredListCell>{address}</StructuredListCell>
				<StructuredListCell>{hasKids.toString()}</StructuredListCell>
			</StructuredListRow>
		));

	return (
		<>
  <Header aria-label="IBM Platform Name">
    <HeaderName prefix="CRUD">Sample Application</HeaderName>
  </Header>
  <div className="bx--grid bx--grid--full-width app__grid">
	<div className="bx--row">
  <div className="bx--offset-lg-12 bx--col-lg-3">
    <Button className="app__new-btn">Add new entry</Button>
    <Button>Refresh</Button>
  </div>
  <div className="bx--offset-lg-1" />
</div>
    <div className="bx--row app__person-row">
      <div className="bx--offset-lg-2 bx--col-lg-12">
        {people.length > 0 ? (
          <StructuredListWrapper>
            <StructuredListHead>
              <StructuredListRow head>
                <StructuredListCell head>Name</StructuredListCell>
                <StructuredListCell head>Job</StructuredListCell>
                <StructuredListCell head>Address</StructuredListCell>
                <StructuredListCell head>Has Kids</StructuredListCell>
              </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>{getPersonData()}</StructuredListBody>
          </StructuredListWrapper>
        ) : (
          <StructuredListSkeleton />
        )}
      </div>
      <div className="bx--offset-lg-2" />
    </div>
  </div>
</>
	);
}

export default App;
