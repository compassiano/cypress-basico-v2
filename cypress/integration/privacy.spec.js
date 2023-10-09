describe('CAC TAT - Política de privacidade', function () {
    beforeEach(function () {
        cy.visit('./src/privacy.html')
    })
    //Seção 8: Exercício extra 2
    it('testa a página da política de privacidade de forma independente', function () {
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
        cy.contains('Talking About Testing').should('be.visible')
    })
})