// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('ObterToken', function(){
    cy.api({
        method: 'POST',
        url: '/sessions',
        body:{
            email: 'juliao@qacademy.com',
            password:'123456'
        }
    }).then(function(response){
        expect(response.status).to.eql(200)
        cy.log(response.body.token) //mostrar Token
        Cypress.env('pegatoken',response.body.token)
    })
})

Cypress.Commands.add('ApagarCadastro', function(){
    cy.api({
        method:'DELETE',
        url:'/back2thepast/62b9b176826bd40016091747'
    }).then(function(response) {
        expect(response.status).to.eql(200)
        //cy.log(JSON.stringify(response.body))
        cy.log(response.body.message)
        expect(response.body).to.have.all.keys('message')

    })
})

//POST /characters - request para cadastrar novo personagem
Cypress.Commands.add('CadastrarPersonagem', (payload) => {
    cy.api({
        method: 'POST',
        url:'/characters',
        body: payload,
        headers: {
            Authorization: Cypress.env('pegatoken')
        },
        failOnStatusCode: false
    }). then(function(response){
        return response;
    })
})
