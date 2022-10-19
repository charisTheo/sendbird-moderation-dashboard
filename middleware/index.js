const SendBird = require("sendbird");
const APP_ID = process.env.APP_ID

module.exports.authMiddleware = (req, res, next) => {
  try {
    const sessionToken = req.headers?.authorization?.replace("Bearer", "").trim()
    const userId = req.headers?.sbuserid
    if (!userId || !sessionToken) {
      res.status(403).send({ error: true, message: "User Not authorized" })
      return
    }
    const sb = new SendBird({ appId: APP_ID })
    sb.connect(userId, sessionToken).then(_ => {
      sb.disconnect();
      next()
    }).catch(_ => {
      res.status(403).send({ error: true, message: "User Not authorized" })
    })
  } catch (_) {
    res.status(403).send({ error: true, message: "User Not authorized" })
  }
}