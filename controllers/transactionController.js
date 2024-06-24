const { asyncScheduler } = require('rxjs');
const transactionModel = require('../models/transactionModel');
const moment = require('moment');


const getAllTransactions = async (req, res) => {
    try {

       const {frequency, selectedDate, type} = req.body;
       const transactions = await transactionModel.find({

         ...(frequency !== 'Custom' ? {
               date : {
                  $gt : moment().subtract(Number(frequency), 'd').toDate(),
               },
            } : {
               date : {
                  $gte : selectedDate[0],
                  $lte : selectedDate[1]
               }
            }
         ),
          userid: req.body.userid,
          ...(type !== 'all' && {type}),
       });
       res.status(200).json(transactions);
    } catch (error) {
       console.log(error);
       res.status(500).json(error);
    }
 };
 

 const addTransaction = async (req, res) => {
    try {
        const newTransaction = new transactionModel(req.body);
        await newTransaction.save();
        res.status(201).send("Transaction added successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};



module.exports = {getAllTransactions, addTransaction};

