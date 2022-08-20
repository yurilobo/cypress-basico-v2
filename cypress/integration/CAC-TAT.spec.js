// CAC-TAT.spec.js created with Cypress
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const Tres_seg=3000
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.clock()
        const longText='Teste, teste, teste teste teste teste, teste , teste teste, teste, tesste, teste, teste, test ,test, Teste, teste, teste teste teste teste, teste , teste teste, teste, tesste, teste, teste, test ,test, Teste, teste, teste teste teste teste, teste , teste teste, teste, tesste, teste, teste, test ,test, Teste, teste, teste teste teste teste, teste , teste teste, teste, tesste, teste, teste, test ,test, Teste, teste, teste teste teste teste, teste , teste teste, teste, tesste, teste, teste, test ,test, Teste, teste, teste teste teste teste, teste , teste teste, teste, tesste, teste, teste, test ,test '    
    
        cy.get('#firstName').type("Yuri")
        cy.get('#lastName').type("Lobo")
        cy.get('#email').type("yuri@exemplo.com")
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains("button", 'Enviar').click()

        cy.get('.success').should('be.visible')
        cy.tick(Tres_seg)
        cy.get('.success').should('not.be.visible')

    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
       cy.clock()
        cy.get('#firstName').type("Yuri")
        cy.get('#lastName').type("Lobo")
        cy.get('#email').type("yuri@xemplo,com")
        cy.get('#open-text-area').type('Teste')
        cy.contains("button", 'Enviar').click()

        cy.get('.error').should('be.visible')
        cy.tick(Tres_seg)
        cy.get('.success').should('not.be.visible')

    })
    it('campo de telefone continua vazio quando preenchido por caracter não numerico',function(){
        cy.get('#phone').type('ksnclamk').should('have.value','')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulári',function(){
        cy.clock()
        cy.get('#firstName').type("Yuri")
        cy.get('#lastName').type("Lobo")
        cy.get('#email').type("yuri@xemplo.com")
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains("button", 'Enviar').click()

        cy.get('.error').should('be.visible')
        cy.tick(Tres_seg)
        cy.get('.success').should('not.be.visible')

    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
        cy.get('#firstName').type("Yuri").should('have.value', 'Yuri').clear().should('have.value', '')
        cy.get('#lastName').type("Lobo").should('have.value', 'Lobo').clear().should('have.value', '')
        cy.get('#email').type("yuri@xemplo.com").should('have.value', 'yuri@xemplo.com').clear().should('have.value', '')
        cy.get('#open-text-area').type('Teste').should('have.value', 'Teste').clear().should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
        cy.clock()
        cy.contains("button", 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(Tres_seg)
        cy.get('.success').should('not.be.visible')

    })
    it('envia o formuário com sucesso usando um comando customizado',function(){
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
        cy.tick(Tres_seg)
        cy.get('.success').should('not.be.visible')

    })
    it('seleciona um produto (YouTube) por seu texto',function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)',function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu índice',function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })
    it('marca cada tipo de atendimento',function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })
    it('marca ambos checkboxes, depois desmarca o últimoo',function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
        
    })
    it(' seleciona um arquivo da pasta fixtures',function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.be.equal('example.json')
            })
    })
    it('seleciona um arquivo simulando um drag-and-drop',function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json',{action:"drag-drop"})//simula arrastar arquivo
            .should(function($input){
                expect($input[0].files[0].name).to.be.equal('example.json')
            })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.be.equal('example.json')
            })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
        cy.get('#privacy a').should('have.attr','target','_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicanco no link',function(){
        cy.get('#privacy a')
            .invoke('removeAttr','target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })
    it.only('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
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
  })