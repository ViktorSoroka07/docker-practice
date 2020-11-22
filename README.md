# React Todo App

## Stack

- React - a JavaScript library for building user interfaces
- Redux - a predictable state container for JavaScript apps
- Express - a Node.js web application framework
- MongoDB - a cross-platform document-oriented database program

## Setup

#### .env file
You will need a .evn file to hold environment variables which will point the backend to an instance of MongoDB.

Change the .env-example file to .env and use the example to supply your own MongoDB URI information.

#### MongoDB database

This project was developed using a free sandbox database instance provided by [Mlab](https://mlab.com/). Create a username/password and a free sandbox instance to get a database URI to enter into the .env file.

## Usage

#### To get and install dependencies

Clone this project to a local directory and run:

```bash
npm install
```
This creates the node_modules folder and installs the project dependencies in the folder.

#### Running the application with docker-compose
- dev: run `docker-compose -f ./docker-compose.dev.yml up --build`
- prod: run `docker-compose up --build`

#### Running the application without docker

- The dev-client is a webpack-dev-server which serves the react/redux bundle.js

Change the proxy option in the [webpack.config.dev.js](./client/webpack.config.dev.js)
```
proxy: {
  '/api': 'http://localhost:3000',
},
```

Run the dev client:
```bash
npm run dev
```

- The dev-server hosts the backend rest API and manages the database.

Run the dev server:
```bash
npm run dev
```
The site can be viewed locally at localhost:8080.
