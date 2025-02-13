const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Gestion des lecteurs de la bibliothèque
 */

/**
 * @swagger
 * /client/register:
 *   post:
 *     summary: Inscription d'un nouveau client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               pays:
 *                 type: string
 *               ville:
 *                 type: string
 *     responses:
 *       201:
 *         description: Client créé avec succès
 *       400:
 *         description: Email déjà utilisé
 *       500:
 *         description: Erreur du serveur
 */
router.post('/register', clientController.registerClient);

/**
 * @swagger
 * /client/list:
 *   get:
 *     summary: Récupérer tous les clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Liste des clients
 *       500:
 *         description: Erreur du serveur
 */
router.get('/list', clientController.getAllClients);

/**
 * @swagger
 * /client/{id}:
 *   get:
 *     summary: Récupérer un client par son ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du client
 *       404:
 *         description: Client non trouvé
 *       500:
 *         description: Erreur du serveur
 */
router.get('/list/:id', clientController.getClientById);

/**
 * @swagger
 * /client/{id}:
 *   put:
 *     summary: Mettre à jour un client par son ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               pays:
 *                 type: string
 *               ville:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client mis à jour avec succès
 *       404:
 *         description: Client non trouvé
 *       500:
 *         description: Erreur du serveur
 */
router.put('/:id', clientController.updateClient);

/**
 * @swagger
 * /client/{id}:
 *   delete:
 *     summary: Supprimer un client par son ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Client supprimé avec succès
 *       404:
 *         description: Client non trouvé
 *       500:
 *         description: Erreur du serveur
 */
router.delete('/:id', clientController.deleteClient);

module.exports = router;
