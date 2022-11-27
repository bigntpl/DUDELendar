# 📅 DUDElendar
#### `manual test cases` and `automated test cases` are in `dudelendar-frontend` folder

## Motivation
We would like to create an calendar application that would allows multiple users to have collective events. The application can suggest common avaliable time slots for all member in the team. So the team could set an appointment easily and more effective.

## Stacks: 
- Next.js
- MUI
- Styled Components
- fullcalendar
- tailwindcss
- Node.js
- PM2

### Deploy on Proen cloud

Frontend: http://dudelendars.th1.proen.cloud/<br />
Backend: http://dudelendar.th1.proen.cloud/

## Testing tools:
- Jest for unit testing
- Playwright for Automated UI Testing

## Init Project

**1-** Clone repository.

**2-** Install dependecies.
```js
cd dudelendar-backend
yarn install
cd dudelendar-frontend
yarn install
```

**3-** Run Development environment.
```js
// in each folder
yarn run dev
```
**4-** Run unit test (for **backend** only).
```js
cd dudelendar-backend
yarn run test
```

**5-** Run UI test (for **frontend** only).
```
cd dudelendar-frontend
yarn playwright test
```
