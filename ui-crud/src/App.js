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
						/>
					</div>
					<div className='bx--offset-lg-2' />
				</div>
			</div>
			<CreateModal isCreateOpen={isCreateOpen} setIsCreateOpen={setIsCreateOpen} />
		</>
	);
}

export default App;
