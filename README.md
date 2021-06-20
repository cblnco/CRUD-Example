# Session 8: Carbon Design system grid.

## Optional extensions.:

- [Prettier extension for VSCode.](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Steps for this session:

1. Install Carbon grid with the following command:

```bash
yarn add @carbon/grid@10.17.0
```

2. The grid uses 12 columns by default, in this project we will use the 16 column grid with this code in our `index.scss` file:

```scss
$feature-flags: (
  grid-columns-16: true,
);

// Make sure to enable the 16 column grid before this line that imports all of the Carbon styles.
@import 'carbon-components/scss/globals/scss/styles.scss';
```

3. To avoid Carbon styles clashing with Create React App style we're going to delete the following files including their impors on the project:

```
ui-crud/src/App.css
ui-crud/src/index.css
```

4. Also remove the `ui-crud/src/logo.svg` file since we're not going to use it.

5. Save the previous changes and start your application with `yarn start`.

6. Create an `App.scss` file in the `src` directory with the following content:

```scss
@import 'carbon-components/scss/globals/scss/vendor/@carbon/layout/scss/breakpoint.scss';
@import 'carbon-components/scss/globals/scss/vars.scss';

.app__grid {
  padding-top: $spacing-05 * 7;
}
```

7. Now we need to reference the Carbon Grid styles in our `App.js` code like this:

```jsx
<>
  <Header aria-label="IBM Platform Name">
    <HeaderName prefix="CRUD">Sample Application</HeaderName>
  </Header>
  <div className="bx--grid bx--grid--full-width app__grid">
    <div className="bx--row">
      <div className="bx--offset-lg-2 bx--col-lg-12">
        <StructuredListWrapper>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head>Name</StructuredListCell>
              <StructuredListCell head>Job</StructuredListCell>
              <StructuredListCell head>Address</StructuredListCell>
              <StructuredListCell head>Has Kids</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            {people.length > 0 && getPersonData()}
          </StructuredListBody>
        </StructuredListWrapper>
      </div>
      <div className="bx--offset-lg-2" />
    </div>
  </div>
</>
```

7. In order to fetch the Person data we need to import the `useEffect` function in `App.js` and add into our file:

```jsx
useEffect(() => {
  onFetch();
}, []);
```

8. Then import the `StructuredListSkeleton` component from Carbon and use it in the JSX like this:

```jsx
<>
  <Header aria-label="IBM Platform Name">
    <HeaderName prefix="CRUD">Sample Application</HeaderName>
  </Header>
  <div className="bx--grid bx--grid--full-width app__grid">
    <div className="bx--row">
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
```

9. Add these new styles in `App.scss` file:

```scss
.app__person-row {
  padding-top: $spacing-05 * 3;
}

.app__new-btn {
  margin-right: $spacing-01;
}
```

10. Add the following set of buttons before the row that contains the `StructuredList` component:

```jsx
<div className="bx--row">
  <div className="bx--offset-lg-12 bx--col-lg-3">
    <Button className="app__new-btn">Add new entry</Button>
    <Button>Refresh</Button>
  </div>
  <div className="bx--offset-lg-1" />
</div>
```

11. Create a `components` directory under `src`.

12. Then create a file called `PersonList.jsx` and create a component that only contains all related code that renders the person data in the UI.

13. Import `PersonList.jsx` in `App.js` in order to use it.

14. After all these changes your `App.js` file should look like this:

```jsx

```
