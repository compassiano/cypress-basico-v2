Cypress._.times(5, function () { //Comando Lodash que executa o mesmo teste 5 vezes
  it('testa a página da política de privacidade de forma independente', function () {
    cy.visit('./src/privacy.html')
    cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    cy.contains('Talking About Testing').should('be.visible')
  })
})