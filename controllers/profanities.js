const fetch = require('node-fetch')
const APP_ID = process.env.APP_ID
const API_TOKEN = process.env.API_TOKEN

module.exports = async (req, res) => {
  const { channel_url, message_ts, next_limit, prev_limit } = req.query
  const paginationLimit = next_limit ? `next_limit=${next_limit}` : `prev_limit=${prev_limit}`

  // Docs: https://sendbird.com/docs/chat/v3/platform-api/guides/report-content-and-subject#2-list-moderated-messages
  const url = `https://api-${APP_ID}.sendbird.com/v3/report/group_channels/${channel_url}/profanity_messages?message_ts=${message_ts}&${paginationLimit}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Api-Token': API_TOKEN }
    })
    const data = await response.json();
    res.status(response.status).send(data)
  } catch (error) {
    res.status(400).send({ error: true, message: error.message })
  }
}