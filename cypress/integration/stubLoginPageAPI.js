/// <reference types="cypress" />

describe('stubAPI', () => {

    const url = 'https://cloud.couchbase.com/'
    const username = 'vishnu.mani@couchbase.com'
    const password = 'TN09BH6140@1'


    it('loginPage', () => {
        cy.intercept('/sessions').as('getsessions')
        cy.visit(url)
        cy.get("[type='email']").should('be.visible').should('be.enabled').type(username)
        cy.get("[type='password']").should('be.visible').should('be.enabled').type(password)
        cy.get("[type='submit']").should('be.enabled').click()
        cy.wait('@getsessions')
    })

})
