const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Gestion des notes
 */

/**
 * @swagger
 * /note/notes:
 *   post:
 *     summary: Créer une nouvelle note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - textNote
 *               - clientId
 *               - livreId
 *             properties:
 *               textNote:
 *                 type: string
 *               dateNote:
 *                 type: string
 *                 format: date
 *               clientId:
 *                 type: integer
 *               livreId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: La note a été créée avec succès
 *       500:
 *         description: Une erreur est survenue
 */
router.post('/notes', noteController.createNote);

/**
 * @swagger
 * /note/notes:
 *   get:
 *     summary: Récupérer toutes les notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Liste des notes
 *       500:
 *         description: Une erreur est survenue
 */
router.get('/notes', noteController.getAllNotes);

/**
 * @swagger
 * /note/notes/{id}:
 *   get:
 *     summary: Récupérer une note par ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la note
 *     responses:
 *       200:
 *         description: Détails de la note
 *       404:
 *         description: Note non trouvée
 *       500:
 *         description: Une erreur est survenue
 */
router.get('/notes/:id', noteController.getNoteById);

/**
 * @swagger
 * /note/notes/{id}:
 *   put:
 *     summary: Mettre à jour une note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               textNote:
 *                 type: string
 *               dateNote:
 *                 type: string
 *                 format: date
 *               clientId:
 *                 type: integer
 *               livreId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: La note a été mise à jour avec succès
 *       404:
 *         description: Note non trouvée
 *       500:
 *         description: Une erreur est survenue
 */
router.put('/notes/:id', noteController.updateNote);

/**
 * @swagger
 * /note/notes/{id}:
 *   delete:
 *     summary: Supprimer une note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la note
 *     responses:
 *       204:
 *         description: La note a été supprimée avec succès
 *       404:
 *         description: Note non trouvée
 *       500:
 *         description: Une erreur est survenue
 */
router.delete('/notes/:id', noteController.deleteNote);

module.exports = router;