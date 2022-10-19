const { moderation, auth, reports, profanities, links } = require('../controllers');
const { authMiddleware } = require('../middleware');

module.exports = (app) => {
  app.get('/api/link', authMiddleware, links);
  app.post('/api/auth', auth.login);
  app.delete('/api/auth', auth.logout);
  app.get('/api/reports', authMiddleware, reports);
  app.get('/api/profanities', authMiddleware, profanities);
  app.get('/api/ban', authMiddleware, moderation.getBan);
  app.post('/api/ban', authMiddleware, moderation.ban);
  app.get('/api/mute', authMiddleware, moderation.getMute);
  app.post('/api/mute', authMiddleware, moderation.mute);
  app.get('/api/channels', authMiddleware, moderation.getChannel);
  app.put('/api/freeze', authMiddleware, moderation.freeze);
  app.get('/api/messages', authMiddleware, moderation.getMessage);
  app.delete('/api/messages', authMiddleware, moderation.deleteMessage);
}