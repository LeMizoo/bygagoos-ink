const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || '';

if (!DEFAULT_PASSWORD) {
  console.warn('⚠️ DEFAULT_PASSWORD not set - api_test will send an empty password. Set DEFAULT_PASSWORD in environment to test credentials.');
}

(async () => {
  const base = 'http://localhost:3001';
  try {
    console.log('LOGIN...');
    let r = await fetch(base + '/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'tovoniaina.rahendrison@gmail.com', password: DEFAULT_PASSWORD })
    });
    let js = await r.json();
    console.log('LOGIN RESPONSE:', JSON.stringify(js, null, 2));
    const token = js.token;
    if (!token) {
      console.error('No token received, aborting');
      process.exit(1);
    }

    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token };

    console.log('\nGET /api/clients');
    r = await fetch(base + '/api/clients', { headers });
    js = await r.json();
    console.log('CLIENTS:', JSON.stringify(js, null, 2));

    console.log('\nCREATE CLIENT');
    r = await fetch(base + '/api/clients', { method: 'POST', headers, body: JSON.stringify({ name: 'Test Client', phone: '+261 123 456', email: 'testclient@example.com' }) });
    js = await r.json();
    console.log('CREATE CLIENT RESPONSE:', JSON.stringify(js, null, 2));
    const clientId = js.id;

    console.log('\nCREATE ORDER for clientId', clientId);
    const orderPayload = {
      clientId,
      deliveryDate: '2025-12-20',
      sizes: { '4': 1, '6': 0, '8': 2, '10': 0, 'S': 0, 'M': 0, 'L': 0, 'XL': 0, 'XXL': 0 },
      color: 'Bleu',
      serigraphyImage: '/public/images/serig/sample.png',
      unitPrice: 12000,
      notes: 'Test order'
    };
    r = await fetch(base + '/api/orders', { method: 'POST', headers, body: JSON.stringify(orderPayload) });
    js = await r.json();
    console.log('CREATE ORDER RESPONSE:', JSON.stringify(js, null, 2));
    const orderId = js.id;

    console.log('\nGET /api/orders?clientId=' + clientId);
    r = await fetch(base + '/api/orders?clientId=' + clientId, { headers });
    js = await r.json();
    console.log('ORDERS LIST:', JSON.stringify(js, null, 2));

    console.log('\nUPDATE ORDER status to CONFIRMED');
    r = await fetch(base + `/api/orders/${orderId}`, { method: 'PUT', headers, body: JSON.stringify({ status: 'CONFIRMED' }) });
    js = await r.json();
    console.log('UPDATE RESPONSE:', JSON.stringify(js, null, 2));

    console.log('\nGET /api/orders/' + orderId);
    r = await fetch(base + `/api/orders/${orderId}`, { headers });
    js = await r.json();
    console.log('ORDER DETAIL:', JSON.stringify(js, null, 2));

    console.log('\nAll tests completed successfully.');
  } catch (err) {
    console.error('ERROR', err);
    process.exit(1);
  }
})();
