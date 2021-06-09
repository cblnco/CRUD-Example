# Session 2: Working with Cypress.

## Prerequisites:

```
Cypress.
```

## Steps for this session:

1. Install Cypress with the following command:
```bash
npm install --save-dev cypress
```
2. Create a folder with this directory struicture `cypress > integration > examples` in the root directory of the project.

3. Create a file called `placeholder.spec.js` inside of the previous `examples` folder with the following code:
```js
describe('Test JSONPlaceholder API', () => {
  // More info about this API: https://jsonplaceholder.typicode.com/guide/.
  Cypress.config("baseUrl","https://jsonplaceholder.typicode.com");

  it('Verify post 55', () => {
      cy.request({
          method: 'GET',
          url: "/posts/55"
      })
      .then((response) => {
          expect(response.body).to.not.be.null;
          expect(response.body).have.property('userId', 6);
      });
  });

  it('Updates post 55', () => {
      const data = { 
          id: 1,
          title: 'Test title',
          body: 'Sample body',
          userId: 1,
      };

      cy.request('PUT', "/posts/55", data).then((response) => {
          const { body } = response;
          expect(body).have.property('title', data.title);
          expect(body).have.property('body', data.body);
          expect(body).have.property('userId', data.userId);
      });
  });

  it('Creates post 77', () => {
      const data = { 
          id: 77,
          title: '77th Post',
          body: 'Hello world',
          userId: 5,
      };

      cy.request('POST', "/posts/", data).its('status').should('eq', 201);
  });
});
```

4. Run the following command:

```bash
npx cypress open
```

## Extra steps:

- Test positive and negative scenarios.
- Test a different entity on the API.
- Visit [Cypress website](https://docs.cypress.io/guides/references/assertions#TDD-Assertions) to learn more about assertions.
