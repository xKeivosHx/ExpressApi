const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'kevin',
    password: 'admin123',
    database: 'my-store',
  });

  await client
    .connect()
    .then(() => console.log('Conectado a BD MyStore'))
    .catch((err) => console.error('connection error', err.stack));

  return client;
}

module.exports = getConnection;
