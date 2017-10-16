describe('Search Page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-attribute="search"] input').click()
  })

  it('It should visit search page', () => {
    cy.url().should('contain', 'search')
  })

  describe('stubbing search page', () => {
    beforeEach(function () {
      cy.visit('http://localhost:3000/search', {
        onBeforeLoad (win) {
          cy.spy(win, 'fetch')
        }
      })
    })

    it('It should search product bag', () => {
      const searchItem = 'bag'

      cy.get('input').type(`${searchItem}{enter}`)
      cy.window().its('fetch').should('be.calledWith', `https://apidemo.cliqq.net:8443/ecms/api/v1/search/${searchItem}?deviceOrigin=PWA`)
    })
  })
})
