// CAC-TAT.spec.js created with Cypress
/// <reference types="Cypress" />
describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText='Teste, teste, teste teste teste teste, teste , teste teste, teste, tesste, teste, teste, test ,test, Teste, teste, teste teste teste teste, teste , teste teste, teste, tesste, teste, teste, test ,test, Teste, teste, teste teste teste teste, teste , teste teste, teste, tesste, teste, teste, test ,test, Teste, teste, teste teste teste teste, teste , teste teste, teste, tesste, teste, teste, test ,test, Teste, teste, teste teste teste teste, teste , teste teste, teste, tesste, teste, teste, test ,test, Teste, teste, teste teste teste teste, teste , teste teste, teste, tesste, teste, teste, test ,test '    
    
        cy.get('#firstName').type("Yuri")
        cy.get('#lastName').type("Lobo")
        cy.get('#email').type("yuri@exemplo.com")
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains("button", 'Enviar').click()

        cy.get('.success').should('be.visible')

    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type("Yuri")
        cy.get('#lastName').type("Lobo")
        cy.get('#email').type("yuri@xemplo,com")
        cy.get('#open-text-area').type('Teste')
        cy.contains("button", 'Enviar').click()

        cy.get('.error').should('be.visible')

    })
    it('campo de telefone continua vazio quando preenchido por caracter não numerico',function(){
        cy.get('#phone').type('ksnclamk').should('have.value','')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulári',function(){
        cy.get('#firstName').type("Yuri")
        cy.get('#lastName').type("Lobo")
        cy.get('#email').type("yuri@xemplo.com")
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains("button", 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
        cy.get('#firstName').type("Yuri").should('have.value', 'Yuri').clear().should('have.value', '')
        cy.get('#lastName').type("Lobo").should('have.value', 'Lobo').clear().should('have.value', '')
        cy.get('#email').type("yuri@xemplo.com").should('have.value', 'yuri@xemplo.com').clear().should('have.value', '')
        cy.get('#open-text-area').type('Teste').should('have.value', 'Teste').clear().should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
        cy.contains("button", 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado',function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
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
    it.only('marca cada tipo de atendimento',function(){
        cy.get('input[type="radio"][value="ajuda"]').check().should('have.value', 'ajuda')
        cy.get('input[type="radio"][value="elogio"]').check().should('have.value', 'elogio')
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })
  })