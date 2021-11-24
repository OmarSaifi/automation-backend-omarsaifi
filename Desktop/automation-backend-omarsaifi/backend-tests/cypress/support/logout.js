const LOGOUT_URL = 'http://localhost:3000/api/logout'

Cypress.Commands.add('logoutSession', () => {
    const userCredentials = {
        "username":"tester01",
        "password":"GteteqbQQgSr88SwNExUQv2ydb7xuf8c"
    }

    cy.request({
        method: "POST",
        url: LOGOUT_URL,
        headers:{
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(userCredentials)
    }).then((response =>{
        expect(response.status).to.eq(200)
        Cypress.env({logoutToken:response.body})
    }))
})