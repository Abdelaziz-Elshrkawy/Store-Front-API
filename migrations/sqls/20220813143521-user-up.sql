/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(60) NOT NULL,
    lastName VARCHAR(60) NOT NULL,
    hashed_password VARCHAR NOT NULL 
);