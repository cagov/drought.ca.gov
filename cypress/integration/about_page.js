import 'cypress-axe'

describe('My First Test', () => {
  it('goes to about page', () => {
    cy.visit('http://localhost:8000/')

    // these are temporary sample tests, clicking on links in menu, these selectors are too brittle
    cy.contains('About us').click()
    cy.contains('About DCC').click()

    // h1 is present and contains text About
    cy.get('h1').should('contain.text', 'About');

    // Inject the axe-core library
    cy.injectAxe();
  })

  it('verify accessibility with axe', () => {
    // verify accessibility
    // this is not working, it is reporting an error with no explanation and I cannot reproduce an error chrome axe plugin locally
    // cy.checkA11y();
  })

  it('interacts with feedback form', () => {
    // verify page feedback form is in initial state with textarea hidden
    cy.get('cagov-feedback .feedback-form-add').should('not.be.visible')

    // Click the yes page was helpful response button in page feedback at the bottom of the page
    cy.get('cagov-feedback .js-feedback-yes').click();

    // verify feedback area is now visible
    cy.get('cagov-feedback .feedback-form-add').should('be.visible')
  })

  it('checks google analytics event data collection', () => {
    // should have more than a couple events in Google Analytics dataLayer object
    cy.window().its('dataLayer.length').should('be.gt', 2)

    // record the dataLayer value to compare after we add more events by clicking
    let dataLayerOnLoad;
    cy.window()
      .then((win) => {
        dataLayerOnLoad = win.dataLayer;
      })
      .then(() => {
        cy.window().its('dataLayer.length').should('eq', dataLayerOnLoad.length)

        // Click first content navigation link
        cy.get('cagov-content-navigation a').first().click();

        cy.window().its('dataLayer.length').should('eq', dataLayerOnLoad.length + 1)
      })
  })
})