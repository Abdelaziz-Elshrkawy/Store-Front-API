# STORE-FRONT-API

## THIS PROJECT IS PART OF UDACITY ADVANCED WED DEVELOPMENT NANO DEGREE

## HANDLERS
all handlers tested with postman and confirmed that it's working correctly and tested with jasmine to get specific http code the routes mapped on the `REQUIREMENTS.md` file

## MODELS
the models designed to cover all the database queries required by the project and tested to confirm the shape and schema which were designed for
---------------------------------------------------------------------------------------------
## Database 
the database deigned to match desired shape i make an image for the design `database-erm.jpg` within the project, i made migration for all database tables required and designed to get the desired data shape

### create user as following 
`sql` create user abdel with password '123';

### create database as following
`sql` create database store_front;
`sql` create database test;

### the test database is named `test` and created automatically with scripts make sure to read what i wrote in it to avoid getting errors 

### granting permissions 


grant all privileges on database store_front to abdel; 

grant all privileges on database test to abdel;

----------------------------------------------------------------------------------------------
## instruction for the project 
==> scripts for the projects:

`format` ==> to run prettier `&&` eslint

`test` ==> to drop test database as a check if it wasn't dropped to avoid creation error `&&` create test database `&&` compile typescript to js files `&&` run jasmine with test database `&&` drop test database at the end of testing

`droptest` ==> to drop test database 

`starttest` ==> to create test database `&&` make all migrations `&&` run server on test database (before running that script make sure that the test database dropped i didn't add the drop database as check because i was using postman on test database while jasmine testing )

`start` ==> to run server on dev database 

`watch` ==> to watch typescript files change

`tsc` ==> to compile typescript files to build folder (typescript out
