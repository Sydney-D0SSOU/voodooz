const express = require('express');
const router = express.Router();
const Auth  = require('../controllers/userController'); // Déstructuration de l'import

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: L'email de l'utilisateur
 *         password:
 *           type: string
 *           description: Le mot de passe de l'utilisateur
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Token JWT pour l'utilisateur
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             nom:
 *               type: string
 *             prenom:
 *               type: string
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *             pays:
 *               type: string
 *             ville:
 *               type: string
 *             role:
 *               type: string
 *               description: Le rôle de l'utilisateur
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion de l'utilisateur
 *     description: Authentifie un utilisateur avec email et mot de passe et renvoie un token JWT avec les détails de l'utilisateur.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Email ou mot de passe incorrect
 *       500:
 *         description: Erreur du serveur
 */
router.post('/login', Auth.loginUser);

module.exports = router;
