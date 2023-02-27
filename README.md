# MirTech CRM

A Client Managing App for MirTech company

## How to run this project using Docker? (make sure docker is running)

```shell
$ git clone https://github.com/3nzoo/mirtech.git
$ cd mirtech
$ docker-compose up --build

open localhost to view the home page with client list table
```

## How to run this project without Docker?

Please make sure you have Node.js in your device

```shell
1. Run server
$ cd server
$ npm run start
```

```shell
1. Run client
$ cd client
$ npm run dev
2. open localhost:3000 to view the client list
```

## For testing, run the following command in separate shells

```shell
$ npm run test
```

## Features

**- User can click each CLient to view full info**

**- User can toggle the status of each client on Client List view or Individual Client Page**

**- User can click each CLient to view full info**

**- Click the filter by status to show only active clients**

**- Listed dates are all the existing available dates on each client created dates**

**- Selecting a specific date will filter clients created on that date**

**- Click add new Client to add new Client**

**- if localstorage for clients are empty, it will fetch data from the clients endpoint from the server then store in the localstorage**

## Reminder

**Make sure Nodejs 14+ and Docker 4.15 are installed in your device**
