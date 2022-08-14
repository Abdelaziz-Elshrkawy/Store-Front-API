import connect from '../database';
import dotenv from 'dotenv';
dotenv.config();
export type productData = {
  id?: string | number;
  name: string;
  price: number | string;
};

export class productMethods {
  async create(p: productData): Promise<productData[]> {
    try {
      const conn = await connect.connect();
      const sql =
        'insert into products (name, price) values ($1, $2) returning *';
      const data = await conn.query(sql, [p.name, p.price]);
      conn.release();
      return data.rows[0];
    } catch (err) {
      throw new Error('' + err);
    }
  }
  async index(): Promise<productData[]> {
    try {
      const conn = await connect.connect();
      const sql = 'select * from products';
      const data = await conn.query(sql);
      return data.rows;
    } catch (err) {
      throw new Error('' + err);
    }
  }
  async show(id: string | number): Promise<productData[]> {
    try {
      const conn = await connect.connect();
      const sql = 'select * from products where id=($1)';
      const data = await conn.query(sql, [id]);
      return data.rows[0];
    } catch (err) {
      throw new Error('' + err);
    }
  }
}
