# Installation
This project uses SQL Server as DBSM so you should use SQL Server to be able to configure the program in the simplest way.

You can download SQL Server via the following link: https://www.microsoft.com/en-us/sql-server/sql-server-downloads

Downloading and installing Node.js and npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

## Step 1: Create database

Create new database in your local database system. 

* Run create.sql in SQL Server to create database.
* Run data.sql to insert data.


## Step 2: Install package

Install package in backend & frontend

```bash
cd backend/Admin
npm i
```
```bash
cd backend/Cart
npm i
```
```bash
cd backend/Customer
npm i
```
```bash
cd backend/Order
npm i
```
```bash
cd backend/Product
npm i
```
```bash
cd backend/UploadImg
npm i
```
```bash
cd frontend
npm i
```

## Step 3: Run backend microservices server
Each terminal runs 1 microservice
### Admin microservice - localhost:5000
```bash
cd backend
cd Admin
nodemon admin.js
```
### Cart microservice - localhost:5001
```bash
cd backend
cd Cart
nodemon cart.js
```
### Customer microservice - localhost:5002
```bash
cd backend
cd Customer
nodemon customer.js
```
### Order microservice - localhost:5003
```bash
cd backend
cd Order
nodemon order.js
```
### Product microservice - localhost:5005
```bash
cd backend
cd Product
nodemon product.js
```
### Upload Image microservice - localhost:5006
```bash
cd backend
cd UploadImg
nodemon upload.js
```

## Step 3: Run frontend
```bash
cd frontend
npm start
```

Go to localhost:3000 in your browser
