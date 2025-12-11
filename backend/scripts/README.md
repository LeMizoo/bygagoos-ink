Running API tests

This folder contains simple Node-based API test scripts for development.

To run the API test, ensure the backend server is running (port 3001) then run:

```powershell
# from project root
Push-Location 'D:\ByGagoos-Ink\backend'
node scripts/api_test.js
```

The script performs: login (using the default dev user), list clients, create a test client, create a test order, update order status, and fetch order details.

Note: these scripts are intended for local development only and use the in-memory dev server.