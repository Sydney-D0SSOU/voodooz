const express = require('express');
const router = express.Router();
const livreController = require('../controllers/livreController');
const upload = require('../middleware/multerConfig');

/**
 * @swagger
 * tags:
 *   name: Livres
 *   description: Gestion des livres
 */

/**
 * @swagger
 * /livre/livres:
 *   post:
 *     summary: Créer un nouveau livre
 *     tags: [Livres]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - titreLiv
 *               - auteurLivre
 *               - dateLiv
 *               - etagereId
 *               - superAdminId
 *             properties:
 *               titreLiv:
 *                 type: string
 *               auteurLivre:
 *                 type: string
 *               dateLiv:
 *                 type: string
 *                 format: date
 *               imageLiv:
 *                 type: string
 *                 format: binary
 *               fileLiv:
 *                 type: string
 *                 format: binary
 *               etagereId:
 *                 type: integer
 *               superAdminId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Le livre a été créé avec succès
 *       500:
 *         description: Une erreur est survenue
 */
router.post('/livres', upload.fields([{ name: 'imageLiv', maxCount: 1 }, { name: 'fileLiv', maxCount: 1 }]), livreController.createLivre);

/**
 * @swagger
 * /livre/livres:
 *   get:
 *     summary: Récupérer tous les livres
 *     tags: [Livres]
 *     responses:
 *       200:
 *         description: Liste des livres
 *       500:
 *         description: Une erreur est survenue
 */
router.get('/livres', livreController.getAllLivres);

/**
 * @swagger
 * /livre/livres/{id}:
 *   get:
 *     summary: Récupérer un livre par ID
 *     tags: [Livres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du livre
 *     responses:
 *       200:
 *         description: Détails du livre
 *       404:
 *         description: Livre non trouvé
 *       500:
 *         description: Une erreur est survenue
 */
router.get('/livres/:id', livreController.getLivreById);

/**
 * @swagger
 * /livre/livres/{id}:
 *   put:
 *     summary: Mettre à jour un livre
 *     tags: [Livres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du livre
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titreLiv:
 *                 type: string
 *               auteurLivre:
 *                 type: string
 *               dateLiv:
 *                 type: string
 *                 format: date
 *               imageLiv:
 *                 type: string
 *                 format: binary
 *               fileLiv:
 *                 type: string
 *                 format: binary
 *               etagereId:
 *                 type: integer
 *               superAdminId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Le livre a été mis à jour avec succès
 *       404:
 *         description: Livre non trouvé
 *       500:
 *         description: Une erreur est survenue
 */
router.put('/livres/:id', upload.fields([{ name: 'imageLiv', maxCount: 1 }, { name: 'fileLiv', maxCount: 1 }]), livreController.updateLivre);

/**
 * @swagger
 * /livre/livres/{id}:
 *   delete:
 *     summary: Supprimer un livre
 *     tags: [Livres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du livre
 *     responses:
 *       204:
 *         description: Le livre a été supprimé avec succès
 *       404:
 *         description: Livre non trouvé
 *       500:
 *         description: Une erreur est survenue
 */
router.delete('/livres/:id', livreController.deleteLivre);

module.exports = router;