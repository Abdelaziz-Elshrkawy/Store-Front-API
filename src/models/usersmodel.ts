import dotenv from 'dotenv';
import connect from '../database';
import bcrybt from 'bcrypt';

dotenv.config();

export type userData = {
  id?: string | number;
  firstname: string;
  lastname: string;
  hashed_password: string;
};
//using .env bcrybt varibales
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export class userMethods {
  async index(): Promise<userData[]> {
    const conn = await connect.connect();
    const sql = 'select * from users';
    const data = await conn.query(sql);
    return data.rows;
  }
  async create(u: userData): Promise<userData[]> {
    try {
      const conn = await connect.connect();
      const sql =
        'insert into users ( firstname, lastname,  hashed_password) values ($1, $2, $3) returning *';
      const hashedPassword = bcrybt.hashSync(
        u.hashed_password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string) as number
      );
      const data = await conn.query(sql, [
        u.firstname,
        u.lastname,
        hashedPassword,
      ]);
      conn.release();
      return data.rows[0];
    } catch (err) {
      throw new Error('' + err);
    }
  }

  async show(id: number | string): Promise<userData[]> {
    try {
      const conn = await connect.connect();
      const sql = 'select * from users where id=($1)';
      const data = await conn.query(sql, [id]);
      conn.release();
      return data.rows;
    } catch (err) {
      throw new Error('' + err);
    }
  }

  async authentication(
    firstname: string,
    lastname: string,
    password: string
  ): Promise<userData[] | null> {
    const conn = await connect.connect();
    const sql = 'select * from users where firstname=($1) and lastname=($2)';
    const data = await conn.query(sql, [firstname, lastname]);
    conn.release();
    if (data.rows.length) {
      const user = data.rows[0];
      if (
        bcrybt.compareSync(password + BCRYPT_PASSWORD, user.hashed_password)
      ) {
        return user;
      }
    }
    return null;
  }
}
