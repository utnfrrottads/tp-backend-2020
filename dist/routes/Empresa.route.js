"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var Empresa_controller_1 = require("../controller/Empresa.controller");
router.get('/getEmpresas', Empresa_controller_1.getEmpresas);
router.post('/createEmpresa', Empresa_controller_1.createEmpresa);
router.get('/getEmpresa/:cuit', Empresa_controller_1.getEmpresa);
router.put('/UpdateEmpresa', Empresa_controller_1.updateEmpresa);
router.delete('/deleteEmpresa/:cuit', Empresa_controller_1.deleteEmpresa);
exports.default = router;
