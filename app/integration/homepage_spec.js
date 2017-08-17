describe('Should render home', () => {
  describe('Should request data for home page', () => {
    let accessToken

    beforeEach(() => {
      cy.visit('/')

      const params = {
        client_id: Cypress.env('OATH_CLIENT_ID'),
        client_secret: Cypress.env('OATH_CLIENT_SECRET'),
        response_type: Cypress.env('OATH_RESPONSE_TYPE'),
        grant_type: Cypress.env('OATH_GRANT_TYPE')
      }

      const urlencodedParams = Object.keys(params).map((key) =>
        `${key}=${params[key]}`
      ).join('&')

      cy.request({
        method: 'POST',
        url: Cypress.env('TOKEN_URL'),
        body: urlencodedParams
      }).then((response) => {
        const { body } = response
        accessToken = body.access_token
      })
    })

    it('it should request for categories', () => {
      cy.request({
        url: `${Cypress.env('API_BASE_URL')}/categories`,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then((response) => {
        const { body } = response
        expect(response.status).to.eq(200)
        expect(body).to.have.property('categoryList')
        expect(body.categoryList).to.have.length.above(1)
      })
    })

    it('it should request for products by Featured', () => {
      cy.request({
        url: `${Cypress.env('API_BASE_URL')}/tags/FEATURED?deviceOrigin=PWA`,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then((response) => {
        const { body } = response
        expect(response.status).to.eq(200)
        expect(body).to.have.property('productList')
        expect(body.productList).to.have.length.above(1)
      })
    })
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

  it('It should contain products', () => {
    cy.visit('/')
    cy.wait('5000')

    cy.get('.dFAASG').should('exist')
  })
})
