import {useState, useEffect} from 'react';
import {Button} from 'carbon-components-react';
import HeaderCRUD from './components/Header';
import PersonList from './components/PersonList';
import CrudModal from './components/CrudModal';
import PersonService from './services/PersonService';
import './App.scss';

function App() {
  useEffect(() => {
    onFetch();
  }, []);

  const [people, setPeople] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editModalState, setEditModalState] = useState({
    selectedPerson: {},
    isEditOpen: false,
  });

  const setIsEditOpen = flag => {
    const newEditModalState = {...editModalState};
    newEditModalState.isEditOpen = flag;
    setEditModalState(newEditModalState);
  };

  const onFetch = () => {
    PersonService.getAll()
      .then(response => {
        setPeople(response.data);
      })
      .catch(e => {
        console.log('Something wrong happened');
      });
  };

  const onDelete = id => {
    PersonService.remove(id)
      .then(() => {
        console.log(`The person with the id: ${id} was deleted successfully.`);
        onFetch();
      })
      .catch(e => {
        console.log('Something went wrong while deleting the person.');
      });
  };

  const {selectedPerson, isEditOpen} = editModalState;

  return (
    <>
      <HeaderCRUD ariaLabel="IBM Crud Example" prefix="CRUD">
        Sample Application
      </HeaderCRUD>
      <div className="bx--grid bx--grid--full-width app__grid">
        <div className="bx--row">
          <div
            id="main-btn-container"
            className="bx--offset-lg-12 bx--col-lg-3"
          >
            <Button
              id="add-new-entry"
              className="app__new-btn"
              onClick={() => setIsCreateOpen(true)}
            >
              Add new entry
            </Button>
            <Button id="refresh-entries" onClick={onFetch}>
              Refresh
            </Button>
          </div>
          <div className="bx--offset-lg-1" />
        </div>
        <div className="bx--row app__person-row">
          <div className="bx--offset-lg-2 bx--col-lg-12">
            <PersonList
              headers={['Name', 'Job', 'Address', 'Phone', 'Has Kids']}
              people={people}
              setEditModalState={setEditModalState}
              onDelete={onDelete}
            />
          </div>
          <div className="bx--offset-lg-2" />
        </div>
      </div>
      <CrudModal
        title="Add a new person"
        type="create"
        primaryBtnText="Add"
        isOpen={isCreateOpen}
        setIsOpen={setIsCreateOpen}
        refresh={onFetch}
      />
      {isEditOpen && (
        <CrudModal
          title="Update person data"
          type="update"
          selectedPerson={selectedPerson}
          primaryBtnText="Update entry"
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          refresh={onFetch}
        />
      )}
    </>
  );
}

export default App;
