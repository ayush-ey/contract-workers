const workService = require('../services/workService');

const addWork = (req, res) => {
  const { date, chief_engineer_zone, circle, division_name, name_of_agency, place_of_work, item_of_work, quantity, unit, rate } = req.body;
  workService.addWork(date, chief_engineer_zone, circle, division_name, name_of_agency, place_of_work, item_of_work, quantity, unit, rate, (err, result) => {
    if (err) {
      console.error('Error adding work:', err);
      res.status(500).send('Error adding work');
    } else {
      res.send('Work added successfully');
    }
  });
};

const getAllWorks = (req, res) => {
  const { startDate, endDate } = req.query;
  workService.getAllWorks(startDate, endDate, (err, results) => {
    if (err) {
      console.error('Error fetching works:', err);
      res.status(500).send('Error fetching works');
    } else {
      res.json(results);
    }
  });
};

const updateWork = (req, res) => {
  const { id } = req.params;
  const { date, chief_engineer_zone, circle, division_name, name_of_agency, place_of_work, item_of_work, quantity, unit, rate } = req.body;
  workService.updateWork(id, date, chief_engineer_zone, circle, division_name, name_of_agency, place_of_work, item_of_work, quantity, unit, rate, (err, result) => {
    if (err) {
      console.error('Error updating work:', err);
      res.status(500).send('Error updating work');
    } else {
      res.send('Work updated successfully');
    }
  });
};

const deleteWork = (req, res) => {
  const { id } = req.params;
  workService.deleteWork(id, (err, result) => {
    if (err) {
      console.error('Error deleting work:', err);
      res.status(500).send('Error deleting work');
    } else {
      res.send('Work deleted successfully');
    }
  });
};

module.exports = {
  addWork,
  getAllWorks,
  updateWork,
  deleteWork
};
