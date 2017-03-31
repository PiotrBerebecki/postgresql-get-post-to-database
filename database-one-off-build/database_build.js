const fs = require('fs');
const path = require('path');

const connection = require('./../src/database_connection');


const buildDatabase = () => {
  const sql = fs.readFileSync(path.join(__dirname, 'database_build.sql'), 'utf8');

  connection.query(sql, (err, result) => {
    if (err) {
      throw new Error('Cannot create database');
    } else {
      console.log('Database created');
    }
  });
};

buildDatabase();
