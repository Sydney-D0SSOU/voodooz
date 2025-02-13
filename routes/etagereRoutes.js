const express = require('express');
const router = express.Router();
const etagereController = require('../controllers/etagereController');

/**
 * @swagger
 * tags:
 *   name: Etageres
 *   description: Gestion des étagères
 */

/**
 * @swagger
 * /etagere/etageres:
 *   post:
 *     summary: Créer une nouvelle étagère
 *     tags: [Etageres]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - libelEt
 *             properties:
 *               libelEt:
 *                 type: string
 *     responses:
 *       201:
 *         description: L'étagère a été créée avec succès
 *       500:
 *         description: Une erreur est survenue
 */
router.post('/etageres', etagereController.createEtagere);

/**
 * @swagger
 * /etagere/etageres:
 *   get:
 *     summary: Récupérer toutes les étagères
 *     tags: [Etageres]
 *     responses:
 *       200:
 *         description: Liste des étagères
 *       500:
 *         description: Une erreur est survenue
 */
router.get('/etageres', etagereController.getAllEtageres);

/**
 * @swagger
 * /etagere/etageres/{id}:
 *   get:
 *     summary: Récupérer une étagère par ID
 *     tags: [Etageres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'étagère
 *     responses:
 *       200:
 *         description: Détails de l'étagère
 *       404:
 *         description: Etagere non trouvée
 *       500:
 *         description: Une erreur est survenue
 */
router.get('/etageres/:id', etagereController.getEtagereById);

/**
 * @swagger
 * /etagere/etageres/{id}:
 *   put:
 *     summary: Mettre à jour une étagère
 *     tags: [Etageres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'étagère
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               libelEt:
 *                 type: string
 *     responses:
 *       200:
 *         description: L'étagère a été mise à jour avec succès
 *       404:
 *         description: Etagere non trouvée
 *       500:
 *         description: Une erreur est survenue
 */
router.put('/etageres/:id', etagereController.updateEtagere);

/**
 * @swagger
 * /etagere/etageres/{id}:
 *   delete:
 *     summary: Supprimer une étagère
 *     tags: [Etageres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'étagère
 *     responses:
 *       204:
 *         description: L'étagère a été supprimée avec succès
 *       404:
 *         description: Etagere non trouvée
 *       500:
 *         description: Une erreur est survenue
 */
router.delete('/etageres/:id', etagereController.deleteEtagere);

module.exports = router;