describe('Display products on homepage', () => {
  it('It should visit home page', () => {
    cy.visit('/')
    cy.server()
  })

  it('Homepage should have slider', () => {
    cy.visit('/')
    cy.get('.slick-slider').should('exist')
  })

  it('Homepage should FEATURED PRODUCTS AND BROWSE CATEGORY', () => {
    cy.visit('/')
    cy.contains('FEATURED PRODUCTS')
    cy.contains('BROWSE CATEGORY')
  })

  it('It should contains atleast 4 products', () => {
    cy.fixture('products.json').as('productsJSON')
    cy.get('@productsJSON').should('have.lengthOf', 4)
  })
})