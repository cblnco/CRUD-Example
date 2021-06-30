# Session 13: Update and delete events.

## Steps for this session:

1. We need to manage a single state for our `CrudModal` that handles edition, so we create `editModalState` and `setEditModalState` with `useState` in `App.js`:

```jsx
function App() {
	useEffect(() => {
		onFetch();
	}, []);

	.
	.
	.

	// Now we manage just one single state for our Edition modal.
	const [editModalState, setEditModalState] = useState({
		selectedPerson: {},
		isEditOpen: false,
	});

	.
	.
	.
}
```

2. Add a new `setIsEditOpen` function in `App.js` to handle the `setIsOpen` reference used in the edition `CrudModal`:

```jsx
const setIsEditOpen = (flag) => {
	const newEditModalState = { ...editModalState };
	newEditModalState.isEditOpen = flag;
	setEditModalState(newEditModalState);
};
```

3. Also add the `onDelete` and get the `editModalState` and `setEditModalState` objects using destructuring before the `return` code section in `App.js`:

```jsx
const onDelete = (id) => {
	PersonService.remove(id)
		.then(() => {
			console.log(`The person with the id: ${id} was deleted successfully.`);
			onFetch();
		})
		.catch((e) => {
			console.log('Something went wrong while deleting the person.');
		});
};

const { selectedPerson, isEditOpen } = editModalState;

return (
	.
	.
	.
)
```

4. Now we need to update our `PersonList` props in `App.js` like this:

```jsx
<PersonList
	headers={['Name', 'Job', 'Address', 'Phone', 'Has Kids']}
	people={people}
	setEditModalState={setEditModalState}
	onDelete={onDelete}
/>
```

5. Then update our edition `CrudModal` with the following code:

```jsx
{
	isEditOpen && (
		<CrudModal
			title='Update person data'
			type='update'
			selectedPerson={selectedPerson}
			primaryBtnText='Update entry'
			isOpen={isEditOpen}
			setIsOpen={setIsEditOpen}
			refresh={onFetch}
		/>
	);
}
```

6. After all these updates in `App.js`, now we need to update the `PersonList` component, first by adding a `Subtract` icon and including new props to it:

```jsx
import { Edit24, SubtractAlt24 } from '@carbon/icons-react';

const PersonList = ({ people, headers, setEditModalState, onDelete }) => {
	.
	.
	.
};
```

7. Update the `onEditClick` event handler with the following code in `PersonList` index file:

```jsx
const onEditClick = (person) => {
	setEditModalState({
		selectedPerson: person,
		isEditOpen: true,
	});
};
```

8. Make these changes to the buttons inside the `getPersonData` function:

```jsx
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
</StructuredListRow>
```

9. With all these changes we can finally create, read, update and delete any person in our application.

**Note:** _You can check all the files in this branch to see all the code changes we have made._
