/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
  const THREE_SECONDS_IN_MS = 3000  //Variável criada para ser amplamente usada no "cy.tick" que avança no tempo os 3 segundos

  beforeEach(function () {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  //Seção 3: Exercício extra 1
  it('preenche os campos obrigatórios e envia o formulário', function () {
    //const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste,'

    const longText = Cypress._.repeat('0123456789', 20) //Comando Lodash para criar um texto com 200 caracteres e armazenar na variável "longText"

    cy.clock() //congela o relógio do browser

    cy.get('#firstName').type('Walmir')
    cy.get('#lastName').type('Filho')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
    cy.get('.success').contains('Mensagem enviada com sucesso.')

    cy.tick(THREE_SECONDS_IN_MS) //Variável criada para ser amplamente usada no "cy.tick" que avança no tempo os 3 segundos

    cy.get('.success').should('not.be.visible')
  })

  //Seção 3: Exercício extra 2
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    cy.clock() //congela o relógio do browser

    cy.get('#firstName').type('Walmir')
    cy.get('#lastName').type('Filho')
    cy.get('#email').type('teste@teste')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    cy.get('.error').contains('Valide os campos obrigatórios!')

    cy.tick(THREE_SECONDS_IN_MS) //Variável criada para ser amplamente usada no "cy.tick" que avança no tempo os 3 segundos

    cy.get('.success').should('not.be.visible')
  })

  //Seção 3: Exercício extra 3
  it('campo telefone continua vazio quando preenchido com um valor não-numérico', function () {
    cy.get('#phone')
      .type('string')
      .should('have.value', '')
  })

  //Seção 3: Exercício extra 4
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.clock() //congela o relógio do browser

    cy.get('#firstName').type('Walmir')
    cy.get('#lastName').type('Filho')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type('teste')
    cy.get('#phone-checkbox').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.phone-label-span').contains('(obrigatório)')
    cy.get('.error').should('be.visible')
    cy.get('.error').contains('Valide os campos obrigatórios!')

    cy.tick(THREE_SECONDS_IN_MS) //Variável criada para ser amplamente usada no "cy.tick" que avança no tempo os 3 segundos

    cy.get('.success').should('not.be.visible')
  })

  //Seção 3: Exercício extra 5
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName')
      .type('Walmir')
      .should('have.value', 'Walmir')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Filho')
      .should('have.value', 'Filho')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('teste@teste.com')
      .should('have.value', 'teste@teste.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('1234567890')
      .should('have.value', '1234567890')
      .clear()
      .should('have.value', '')
    cy.get('#open-text-area')
      .type('descrição do teste')
      .should('have.value', 'descrição do teste')
      .clear()
      .should('have.value', '')
  })
  //Seção 3: Exercício extra 6
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {

    cy.clock() //congela o relógio do browser

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    cy.get('.error').contains('Valide os campos obrigatórios!')

    cy.tick(THREE_SECONDS_IN_MS) //Variável criada para ser amplamente usada no "cy.tick" que avança no tempo os 3 segundos

    cy.get('.success').should('not.be.visible')
  })

  //Seção 3: Exercício extra 7
  it('envia o formulário com sucesso usando um comando customizado', function () {
    cy.clock() //congela o relógio do browser

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
    cy.get('.success').contains('Mensagem enviada com sucesso.')

    cy.tick(THREE_SECONDS_IN_MS) //Variável criada para ser amplamente usada no "cy.tick" que avança no tempo os 3 segundos

    cy.get('.success').should('not.be.visible')
  })
  //Seção 3: Exercício extra 8
  it('outras validações usando CONTAINS', function () {
    cy.fillMandatoryFieldsAndSubmit() //Comando customizado do arquivo "commands.js", que preenche os campos obrigatórios e submete

    cy.get('.success').contains('Mensagem enviada com sucesso.')
    cy.contains('.success', 'Mensagem enviada com sucesso.')
  })

  //Seção 4: Exercício 1
  it('seleciona um produto (YouTube) por seu texto', function () {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
      .contains('YouTube')
  })

  //Seção 4: Exercício extra 1
  it('seleciona um produto (Mentoria) por seu valor (value)', function () {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
      .contains('Mentoria')
  })

  //Seção 4: Exercício extra 2
  it('seleciona um produto (Blog) por seu índice', function () {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
      .contains('Blog')
  })

  //Seção 5: Exercício
  it('marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check('feedback')
      .should('have.value', 'feedback')
  })

  //Seção 5: Exercício extra
  it('marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  //Seção 6: Exercício
  it('marca ambos checkboxes, depois desmarca o último', function () {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  //Seção 6: Exercício extra
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.clock()

    cy.get('#firstName').type('Walmir')
    cy.get('#lastName').type('Filho')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type('teste')
    cy.get('#phone-checkbox')
      .check()
      .should('be.checked')
    cy.contains('button', 'Enviar').click()

    cy.get('.phone-label-span').contains('(obrigatório)')
    cy.get('.error').should('be.visible')
    cy.get('.error').contains('Valide os campos obrigatórios!')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
  })

  //Seção 7: Exercício
  it('seleciona um arquivo da pasta fixtures', function () {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  //Seção 7: Exercício extra 1
  it('seleciona um arquivo simulando um drag-and-drop', function () {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })
  //Seção 7: Exercício extra 2 -- Teste que usa a funcionalidade "cy.fixture" que elimina a obrigatoriedade de passar o caminho todo do arquivo que será usado no upload
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]#file-upload')
      .selectFile('@sampleFile')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  //Seção 8: Exercício
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
    cy.get('#privacy [target="_blank"]').contains('Política de Privacidade')
  })

  //Seção 8: Exercício extra 1
  Cypress._.times(3, function () { //Comando Lodash que executa o mesmo teste 3 vezes
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

      cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })
  })

  //Seção 12: Exercício extra 2
  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function () {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  //Seção 12: Exercício extra 3
  it('preenche a area de texto usando o comando invoke', function () {
    const longText = Cypress._.repeat('0123456789', 20) //Comando Lodash para criar um texto com 200 caracteres e armazenar na variável "longText"

    cy.get('#open-text-area')
      .invoke('val', longText)
      .should('have.value', longText)
  })

  //Seção 12: Exercício extra 4
  it('faz uma requisição HTTP', function () {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should(function (response) {
        const { status, statusText, body } = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
      })
  })
  it('encontra o gato escondido', function () {
    cy.get('#cat')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
    cy.get('#title') // Mudando o conteúdo do título
      .invoke('text', 'CAT TAT')
    cy.get('#subtitle') // Mudando o conteúdo do subtítulo
      .invoke('text', 'I ❤️ Cats')
  })
})