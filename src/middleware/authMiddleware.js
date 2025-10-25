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
    // sanitize token: remove surrounding quotes and trim
    const raw = String(token || '').trim().replace(/^"|"$/g, '');
    if (!raw || raw === 'undefined' || raw === 'null') {
      const err = new Error('invalid token');
      err.status = 401;
      return next(err);
    }

    const payload = authService.verifyToken(raw);
    req.user = { id: payload.sub, name: payload.name };
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { jwtAuth };
