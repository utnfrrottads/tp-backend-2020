"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var Empresa_controller_1 = require("../controller/Empresa.controller");
router.get('/Empresas', Empresa_controller_1.getEmpresas);
// router.get('/Empresas', createEmpresa);
// router.post('/Empresas/:cuit', getEmpresa);
// router.put('/Empresas/:cuit', updateEmpresa);
// router.delete('/Empresas/:cuit', deleteEmpresa);
exports.default = router;
