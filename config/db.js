const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const { connect, connection } = mongoose;
connect(process.env.DB_URL);

connection.on('connected', () => console.log('DB connected successfully'));
connection.on('error', (err) => console.log('Err occurred', err));

module.exports = connection;
