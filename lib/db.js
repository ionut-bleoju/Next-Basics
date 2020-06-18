import { Pool } from 'pg'

const connectionString = process.env.CONNECTION_STRING || 'postgresql://postgres:123456@localhost:5432/next'


const pool = new Pool({
  connectionString: connectionString
});


pool.on('error', (err) => {
  console.error('Unexpected error on idle client: ', err);
  process.exit(-1);
});


pool.query('SELECT 1 + 1', (err) => {
  if (err) {
    console.error('Error establishing a database connection!', err);
    console.error(err.stack);
    process.exit(-1);
  }
  else {
    console.info('DB Connection Pool established.');
  }
});

export default (text, params) => pool.query(text, params)
