describe('Product Page', () => {
  before(() => {
    cy.visit('/')
  })

  it('It should select first product', () => {
    cy.wait(3000)
    cy.get('.kIvCPF div.column:first-child').click()
    cy.url().should('contain', 'product')
  })

  it('We should able to proceed to product review', () => {
    cy.get('.gNIVmr .primary.button').as('orderNow')
    cy.get('.hhpmBF .primary.button').as('submit')

    cy.get('@orderNow').should('contain', 'ORDER NOW!')
    cy.get('@orderNow').click()

    cy.get('.effVFU > input').type('9999999999')
    cy.get('#checkbox > input[type="checkbox"]').check({force: true})

    cy.get('@submit').should('contain', 'SUBMIT')
    cy.get('@submit').click()
    cy.url().should('contain', 'review')
  })

  it('We should able to submit order', () => {
    cy.get('.jmzepx .primary.button').as('proceed')

    cy.get('@proceed').should('contain', 'PROCEED TO NEXT STEP')
    cy.get('@proceed').click()

    cy.server({force404: true})
    cy.route('POST', /getAccountInfo/g).as('accountInfo')
    cy.wait('@accountInfo')

    cy.url().should('contain', 'purchases')
  })
})
