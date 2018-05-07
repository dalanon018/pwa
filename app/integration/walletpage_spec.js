describe('Wallet Page', () => {
  before(() => {
    cy.visit('/')
  })

  describe('Homepage Pay with Points', () => {
    it('should contain text "Pay with Points"', () => {
      cy.contains('Pay with Points')
    })

    describe('Check Balance', () => {
      describe('should link to walletpage', () => {
        afterEach(() => {
          cy.visit('/')
        })

        it('should redirect to login if token not existing', () => {
          cy.contains('CHECK BALANCE')
            .click({ force: true })
            .url()
            .should('include', 'login')
        })
      })
    })
  })
})
