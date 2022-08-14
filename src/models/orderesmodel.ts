import connect from '../database';
import dotenv from 'dotenv';
dotenv.config();

export type orderData = {
  id?: number | string;
  user_id: number | string;
  status: string;
};
export type order_productData = {
  id?: number | string;
  product_id: number | string;
  quantity: number | string;
  order_id: number | string;
};

export class ordersMethods {
  async create(o: orderData): Promise<orderData[]> {
    try {
      const conn = await connect.connect();
      const sql =
        'insert into orders (user_id, status) values ($1, $2) returning *';
      const data = await conn.query(sql, [o.user_id, o.status]);
      conn.release();
      return data.rows[0];
    } catch (err) {
      throw new Error('' + err);
    }
  }
  async index(user_id: number | string): Promise<orderData[]> {
    try {
      const conn = await connect.connect();
      const sql =
        'select op.order_id, op.product_id, op.quantity, orders.user_id, orders.status from order_product op join orders on op.order_id = orders.id where orders.user_id = ($1)';
      const data = await conn.query(sql, [user_id]);
      conn.release();
      return data.rows;
    } catch (err) {
      throw new Error('' + err);
    }
  }
  async show(
    user_id: number | string,
    order_id: number | string
  ): Promise<orderData[]> {
    try {
      const conn = await connect.connect();
      const sql =
        'select op.order_id, op.product_id, op.quantity, orders.user_id, orders.status from order_product op join orders on op.order_id = orders.id where orders.user_id = ($1) and op.order_id =  ($2)';
      const data = await conn.query(sql, [user_id, order_id]);
      conn.release();
      return data.rows;
    } catch (err) {
      throw new Error('' + err);
    }
  }
  async addProduct(
    p: order_productData
  ): Promise<order_productData[] | string> {
    try {
      const conn = await connect.connect();
      const sql = 'select status from orders where id =($1)';
      const data = await (await conn.query(sql, [p.order_id])).rows[0];
      conn.release();
      if (data.status === 'complete') {
        return "can't add more products because the order is completed";
      }
    } catch (err) {
      throw '' + err;
    }
    try {
      const conn = await connect.connect();
      const sql =
        'insert into order_product (product_id, quantity, order_id) values ($1, $2, $3) returning *';
      const data = await conn.query(sql, [
        p.product_id,
        p.quantity,
        p.order_id,
      ]);
      conn.release();
      return data.rows[0];
    } catch (err) {
      throw '' + err;
    }
  }

  async orderConfirmation(
    order_id: number | string,
    user_id: number | string
  ): Promise<void> {
    const conn = await connect.connect();
    const sql =
      "update orders o set status = 'complete' where o.id = ($1) and o.user_id = ($2) ";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = await conn.query(sql, [order_id, user_id]);
    conn.release();
  }
}
