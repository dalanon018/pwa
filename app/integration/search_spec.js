describe('Search Page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.fEYmzt > img').click()
  })

  it('It should visit search page', () => {
    cy.url().should('contain', 'search')
  })

  it('It should search product 00001', () => {
    cy.get('input.dFUpKy').type('00001{enter}')
  })

  it('It should go to product page', () => {
    cy.get('input.dFUpKy').type('00001{enter}')
    cy.get('.buPCCx').click()
    cy.url().should('contain', 'product')
  })
})
