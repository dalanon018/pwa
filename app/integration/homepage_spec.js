describe('Should render home', () => {
  before(() => {
    cy.visit('/')
  })

  describe('Should request expected data from API', () => {
    let accessToken

    before(() => {
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
        url: `${Cypress.env('API_BASE_URL')}/productList/featured?deviceOrigin=PWA`,
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

  describe('Homepage Slider', () => {
    it('should have the .slick-slider container and children .slick-slide elements', () => {
      cy.get('.slick-slider').should('exist')
      cy.get('.slick-slide').should('to.have.length.above', 1)
    })
  })

  describe('Homepage Brands', () => {
    it('Homepage should have Brand Carousel featured atleast 8', () => {
      cy.get('[data-cy^="brand-carousel"]').should('to.have.lengthOf', 8)
    })

    describe('Homepage Brands', () => {
      afterEach(() => {
        cy.visit('/')
      })

      it('should have text "More Brands" should link correctly', () => {
        cy.contains('More Brands')
        cy.get('[data-cy="feature-brands"]')
          .find('[data-cy="on-click"]')
          .click({ force: true })
          .url()
          .should('include', 'brands')
      })
    })
  })

  it('Homepage should have text "Featured Items"', () => {
    cy.contains('Featured Items')
  })

  it('Homepage should should have text "Flash Deals" and length of 1', () => {
    cy.contains('Flash Deals').should('to.have.lengthOf', 1)
  })

  describe('Fetch API needed', function () {
    beforeEach(function () {
      // We use cy.visit({onBeforeLoad: ...}) to spy on
      // window.fetch before any app code runs
      cy.visit('/', {
        onBeforeLoad (win) {
          cy.spy(win, 'fetch').as('winFetch')
        }
      })
    })

    it('requests for featured items', function () {
      cy.get('@winFetch').should('to.be.calledWith', `${Cypress.env('API_BASE_URL')}/productList/featured?offset=0&limit=8`)
    })

    it('requests for categories', function () {
      cy.get('@winFetch').should('to.be.calledWith', `${Cypress.env('API_BASE_URL')}/categories`)
    })

    it('requests for brands', function () {
      cy.get('@winFetch').should('to.be.calledWith', `${Cypress.env('API_BASE_URL')}/brands`)
    })

    it('requests for promos', function () {
      cy.get('@winFetch').should('to.be.calledWith', `${Cypress.env('API_BASE_URL')}/promos/?offset=0&limit=1&productOffset=0&productLimit=2`)
    })
  })
})
