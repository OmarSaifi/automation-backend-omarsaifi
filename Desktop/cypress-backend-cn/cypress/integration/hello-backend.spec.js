/// <reference types="cypress" />

describe ('testing the chuck norris API', function(){
    it('Test fetching a random joke', function(){
        cy.request('http://api.icndb.com/jokes/random').its('status').should('eq', 200) 
    })
    
    //Komma åt olika värdena
 //   it('NOT A TEST!', function(){
 //       cy.request('http://api.icndb.com/jokes/random').then((response =>{
 //           cy.log(JSON.stringify(response.body))
 //           cy.log(JSON.stringify(response.body.type))
 //           cy.log(JSON.stringify(response.body.value))
 //           cy.log(JSON.stringify(response.body.value.id))
 //           cy.log(JSON.stringify(response.body.value.joke))
 //       }))
 //   })

    // Testning mot ID
    it('Testing if its the right id!', function(){
        cy.request('http://api.icndb.com/jokes/2').then((response =>{
            //cy.log(JSON.stringify(response.body.value.id))
            //Assertan, skapa en variabel som heter id
            const id = (JSON.stringify(response.body.value.id))
            expect(id).to.equal('2')

        }))
    })

        it('Testing if its the right joke!', function(){
            cy.request('http://api.icndb.com/jokes/2').then((response =>{
                //cy.log(JSON.stringify(response.body.value.id))
                const joke = (JSON.stringify(response.body.value.joke))
                expect(joke).to.have.string('MacGyver can build an airplane')
    
            }))
        })


})