/* Replace with your SQL commands */
CREATE TABLE order_product (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL, 
    order_id INT REFERENCES orders(id)
);