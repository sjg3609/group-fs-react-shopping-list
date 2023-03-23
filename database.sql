-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data

CREATE TABLE shopping_list (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80) NOT NULL,
    "quantity" NUMERIC(6,2) NOT NULL,
    "unit" VARCHAR(20),
    "purchased" BOOLEAN DEFAULT 'false'
);

INSERT INTO "shopping-list" ("name", "quantity", "unit")
VALUES ('Apples', 1, 'lbs'), ('Cereal', 2, 'boxes');