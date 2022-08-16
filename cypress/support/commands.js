Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type("Yuri")
    cy.get('#lastName').type("Lobo")
    cy.get('#email').type("yuri@xemplo.com")
    cy.get('#open-text-area').type('Teste')
    cy.get("button[type='submit']").click()
})