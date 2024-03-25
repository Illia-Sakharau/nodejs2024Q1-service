# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- typeorm - install typeorm globally with
```
npm i -g typeorm
```

## Downloading

```
git clone https://github.com/Illia-Sakharau/nodejs2024Q1-service.git
```

## Installing NPM modules

```
npm install
```
## Environment variables
Rename file `.env.example` to `.env`.

To change the port on which the application is running, create a file `.env` in root directory with the value `PORT={port value}`.
You can find an example in the file `.env.example`.

Default port is `4000`

## Running application

1. Make sure that everything described above is done and installed.
2. Start and run the services
```
docker-compose up
```
3. Migrate database
```
npm run migration:generate 
```
```
npm run migration:run  
```

## Vulnerabilities scanning
```
npm run vuln-scan
```

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

## DockerHub

https://hub.docker.com/u/illiasakharau
