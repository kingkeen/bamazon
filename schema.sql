-- Create the database movie_planner_db and specified it for use.
CREATE DATABASE bamazon_db;
USE bamazon_db;

-- Create the table plans.
CREATE TABLE products
(
item_id int NOT NULL AUTO_INCREMENT,
product_name varchar(255) NOT NULL,
department_name varchar(255) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity int(10) NOT NULL,
PRIMARY KEY (item_id)
);

-- Insert a set of records.
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
	("Halo","Games",39.99,6),
	("Horse Head Mask","Clothing" , 23.07,12),
	("iPhone","Electronics",87.66,2),
	("Boxers","Clothing",49.99,10),
	("Toothpaste","Bathroom",6.41,20),
	("Wireless Kayboard","Electronics",42.99,5),
	("Dental Floss","Personal Care",5.03,16),
	("Kinder Surprise","Food",17.08,100),
	("Pineapple","Food",19.99,15),
	("Fidget Spinner","Toys",30.50,35);
