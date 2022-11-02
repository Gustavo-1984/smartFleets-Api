import express from 'express';
const router = express.Router();
import {newUser,
  perfil, viewUsers, getUser, updateUser, deleteUser, authUser, newPassword, tokenValid, confirm, uploadPassword} from '../controllers/usersController.js';
  import checkAuth from '../middleware/checkAuth.js';

  // Agragar nuevos usuarios
  /**
   * @swagger
   * components:
   *  schemas:
   *    User:
   *      type: object
   *      properties:
   *        usuario:
   *          type: string
   *          description: Nombre de usuario
   *        password:
   *          type: string
   *          description: Contraseña
   *        serialNumber:
   *          type: string
   *          description: Numero de serie del vehiculo
   */
  /**
  * @swagger
  * /users:
  *   post:
  *    summary: Agragar nuevos usuarios
  *    tags: [User]
  *    requestBody:
  *     required: true
  *     content:
  *       application/json:
  *        schema:
  *         type: object
  *         $ref: '#/components/schemas/User'
  *    responses:
  *     200:
  *       description: Usuario creado
  */
  router.post('/', newUser)
  
  // Obtener todos los usuarios
  /**
  * @swagger
  * /users:
  *   get:
  *    summary: Ver todos los usuarios
  *    tags: [User]
  *    responses:
  *     200:
  *       description: Retorna todos los usuarios
  *       content:
  *        application/json:
  *         schema:
  *          type: array
  *          items:
  *           $ref: '#/components/schemas/User'
  */
  router.get('/', viewUsers)


  /**
  * @swagger
  * /users/perfil:
  *   get:
  *    summary: Ver perfil de un usuario
  *    tags: [User]
  *    security:
  *    - basicAuth: []
  *    responses:
  *     200:
  *       description: Retorna todos los usuarios
  *       content:
  *        application/json:
  *         schema:
  *          type: array
  *          items:
  *           $ref: '#/components/schemas/User'
  */
  router.get('/perfil', checkAuth,  perfil)

  // Muestra un cliente por id
  /**
  * @swagger
  * /users/{_id}:
  *   get:
  *    summary: Ver un usuario por id
  *    tags: [User]
  *    parameters:
  *     - in: path
  *       name: _id
  *       schema:
  *        type: string
  *        required: true
  *        description: Id del usuario
  *    responses:
  *     200:
  *       description: Retorna un usuario
  *       content:
  *        application/json:
  *         schema:
  *          type: object
  *          $ref: '#/components/schemas/User'
  *     404:
  *       description: No se encontro el usuario con ese id
  */
  router.get('/:_id', getUser)

  // Actualizar usuario
  /**
  * @swagger
  * /users/{_id}:
  *   put:
  *    summary: Actualiza un usuario por id
  *    tags: [User]
  *    parameters:
  *     - in: path
  *       name: _id
  *       schema:
  *        type: string
  *        required: true
  *        description: Id del usuario
  *    requestBody:
  *     required: true
  *     content:
  *       application/json:
  *         schema:
  *           type: object
  *           $ref: '#/components/schemas/User'
  *    responses:
  *     200:
  *       description: Retorna un usuario
  *     404:
  *       description: No se encontro el usuario con ese id
  */
  router.put('/:_id', updateUser)

  // Eliminar usuario
  /**
  * @swagger
  * /users/{_id}:
  *   delete:
  *    summary: Borra un usuario por id
  *    tags: [User]
  *    parameters:
  *     - in: path
  *       name: _id
  *       schema:
  *        type: string
  *        required: true
  *        description: Id del usuario
  *    responses:
  *     200:
  *       description: Borra un usuario
  *     404:
  *       description: No se encontro el usuario con ese id
  */
  router.delete('/:_id', deleteUser)

  //Autenticar Usuario
  router.post('/login', authUser)

  router.get('/confirm/:token', confirm)

  //Recuperar contraseña
  router.post('/new-password', newPassword)

  router.get('/new-password/:token', tokenValid)

  router.post('/new-password/:token', uploadPassword)


  

 

  export default router;