const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gestion des catégories
 */

/**
 * @swagger
 * /category/categories:
 *   post:
 *     summary: Créer une nouvelle catégorie
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - libelCat
 *               - superAdminId
 *             properties:
 *               libelCat:
 *                 type: string
 *               superAdminId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: La catégorie a été créée avec succès
 *       500:
 *         description: Une erreur est survenue
 */
router.post('/categories', categoryController.createCategory);

/**
 * @swagger
 * /category/categories:
 *   get:
 *     summary: Récupérer toutes les catégories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Liste des catégories
 *       500:
 *         description: Une erreur est survenue
 */
router.get('/categories', categoryController.getAllCategories);

/**
 * @swagger
 * /category/categories/{id}:
 *   get:
 *     summary: Récupérer une catégorie par ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la catégorie
 *     responses:
 *       200:
 *         description: Détails de la catégorie
 *       404:
 *         description: Catégorie non trouvée
 *       500:
 *         description: Une erreur est survenue
 */
router.get('/categories/:id', categoryController.getCategoryById);

/**
 * @swagger
 * /category/categories/{id}:
 *   put:
 *     summary: Mettre à jour une catégorie
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la catégorie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               libelCat:
 *                 type: string
 *               superAdminId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: La catégorie a été mise à jour avec succès
 *       404:
 *         description: Catégorie non trouvée
 *       500:
 *         description: Une erreur est survenue
 */
router.put('/categories/:id', categoryController.updateCategory);

/**
 * @swagger
 * /category/categories/{id}:
 *   delete:
 *     summary: Supprimer une catégorie
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la catégorie
 *     responses:
 *       204:
 *         description: La catégorie a été supprimée avec succès
 *       404:
 *         description: Catégorie non trouvée
 *       500:
 *         description: Une erreur est survenue
 */
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;