# Banking App
This app contains the basic curd operations for the banking.And the backend has been connected to the frontend and  using the database postgresql i have stored the datas.
## Table of contents
- Installation
- Databaseschema
- Apiendpoints
- Dotenv

## Getting started
### Prerequisites
#### Installation
This project requires these installations,
- node  version = 11.4.2
- npm version = 24.4.1
- prostgres sql (database)=16.9
- pgAdmin 4(optional)=9.5


```shell
### The procedure to set up the project:
###To install the dependencies run the command
npm install
#### To run the server run the command 
npm start dev
#### To install the psql 
sudo dnf install postgresql-server postgresql-contrib(fedora)
sudo apt install postgresql (linux)
```                    
### The database schemas used in this task:
#### User tables:
userid PK,
username,
email,
password,
branch.

#### Account table:
account_no PK,
userUserid FK,
account_name,
branch,
IFSC,
balance.
```shell
### The apis created and  used in this task:
"/signup"-This api is used for creating the user and for getting the user details.
"/login"-This api is used for the user validation and for getting the login credentials.
"/user/:email"-This api is used for fetching the account details according to the current user email.
```
```shell
#### sample json
 "/signup"-
 {
    "userid":1,
    "username":"yuvana",
    "email":"yuvana77@gmail.com",
    "password":"xyzy",
    "branch":"madurai"
 }

 "/login"
 {
    "email:"Yuvana77@gmail.com",
    "password":"xyzy"
 }
 "/user/:email"(get method)
 {
    "account_no":1,
    "account_name":"savings",
    "branch":"madurai",
    "IFSC":899007,
    "balance":89000.0
 }
```
```shell
### Dotenv credentials 
#### create a .dotenv file and give these details to configure the database
DB_USERNAME = The username of the database used.
DB_PASSWORD=The password used for the database
DB_HOST=The host .
DB_NAME= the name of the database.
```
