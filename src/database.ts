import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { host, database, test_database, user, password, ENV } = process.env;
let connect;
console.log('\n' + 'Running on ' + ENV + ' Database' + '\n');
if (ENV === 'test') {
  connect = new Pool({
    host: host,
    database: test_database,
    user: user,
    password: password,
  });
}

if (ENV === 'dev') {
  connect = new Pool({
    host: host,
    database: database,
    user: user,
    password: password,
  });
}

export default connect as Pool;
