const { auth, reports, profanities, links } = require('../controllers');
const { auth: authMiddleware } = require('../middleware');

module.exports = (app) => {
  app.get('/api/link', authMiddleware, links);
  app.post('/api/auth', auth.login);
  app.delete('/api/auth', auth.logout);
  app.get('/api/reports', authMiddleware, reports);
  app.get('/api/profanities', authMiddleware, profanities);
}