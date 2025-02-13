const SuperAdmin = require('../models/superadmin');
const Etagere = require('../models/etagere');
// Créer une nouvelle étagère
exports.createEtagere = async (req, res) => {
  try {
    const { libelEt } = req.body;
    const etagere = await Etagere.create({ libelEt });
    res.status(201).json(etagere);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer toutes les étagères
exports.getAllEtageres = async (req, res) => {
  try {
    const etageres = await Etagere.findAll();
    res.status(200).json(etageres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer une étagère par ID
exports.getEtagereById = async (req, res) => {
  try {
    const { id } = req.params;
    const etagere = await Etagere.findOne({
      where: { idEt: id }
    });
    if (etagere) {
      res.status(200).json(etagere);
    } else {
      res.status(404).json({ error: 'Etagere not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une étagère
exports.updateEtagere = async (req, res) => {
  try {
    const { id } = req.params;
    const { libelEt } = req.body;
    const [updated] = await Etagere.update({ libelEt }, {
      where: { idEt: id }
    });
    if (updated) {
      const updatedEtagere = await Etagere.findOne({ where: { idEt: id } });
      res.status(200).json(updatedEtagere);
    } else {
      res.status(404).json({ error: 'Etagere not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une étagère
exports.deleteEtagere = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Etagere.destroy({
      where: { idEt: id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Etagere not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};