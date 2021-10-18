var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController.js');

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - users
 *     name: Get All users
 *     summary: Get a listing of all users
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       -none
 *     responses:
 *       '200':
 *         description: A listing of all users
 *         schema:
 *           $ref: '#/definitions/User'
 *       '401':
 *         description: No auth token / no user found in db with that name
 *       '403':
 *         description: JWT token and username from client don't match
 */
/* GET users listing. */
router.get('/', UserController.getAllUsers);

/**
 * @swagger
 * /{id}:
 *   get:
 *     tags:
 *       - users
 *     name: get user by id
 *     summary: Finds a user
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       
 *     responses:
 *       '200':
 *         description: A single user object
 *         schema:
 *           $ref: '#/definitions/User'
 *       '401':
 *         description: No auth token / no user found in db with that name
 *       '403':
 *         description: JWT token and username from client don't match
 */

router.get('/:id', UserController.getSingleUser);

module.exports = router;
