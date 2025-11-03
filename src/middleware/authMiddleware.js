const authService = require('../services/authService');

function jwtAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const err = new Error('authorization header missing');
    err.status = 401;
    return next(err);
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = authService.verifyToken(token);
    req.user = { id: payload.sub, name: payload.name };
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { jwtAuth };
