const db = require('../config/db');

const addWork = (date, chief_engineer_zone, circle, division_name, name_of_agency, place_of_work, item_of_work, quantity, unit, rate, callback) => {
  const query = 'INSERT INTO works (date, chief_engineer_zone, circle, division_name, name_of_agency, place_of_work, item_of_work, quantity, unit, rate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [date, chief_engineer_zone, circle, division_name, name_of_agency, place_of_work, item_of_work, quantity, unit, rate], callback);
};

const getAllWorks = (startDate, endDate, callback) => {
  let query = 'SELECT * FROM works';
  const params = [];

  if (startDate && endDate) {
    query += ' WHERE date BETWEEN ? AND ?';
    params.push(startDate, endDate);
  }

  db.query(query, params, callback);
};

const updateWork = (id, date, chief_engineer_zone, circle, division_name, name_of_agency, place_of_work, item_of_work, quantity, unit, rate, callback) => {
  const query = 'UPDATE works SET date = ?, chief_engineer_zone = ?, circle = ?, division_name = ?, name_of_agency = ?, place_of_work = ?, item_of_work = ?, quantity = ?, unit = ?, rate = ? WHERE id = ?';
  db.query(query, [date, chief_engineer_zone, circle, division_name, name_of_agency, place_of_work, item_of_work, quantity, unit, rate, id], callback);
};

const deleteWork = (id, callback) => {
  const query = 'DELETE FROM works WHERE id = ?';
  db.query(query, [id], callback);
};

module.exports = {
  addWork,
  getAllWorks,
  updateWork,
  deleteWork
};
