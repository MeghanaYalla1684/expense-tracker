const express = require('express');
const { addTransaction, getAllTransactions } = require('../controllers/transactionController');

const router = express.Router();

// routers
router.post('/add-transaction', addTransaction );

router.post('/get-transaction', getAllTransactions );

module.exports = router;