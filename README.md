# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/Illia-Sakharau/nodejs2024Q1-service.git
```

## Installing NPM modules

```
npm install
```
## Environment variables
To change the port on which the application is running, create a file `.env` in root directory with the value `PORT={port value}`.
You can find an example in the file `.env.example`.

Default port is `4000`

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/ (change 4000 to the port you specified).

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```



Migration

install type orm cli
https://typeorm.io/using-cli#installing-cli

npm run migration:generate 
npm run migration:run  
