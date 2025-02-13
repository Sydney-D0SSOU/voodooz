const express = require('express');
const { requestPasswordReset, resetPassword } = require('../controllers/passwordController');
const router = express.Router();

/**
 * @swagger
 * /password/request-reset:
 *   post:
 *     summary: Demander la réinitialisation du mot de passe
 *     description: Envoie un email avec un lien de réinitialisation de mot de passe.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: utilisateur@example.com
 *     responses:
 *       200:
 *         description: Email envoyé.
 *       404:
 *         description: Utilisateur non trouvé.
 */
router.post('/request-reset', requestPasswordReset);

/**
 * @swagger
 * /password/reset:
 *   post:
 *     summary: Réinitialiser le mot de passe
 *     description: Réinitialise le mot de passe à l'aide d'un token valide.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: 1234567890abcdef
 *               newPassword:
 *                 type: string
 *                 example: nouveauMotDePasse
 *     responses:
 *       200:
 *         description: Mot de passe réinitialisé avec succès.
 *       400:
 *         description: Token invalide ou expiré.
 */
router.post('/reset', resetPassword);

module.exports = router;
