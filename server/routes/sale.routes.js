const express = require('express');
const saleRouter = express.Router(); //Creo el Router

const saleCtrl = require('../controllers/sale.controller'); //Importo el controlador de la BD
const saleValidator = require('../validators/sale.validator'); 

saleRouter.get('/', saleCtrl.getSales); //Si va con un metodo get es un GetAll
saleRouter.get('/:id', saleCtrl.getSale); //Si va con un metodo get y un ObjectId es un GetOne
saleRouter.post('/', saleValidator.validateSaleCreate, saleCtrl.createSale); //Si va con un post es un Create
saleRouter.put('/:id', saleValidator.validateSaleUpdate, saleCtrl.updateSale); //Si va con un put es un Update al ObjectId especificado
saleRouter.delete('/:id', saleCtrl.deleteSale); //Si va con un delete es un Delete al ObjectId especificado

module.exports = saleRouter; //Exporto para requerirlo en otro lado