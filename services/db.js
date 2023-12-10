const mysql = require('mysql2/promise');
const config = require('../config');

exports.query = async (sql, params) => {
  try {
    const connection = await mysql.createConnection(config.db);
    const [results] = await connection.execute(sql, params);

    return results;
  } catch (error) {
    console.error(error);
  }
};
