const Superadmin = require('../models/superadmin');
const User = require('../models/user') ;
const bcrypt = require('bcrypt');

// Inscription d'un Superadmin (création d'un utilisateur et d'un Superadmin)
exports.registerSuperadmin = async (req, res) => {
  try {
    const { nom, prenom, email, password, phone, pays, ville } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
      phone,
      pays,
      ville
    });

    const newSuperadmin = await Superadmin.create({
      userId: newUser.id
    });

    res.status(201).json({
      Superadmin: newSuperadmin,
      user: newUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
