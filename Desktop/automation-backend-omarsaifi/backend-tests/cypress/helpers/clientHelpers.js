const faker = require ('faker')

const ENDPOINT_GET_CLIENTS = 'http://localhost:3000/api/clients/'
const ENDPOINT_GET_CLIENT = 'http://localhost:3000/api/client/'
const ENDPOINT_POST_CLIENT = 'http://localhost:3000/api/client/new/'
const ENDPOINT_PUT_CLIENT = 'http://localhost:3000/api/client/'


function createRandomClientPayload(){
    const fakeName = faker.name.firstName()
    const fakeEmail = faker.internet.email()
    const fakePhone = faker.phone.phoneNumber()

    const payload = {
        "name":fakeName,
        "email":fakeEmail,
        "telephone":fakePhone
    }

    return payload
}

function getRequestAllClientsWithAssertion(cy, name, email, telephone){
    // GET request to fetch all clients
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        const responseAsString = JSON.stringify(response.body)
        expect(responseAsString).to.have.string(name, email, telephone)

        cy.log(response.body[response.body.length -1].id)
        //cy.log(response.body[0].email)
        //cy.log(response.body.length)

    }))
}

function getAllClientsRequest(cy){
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_CLIENTS,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response =>{
            const responseAsString = JSON.stringify(response.body)
            cy.log(responseAsString)
        }))
    }))
}

function deleteRequestAfterGet(cy){
    // GET request to fetch all clients
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        let lastId = response.body[response.body.length -1].id
        cy.request({
            method: "DELETE",
            url: ENDPOINT_GET_CLIENT+lastId,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response =>{
            const responseAsString = JSON.stringify(response.body)
            cy.log(responseAsString)
            expect(responseAsString).to.have.string('true')
        }))
    }))
}

function createClientRequest(cy){
    cy.authenticateSession().then((response =>{
        // Create a fake client
        let fakeClientPayload = createRandomClientPayload()

        // Post request to create a client 
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_CLIENT,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:fakeClientPayload
        }).then((response =>{
            const responseAsString = JSON.stringify(response.body)
            expect(responseAsString).to.have.string(fakeClientPayload.name, fakeClientPayload.email, fakeClientPayload.telephone)    
        }))

        getRequestAllClientsWithAssertion(cy, fakeClientPayload.name, fakeClientPayload.email, fakeClientPayload.telephone)
    }))
}

function createClientRequestAndDelete(cy){
    cy.authenticateSession().then((response =>{
        // Create a fake client
        let fakeClientPayload = createRandomClientPayload()

        // Post request to create a client 
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_CLIENT,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:fakeClientPayload
        }).then((response =>{
            const responseAsString = JSON.stringify(response.body)
            expect(responseAsString).to.have.string(fakeClientPayload.name)    
        }))

        deleteRequestAfterGet(cy)
    }))
}

function putRequestAfterGet(cy){
    cy.authenticateSession().then(response =>{
        // Create a fake client
        let fakeClientPayload = createRandomClientPayload()

    // GET request to fetch all clients
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        const putClient = response.body[response.body.length -1]
        putClient.name = 'Omar',
        putClient.email = 'omar@hotmail.com'
        putClient.telephone = '0843277384'

        cy.request({
            method: "PUT",
            url: ENDPOINT_PUT_CLIENT + putClient.id,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:putClient
        }).then((response =>{
            const responseAsString = JSON.stringify(response.body)
            cy.log(responseAsString)
            expect(responseAsString).to.have.string(putClient.id, putClient.created, putClient.name, putClient.email, putClient.telephone)
        }))
    }))
})
}

/*
function createClientRequestAndPut(cy){
    cy.authenticateSession().then((response =>{
        // Create a fake client
        let fakeClientPayload = createRandomClientPayload()

        // Post request to create a client 
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_CLIENT,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:fakeClientPayload
        }).then((response =>{
            const responseAsString = JSON.stringify(response.body)
            expect(responseAsString).to.have.string(fakeClientPayload.name)    
        }))

        putRequestAfterGet(cy)
    }))
}
*/

/*
function getAllClientsRequestAndDelete(cy){
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_CLIENTS,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response =>{
            let lastId = response.body[response.body.length -1].id
            cy.request({
                method: "GET",
                url: ENDPOINT_GET_CLIENT+lastId,
                headers:{
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
            }).then((response =>{
                const responseAsString = JSON.stringify(response)
                cy.log(responseAsString) /// lägg till
                expect(responseAsString).to.have.string('true')
            }))
        }))

        deleteRequestAfterGet(cy)
    }))
}
*/

/*
function getAllClientsRequestAndLogout(cy){
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_CLIENTS,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response =>{
            const responseAsString = JSON.stringify(response.body)
            cy.log(responseAsString)
        }))
    }))
}
*/

module.exports = {
    createRandomClientPayload,
    createClientRequest,
    getAllClientsRequest,
    createClientRequestAndDelete,
    putRequestAfterGet,
    //createClientRequestAndPut,
    //getAllClientsRequestAndDelete
    
}
