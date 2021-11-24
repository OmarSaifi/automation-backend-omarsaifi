import * as clientHelpers from '../helpers/clientHelpers'



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
    it.only('Test Case 4 - Create a client and update it', function(){
        clientHelpers.createClientRequestAndPut(cy)
    })

           
})