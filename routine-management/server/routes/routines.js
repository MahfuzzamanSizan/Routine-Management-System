const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all routines
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM routines ORDER BY date, starttime');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get single routine
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM routines WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create routine
router.post('/', async (req, res) => {
  const { subject, date, startTime, endTime, classType, examName, duration } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO routines (subject, date, starttime, endtime, classtype, examname, duration) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [subject, date, startTime, endTime, classType, examName, duration]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update routine
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { subject, date, startTime, endTime, classType, examName, duration } = req.body;
  try {
    const result = await pool.query(
      'UPDATE routines SET subject=$1, date=$2, starttime=$3, endtime=$4, classtype=$5, examname=$6, duration=$7 WHERE id=$8 RETURNING *',
      [subject, date, startTime, endTime, classType, examName, duration, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete routine
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM routines WHERE id = $1', [id]);
    res.json({ message: 'Routine deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
