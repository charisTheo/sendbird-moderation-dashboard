const { actions, auth, reports, profanities, links } = require('../controllers');
const { auth: authMiddleware } = require('../middleware');

module.exports = (app) => {
  app.get('/api/link', authMiddleware, links);
  app.post('/api/auth', auth.login);
  app.delete('/api/auth', auth.logout);
  app.get('/api/reports', authMiddleware, reports);
  app.get('/api/profanities', authMiddleware, profanities);
  app.get('/api/ban', authMiddleware, actions.getBan);
  app.post('/api/ban', authMiddleware, actions.ban);
  app.get('/api/mute', authMiddleware, actions.getMute);
  app.post('/api/mute', authMiddleware, actions.mute);
  app.get('/api/channels', authMiddleware, actions.getChannel);
  app.put('/api/freeze', authMiddleware, actions.freeze);
  app.get('/api/messages', authMiddleware, actions.getMessage);
  app.delete('/api/messages', authMiddleware, actions.deleteMessage);
}