'use strict'

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client-controller');


router.get('/clients', clientController.getAll); 
router.get('/clients/:id', clientController.getOne);
router.post('/addClient', clientController.createClient);
router.put('/clients/:id', clientController.updateClient);
router.delete('/deleteClient/:id', clientController.deleteClient);


module.exports = router;