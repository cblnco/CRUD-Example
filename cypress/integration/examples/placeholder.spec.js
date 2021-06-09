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
