const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ error: 'Token non fourni' });

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token invalide' });

    req.user = user; // Ajouter les informations de l'utilisateur à la requête
    next();
  });
};

module.exports = {
  authenticateToken,
};
