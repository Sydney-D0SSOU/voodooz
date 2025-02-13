const express = require('express');
const router = express.Router();
const superadminController = require('../controllers/superadminController');

/**
 * @swagger
 * tags:
 *   name: Superadmins
 *   description: Gestion des superadmins
 */

/**
 * @swagger
 * /superadmin/register:
 *   post:
 *     summary: Inscription d'un Superadmin
 *     tags: [Superadmins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Dupont"
 *               prenom:
 *                 type: string
 *                 example: "Jean"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jean.dupont@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "MotDePasse123"
 *               phone:
 *                 type: string
 *                 example: "+123456789"
 *               pays:
 *                 type: string
 *                 example: "France"
 *               ville:
 *                 type: string
 *                 example: "Paris"
 *     responses:
 *       201:
 *         description: Superadmin créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Superadmin:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     userId:
 *                       type: integer
 *                       example: 1
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nom:
 *                       type: string
 *                       example: "Dupont"
 *                     prenom:
 *                       type: string
 *                       example: "Jean"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "jean.dupont@example.com"
 *                     phone:
 *                       type: string
 *                       example: "+123456789"
 *                     pays:
 *                       type: string
 *                       example: "France"
 *                     ville:
 *                       type: string
 *                       example: "Paris"
 *       400:
 *         description: Erreur de validation des données
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cet email est déjà utilisé."
 *       500:
 *         description: Erreur serveur interne
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur serveur interne."
 */
router.post('/register', superadminController.registerSuperadmin);

module.exports = router;
