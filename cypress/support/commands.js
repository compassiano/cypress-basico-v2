// Comando customizado que preenche os campos obrigatórios e submete
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
  cy.get('#firstName').type('Walmir')
  cy.get('#lastName').type('Filho')
  cy.get('#email').type('teste@teste.com')
  cy.get('#open-text-area').type('Teste de descrição')
  cy.contains('button', 'Enviar').click()
})