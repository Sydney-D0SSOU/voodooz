const SuperAdmin = require('../models/superadmin');
const Category = require('../models/category');
// Créer une nouvelle catégorie
exports.createCategory = async (req, res) => {
  try {
    const { libelCat, superAdminId } = req.body;
    const category = await Category.create({ libelCat, superAdminId });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer toutes les catégories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: SuperAdmin, as: 'superAdmin' }]
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer une catégorie par ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({
      where: { idCat: id },
      include: [{ model: SuperAdmin, as: 'superAdmin' }]
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une catégorie
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { libelCat, superAdminId } = req.body;
    const [updated] = await Category.update({ libelCat, superAdminId }, {
      where: { idCat: id }
    });
    if (updated) {
      const updatedCategory = await Category.findOne({ where: { idCat: id } });
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une catégorie
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.destroy({
      where: { idCat: id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};