import * as clientHelpers from '../helpers/clientHelpers'
import * as roomHelpers from '../helpers/roomHelpers'



describe('Testing backend automation', function(){
    
    it('Test Case 1 - Create a new client', function(){
        clientHelpers.createClientRequest(cy)
    })

    it('Test Case 2 - Get all clients', function(){
        clientHelpers.getAllClientsRequest(cy)
    })

    it('Test Case 3 - Create a client and delete it', function(){
        clientHelpers.createClientRequestAndDelete(cy)
    })
    
    it('Test Case 4 - Create a room', function(){
        roomHelpers.createRoomRequest(cy)
    })

    it('Test Case 5 - Create a room and delete it', function(){
        roomHelpers.createAndDeleteRoom(cy)
    })

    it('test case 6 - Edit a client', function(){
        clientHelpers.putRequestAfterGet(cy)
    })
    
    /*
    it('Test Case 4 - Create a client, update it and Delete', function(){
    clientHelpers.createClientRequestAndPut(cy)
    clientHelpers.getAllClientsRequestAndDelete(cy)
    })*/
})