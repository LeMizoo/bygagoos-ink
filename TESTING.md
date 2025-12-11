# ByGagoos-Ink Testing Guide

## Frontend E2E Testing (Cypress)

### Setup

```bash
npm install  # cypress is now in devDependencies
```

### Run Tests

```bash
# Interactive mode
npm run cypress:open

# Headless mode
npm run cypress:run
```

### Test Files

- `cypress/e2e/orders.cy.js` — Tests login, client creation, order creation via backend API

### Requirements

- Backend running on port 3001
- Frontend running on port 5173 (or adjust baseUrl in `cypress.config.js`)

---

## Backend API Testing (Node Script)

### Run API Test

Ensure backend is running, then:

```powershell
Push-Location 'D:\ByGagoos-Ink\backend'
node scripts/api_test.js
```

This test script verifies:
- Login with default dev user
- List clients
- Create a new client
- Create an order
- Fetch orders by client ID
- Update order status
- Fetch order details

### What's Tested

- Auth: `/api/auth/login`
- Clients: `GET /api/clients`, `POST /api/clients`, `GET /api/clients/:id`, `PUT /api/clients/:id`
- Orders: `GET /api/orders`, `POST /api/orders`, `GET /api/orders/:id`, `PUT /api/orders/:id`
- Dashboard: `GET /api/dashboard/stats`

---

## Manual Testing Checklist

- [ ] Login with `tovoniaina.rahendrison@gmail.com` / `ByGagoos2025!`
- [ ] Navigate to `/dashboard` → view recent orders list
- [ ] Navigate to `/clients` → list existing clients, create new client
- [ ] Navigate to `/orders` → list orders, filter by client
- [ ] Create a new order via modal
- [ ] Click order row → navigate to `/orders/:id` → edit status
- [ ] Click client row → navigate to `/clients/:id` → edit client info

---

## Local Dev Server

### Backend (in-memory)

```powershell
Push-Location 'D:\ByGagoos-Ink\backend'
node server.js
# Runs on http://localhost:3001
```

### Frontend (Vite)

Windows PowerShell (may require execution policy change):

```powershell
Set-ExecutionPolicy RemoteSigned -Scope Process
Push-Location 'D:\ByGagoos-Ink\frontend'
npm run dev
# Runs on http://localhost:5173
```

Or use cmd.exe (bypass PowerShell scripts):

```cmd
cd D:\ByGagoos-Ink\frontend
npm run dev
```

---

## Notes

- All user passwords are currently `ByGagoos2025!`
- Clients and Orders use in-memory storage (not persisted; resets on server restart)
- API is protected by JWT; all authenticated endpoints require `Authorization: Bearer <token>` header
