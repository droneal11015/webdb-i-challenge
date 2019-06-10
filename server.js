const express = require('express');
const morgan = require('morgan');
const db = require('./data/accounts-model');

const server = express();

server.use(express.json());
server.use(morgan('dev'));

server.get('/', async(req, res) => {
    try {
        const allAccounts = await db.find(req.body);
        if (allAccounts.length > 0){
            res.json(allAccounts);
        } else {
            res.status(400).json({message: "No accounts found."}.message)
        }
    } catch (err){
        res.status(500).json(err.message);
    }
})

server.get('/:id', async(req, res) => {
    try{
        const account = await db.findById(req.params.id);
        res.json(account);
    } catch (err){
        res.status(500).json(err.message);
    }
})

server.post('/', async(req, res) => {
    try{
        const newMessage = await db.add(req.body);
        if (newMessage.name || newMessage.budget) {
            res.json(newMessage)
        } else {
            res.status(400).json({message: "Name and budget required."}.message)
        }
    } catch (err){
        res.status(500).json(err.message)
    }
})




// your code here

module.exports = server;