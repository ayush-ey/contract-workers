const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwerty", // replace with your MySQL password
  database: "contractor_works",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS works (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    chief_engineer_zone VARCHAR(255),
    circle VARCHAR(255),
    division_name VARCHAR(255),
    name_of_agency VARCHAR(255),
    place_of_work VARCHAR(255),
    item_of_work TEXT,
    quantity DECIMAL(10, 2),
    unit VARCHAR(50),
    rate DECIMAL(10, 2),
    amount DECIMAL(10, 2) GENERATED ALWAYS AS (quantity * rate) STORED
  )
`;

db.query(createTableQuery, (err) => {
  if (err) {
    console.error("Error creating table:", err);
  } else {
    console.log("Table created or already exists.");
  }
});

module.exports = db;
