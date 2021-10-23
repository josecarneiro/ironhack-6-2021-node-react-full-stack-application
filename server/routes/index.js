'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  res.json({ message: 'Hello world' });
  // res.json({ type: 'success', data: { title: 'Hello World' } });
});

router.get('/books', (req, res, next) => {
  res.json({
    books: [{ title: 'The Master Algorithm', author: 'Pedro Domingos' }]
  });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.json({});
});

module.exports = router;
