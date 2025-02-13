const SuperAdmin = require('../models/superadmin');
const Etagere = require('../models/etagere');
const Livre = require('../models/livre');
// Créer un nouveau livre
exports.createLivre = async (req, res) => {
  try {
    const { titreLiv, auteurLivre, dateLiv, etagereId, superAdminId } = req.body;
    const imageLiv = req.files['imageLiv'] ? req.files['imageLiv'][0].path : null;
    const fileLiv = req.files['fileLiv'] ? req.files['fileLiv'][0].path : null;

    const livre = await Livre.create({
      titreLiv,
      auteurLivre,
      dateLiv,
      imageLiv,
      fileLiv,
      etagereId,
      superAdminId
    });

    res.status(201).json(livre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer tous les livres
exports.getAllLivres = async (req, res) => {
  try {
    const livres = await Livre.findAll({
      include: [
        { model: Etagere, as: 'etagere' },
        { model: SuperAdmin, as: 'superAdmin' }
      ]
    });
    res.status(200).json(livres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un livre par ID
exports.getLivreById = async (req, res) => {
  try {
    const { id } = req.params;
    const livre = await Livre.findOne({
      where: { idLiv: id },
      include: [
        { model: Etagere, as: 'etagere' },
        { model: SuperAdmin, as: 'superAdmin' }
      ]
    });
    if (livre) {
      res.status(200).json(livre);
    } else {
      res.status(404).json({ error: 'Livre not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un livre
exports.updateLivre = async (req, res) => {
  try {
    const { id } = req.params;
    const { titreLiv, auteurLivre, dateLiv, etagereId, superAdminId } = req.body;
    const imageLiv = req.files['imageLiv'] ? req.files['imageLiv'][0].path : null;
    const fileLiv = req.files['fileLiv'] ? req.files['fileLiv'][0].path : null;

    const [updated] = await Livre.update({
      titreLiv,
      auteurLivre,
      dateLiv,
      imageLiv,
      fileLiv,
      etagereId,
      superAdminId
    }, {
      where: { idLiv: id }
    });

    if (updated) {
      const updatedLivre = await Livre.findOne({ where: { idLiv: id } });
      res.status(200).json(updatedLivre);
    } else {
      res.status(404).json({ error: 'Livre not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un livre
exports.deleteLivre = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Livre.destroy({
      where: { idLiv: id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Livre not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};