describe('Orders flows', () => {
  it('logs in via API, creates client and order', () => {
    // Login via API
    cy.request('POST', 'http://localhost:3001/api/auth/login', {
      email: 'tovoniaina.rahendrison@gmail.com',
      password: 'ByGagoos2025!'
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      const token = resp.body.token;
      // Create client
      cy.request({
        method: 'POST',
        url: 'http://localhost:3001/api/clients',
        headers: { Authorization: `Bearer ${token}` },
        body: { name: 'Cypress Client', phone: '+261 987 654', email: 'cypress@example.com' }
      }).then((cResp) => {
        expect(cResp.status).to.eq(201);
        const clientId = cResp.body.id;
        // Create order
        const order = {
          clientId,
          deliveryDate: '2025-12-25',
          sizes: { '4':1,'6':0,'8':1,'10':0,'S':0,'M':0,'L':0,'XL':0,'XXL':0 },
          color: 'Noir',
          unitPrice: 15000
        };
        cy.request({
          method: 'POST',
          url: 'http://localhost:3001/api/orders',
          headers: { Authorization: `Bearer ${token}` },
          body: order
        }).then((oResp) => {
          expect(oResp.status).to.eq(201);
        });
      });
    });
  });
});
