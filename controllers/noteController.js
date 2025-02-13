const Livre = require('../models/livre');
const Note = require('../models/note');
const Client = require('../models/client');
// Créer une nouvelle note
exports.createNote = async (req, res) => {
  try {
    const { textNote, dateNote, clientId, livreId } = req.body;
    const note = await Note.create({ textNote, dateNote, clientId, livreId });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer toutes les notes
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      include: [
        { model: Livre, as: 'livre' },
        { model: Client, as: 'client' }
      ]
    });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer une note par ID
exports.getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOne({
      where: { idNote: id },
      include: [
        { model: Livre, as: 'livre' },
        { model: Client, as: 'client' }
      ]
    });
    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une note
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { textNote, dateNote, clientId, livreId } = req.body;
    const [updated] = await Note.update({ textNote, dateNote, clientId, livreId }, {
      where: { idNote: id }
    });
    if (updated) {
      const updatedNote = await Note.findOne({ where: { idNote: id } });
      res.status(200).json(updatedNote);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une note
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Note.destroy({
      where: { idNote: id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};