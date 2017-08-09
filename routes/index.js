const express = require('express');
const Reps = require('../lib/reps');
const router = express.Router();

router.get('/', (req, res, next) => {
  const reps = Reps.getGroupedByMonth()
  res.render('index', {
    title: 'Reps Anniversaries',
    reps
  });
});

module.exports = router;
