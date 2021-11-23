
describe('Testing automation', function(){

    it.only('Test Case 1 - Create a new client', function(){
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


})