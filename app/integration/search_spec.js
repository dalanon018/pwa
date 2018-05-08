describe('Search Page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-cy="search-button"] input').click({ force: true })
  })

  it('It should visit search page', () => {
    cy.url().should('contain', 'search')
  })

  describe('stubbing search page', () => {
    beforeEach(function () {
      cy.visit('http://localhost:3000/search', {
        onBeforeLoad (win) {
          cy.spy(win, 'fetch').as('winFetch')
        }
      })
    })

    it('It should search product bag', () => {
      const searchItem = 'bag'
      cy.get('input').type(`${searchItem}{enter}`)
      cy.get('@winFetch').should('to.be.calledWith', `${Cypress.env('API_BASE_URL')}/search/${searchItem}?deviceOrigin=PWA`)
    })
  })
})
