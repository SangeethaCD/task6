The versions of npm and  used in this task:
npm --11.4.2
node --24.4.1
To install the dependencies run the command
npm install

To run the server run the command 
npm start dev

The database schemas used in this task:
User tables:
userid PK,
username,
email,
password,
branch.

Account table:
account_no PK,
userUserid FK,
account_name,
branch,
IFSC,
balance.

The apis created and  used in this task:
"/signup"-This api is used for creating the user and for getting the user details.
"/login"-This api is used for the user validation and for getting the login credentials.
"/user/:email"-This api is used to fetching the account details according to the current email.

Dotenv credentials 
create a .dotenv and give these details to 
DB_USERNAME = The username of the database used.
DB_PASSWORD=The password used for the database
DB_HOST=The host .
