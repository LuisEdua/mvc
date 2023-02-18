var express = require('express');

var userController = require('../src/user/userController');
const router = express.Router();

// ruta para login
router.route('/user/login').post(userController.loginUserControllerFunc);
// ruta para crear usuario
router.route('/user/create').post(userController.createUserControllerFunc);
// ruta para buscar usuarios por nombre
router.route('/user/find/:name').get(userController.findUserByName);
//ruta para eliminar usuarios por nombre
router.route('/user/delete/:name').delete(userController.deleteUserByName);

module.exports = router;
