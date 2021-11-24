const faker = require ('faker')

const ENDPOINT_GET_ROOMS = 'http://localhost:3000/api/rooms/'
const ENDPOINT_GET_ROOM = 'http://localhost:3000/api/room/'
const ENDPOINT_POST_ROOM = 'http://localhost:3000/api/room/new/'



function createRandomRoomPayload(){
    const category = 'double'
    const number = faker.datatype.number()
    const floor = faker.datatype.number()
    const available = 'true'
    const price = faker.commerce.price()
    const features = ['sea_view']


    const payload = {
        "category":category,
        "number":number,
        "floor":floor,
        "available": available,
        "price":price,
        "features":features
    }

    return payload
}

function getRequestAllRoomsWithAssertion(cy, category, number, floor, available, price, features){
    // GET request to fetch all clients
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_ROOMS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        const responseAsString = JSON.stringify(response)
        expect(responseAsString).to.have.string(category)
        expect(responseAsString).to.have.string(number)
        expect(responseAsString).to.have.string(floor)
        //expect(responseAsInt).to.have.int(price)
        expect(responseAsString).to.have.string(features)

        cy.log(response.body[response.body.length -1].id)
        cy.log(response.body[0].categoryName)
        cy.log(response.body.length)

    }))
}

function createRoomRequest(cy){
    cy.authenticateSession().then((response =>{
        // Create a Room
        let fakeRoomPayload = createRandomRoomPayload()

        // Post request to create a client 
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_ROOM,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:fakeRoomPayload
        }).then((response =>{
            const responseAsString = JSON.stringify(response)
            expect(responseAsString).to.have.string(fakeRoomPayload.category)    
        }))

        getRequestAllRoomsWithAssertion(cy, fakeRoomPayload.category, fakeRoomPayload.number, fakeRoomPayload.floor, fakeRoomPayload.available, fakeRoomPayload.price, fakeRoomPayload.features)
    }))
}
module.exports = {
    createRoomRequest,
    getRequestAllRoomsWithAssertion
}