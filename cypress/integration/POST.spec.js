describe('POST /personagens', () => {
   before(function(){
    cy.ApagarCadastro();
    cy.ObterToken();
    //cy.api vem da plug bahmotov
   })
    it('Cadastrar Personagens', () => {
        
       const personagem = {
            name:'Bruce Banner',
            alias:'Hulk',
            team: ['Vingadores', 'guardiões da galaxia'],
            active:true
        }

        cy.CadastrarPersonagem(personagem)

            .then(function(response) {
                expect(response.status).to.eql(201)
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eql(24)
    
            })
    });

    context('Quando o personagem já existe',() => {

        const personagem = {
        name:'Hank Pym',
        alias:'Homem Formiga',
        team:['Vingadores'],
        active:true
        }

        before('Cadastrar novo personagem',() => {

            cy.CadastrarPersonagem(personagem)

            .then(function(response) {
                expect(response.status).to.eql(201)
    
            })
        })
        it('não deve cadastrar personagem duplicado',() =>{

            cy.CadastrarPersonagem(personagem)

            .then(function(response) {
                expect(response.status).to.eql(400)
                expect(response.body).to.have.all.keys('error')
                expect(response.body.error).to.eql('Duplicate character')
            })
        })
    })

    context('Quando os campos são obrigatórios',() => {

        const Personagens = [
            {
                age: 20,
                alias:'Homem Aranha',
                team:['Vingadores'],
                active:true 
            },
            {
                name:'Steve Rogers',
                alias:'Capitão América',
                team:['Vingadores'],
                active:false 
            },
            {
                name:'Steve Vincent',
                age: 40,
                team:['Vingadores'],
                active:true 
            },
            {
                name:'Nicholas Joseph',
                alias:'Nick Fury',
                age: 50,
                active:true
            },
            {
                name:'Thor Odinson',
                alias:'Thor',
                age: 35,
                team:['Vingadores','Guardiões da galaxia'],
            }
        ]

        it('Campo idade não obrigatório, deve cadastrar personagem',() =>{

            cy.CadastrarPersonagem(Personagens[1])

            .then(function(response) {
                expect(response.status).to.eql(201)
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eql(24)
            })
        })

        it('Campos obrigatorios sem preencher, não deve cadastrar personagem',() =>{

            cy.CadastrarPersonagem(Personagens[0])

            .then(function(response) {
                expect(response.status).to.eql(400)
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('\"name\" is required')
            })

            cy.CadastrarPersonagem(Personagens[2])

            .then(function(response) {
                expect(response.status).to.eql(400)
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('\"alias\" is required')
            })
            cy.CadastrarPersonagem(Personagens[3])

            .then(function(response) {
                expect(response.status).to.eql(400)
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('\"team\" is required')
            })
            cy.CadastrarPersonagem(Personagens[4])

            .then(function(response) {
                expect(response.status).to.eql(400)
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('\"active\" is required')
            })
        })


    })

});


