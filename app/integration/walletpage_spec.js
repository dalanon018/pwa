import 'whatwg-fetch'
import 'babel-polyfill' // polyfill for async and await
import { setItem, clear } from '../utils/localStorage'
import {
  MOBILE_NUMBERS_KEY,
  LOYALTY_TOKEN_KEY
} from '../containers/App/constants'

describe('Wallet Page', () => {
  before(() => {
    cy.visit('/')
  })

  describe('Homepage Pay with Points', () => {
    it('should contain text "Pay with Points"', () => {
      cy.contains('Pay with Points')
    })

    describe('Check Balance', () => {
      describe('should link to wallet page', () => {
        beforeEach(() => {
          clear()
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

  describe('Should load wallet page', () => {
    const mobileNumber = '9261783634'
    const transactionUrl = `${Cypress.env('API_BASE_URL')}/wallet-transactions/0${mobileNumber}?offset=0&limit=999`
    before(async () => {
      cy.visit('/')
      await setItem(LOYALTY_TOKEN_KEY, { token: 'sample-token-cypress', expiry: '2019-05-08 12:30:02' })
      await setItem(MOBILE_NUMBERS_KEY, [mobileNumber])
    })

    it('should proceed to wallets page and should have title "Points Balance"', () => {
      cy.contains('CHECK BALANCE')
        .click({ force: true })
        .url()
        .should('equals', 'http://localhost:3000/wallet')
        .contains('Points Balance')
    })

    describe('should invoke fetch request with correct url', () => {
      beforeEach(() => {
        cy.visit('/wallet', {
          onBeforeLoad (win) {
            cy.spy(win, 'fetch').as('winFetch')
          }
        })
      })

      it('requests wallet-transactions', function () {
        cy.get('@winFetch').should('to.be.calledWith', transactionUrl)
      })
    })
  })
})
