describe('Testing automation', function(){

    it ('Test Case 2', function(){
        cy.authenticateSession().then((response =>{
            cy.request({
                method: "POST",
                url: 'http://localhost:3000/api/clients',
                headers:{
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
            }).then((response =>{
                cy.log(response.body[0].id)
                cy.log(response.body[0].created)
                cy.log(response.body[0].name)
                cy.log(response.body[0].email)
                cy.log(response.body[0].telephone)
            
            }))
        }))
    })
    
    it('Test Case 1 - Create a new client', function(){
        cy.authenticateSession().then((response =>{
            const payload = {
                "name":"Omar Saifi",
                "email":"omaralisaifi@hotmail.com",
                "telephone":"0732365202"}
                
            // Post request to create a client 
            cy.request({
                method: "POST",
                url: 'http://localhost:3000/api/client/new',
                headers:{
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body:payload
            }).then((response =>{
                cy.log(JSON.stringify(response))
                const responseAsString = JSON.stringify(response)
                expect(responseAsString).to.have.string(payload.name)
      
            }))
        }))
    })
    it.only('Test Case 2 - Create and Delete a client', function(){
        cy.authenticateSession().then((response =>{
            const payload = {
                "name":"Omar2",
                "email":"omar2@hotmail.com",
                "telephone":"0732365202"
            }
            // Post request to create a client 
            cy.request({
                method: "POST",
                url: 'http://localhost:3000/api/client/new',
                headers:{
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body:payload
            }).then((response =>{
                //cy.log(JSON.stringify(response))
                const responseAsString = JSON.stringify(response)
                expect(responseAsString).to.have.string(payload.name)
            }))
                deleteRequestAfterGet(cy)     
            }))
            
            function deleteRequestAfterGet(cy){
                //Get request to fetch all clients
                cy.request({
                    method: "GET",
                    url: 'http://localhost:3000/api/client/',
                    headers:{
                        'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                        'Content-Type': 'application/json'
                    },
                    //body:payload
                }).then((response =>{
                    let lastId = response.body[response.body.length -1].id
                    cy.request({
                        method: "DELETE",
                        url: 'http://localhost:3000/api/client/'+lastId,
                        headers:{
                            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                            'Content-Type': 'application/json'
                        },
                     })

                }))
})