const fetch = require('node-fetch')
const APP_ID = process.env.APP_ID
const API_TOKEN = process.env.API_TOKEN

module.exports.getBan = async (req, res) => {
  const { userId, channelUrl, type } = req.query

  try {
    const response = await fetch(`https://api-${APP_ID}.sendbird.com/v3/${type}/${channelUrl}/ban/${userId}`, {
      method: 'GET',
      headers: { 'Api-Token': API_TOKEN }
    })
    const data = await response.json();
    if (response.status === 400 || !data.user) {
      res.status(200).send({ isBanned: false });
    } else if (response.status === 200 && data.user) {
      res.status(200).send({ isBanned: true });
    } else {
      throw new Error('Error while checking ban status')
    }
  } catch (error) {
    res.status(400).send({ error: true, message: error.message })
  }
}

module.exports.ban = async (req, res) => {
  const { isBanned, userId, type, channelUrl } = req.body

  try {
    const response = await fetch(`https://api-${APP_ID}.sendbird.com/v3/${type}/${channelUrl}/ban${isBanned ? `/${userId}` : ''}`, {
      method: isBanned ? 'DELETE' : 'POST',
      headers: { 'Api-Token': API_TOKEN },
      body: isBanned ? undefined : JSON.stringify({ user_id: userId })
    });

    const data = await response.json();
    if (response.status === 200) {
      res.status(200).send({ ...data, isBanned: !isBanned })
    } else if (response.status === 400) {
      // data.code = 400201 = message: "Target user is not on banned user list."
      res.status(200).send({ ...data, isBanned: data.code === 400201 ? false : isBanned })
    } else {
      res.status(response.status).send(data)
    }
  } catch (error) {
    res.status(400).send({ error: true, message: 'There was an error while processing request.' })
  }
}

module.exports.getMute = async (req, res) => {
  const { userId, type, channelUrl } = req.query

  try {
    const response = await fetch(`https://api-${APP_ID}.sendbird.com/v3/${type}/${channelUrl}/mute/${userId}`, {
      method: 'GET',
      headers: { 'Api-Token': API_TOKEN }
    })
    const data = await response.json();
    res.status(response.status).send(data);
  } catch (error) {
    res.status(400).send({ error: true, message: error.message })
  }
}

module.exports.mute = async (req, res) => {
  const { isMuted, userId, type, channelUrl } = req.body

  try {
    const response = await fetch(`https://api-${APP_ID}.sendbird.com/v3/${type}/${channelUrl}/mute${isMuted ? `/${userId}` : ''}`, {
      method: isMuted ? 'DELETE' : 'POST',
      headers: { 'Api-Token': API_TOKEN },
      body: isMuted ? undefined : JSON.stringify({ user_id: userId })
    });
    const data = await response.json();
    if (response.status === 200) {
      res.status(200).send({ ...data, isMuted: !isMuted })
    } else if (response.status === 400) {
      // data.code = 400201 = message: "Target user is not on muted user list."
      res.status(200).send({ ...data, isMuted: data.code === 400201 ? false : isMuted })
    } else {
      res.status(response.status).send(data)
    }
  } catch (error) {
    res.status(400).send({ error: true, message: 'There was an error while processing request.' })
  }
}

module.exports.getChannel = async (req, res) => {
  const { type, channelUrl } = req.query

  try {
    const response = await fetch(`https://api-${APP_ID}.sendbird.com/v3/${type}/${channelUrl}`, {
      method: 'GET',
      headers: { 'Api-Token': API_TOKEN }
    })
    const data = await response.json();
    res.status(response.status).send(data);
  } catch (error) {
    res.status(400).send({ error: true, message: error.message })
  }
}

module.exports.freeze = async (req, res) => {
  const { freeze, channelUrl, type } = req.body

  try {
    const response = await fetch(`https://api-${APP_ID}.sendbird.com/v3/${type}/${channelUrl}/freeze`, {
      method: 'PUT',
      headers: { 'Api-Token': API_TOKEN },
      body: JSON.stringify({ freeze, channelUrl }),
    });
    const data = await response.json();
    if (response.status === 200) {
      console.log("🚀 200 freeze= ~ data", data)
      res.status(200).send(data)
    } else if (response.status === 400) {
      console.log("🚀 400 freeze= ~ data", data)
      res.status(200).send(data)
    } else {
      res.status(response.status).send(data)
    }
  } catch (error) {
    console.log("🚀 ~ file: actions.js ~ line 117 ~ module.exports.freeze= ~ error", error)
    res.status(400).send({ error: true, message: 'There was an error while processing request.' })
  }
}

module.exports.getMessage = async (req, res) => {
  const { type, channelUrl, messageId } = req.query

  try {
    const response = await fetch(`https://api-${APP_ID}.sendbird.com/v3/${type}/${channelUrl}/messages/${messageId}`, {
      method: 'GET',
      headers: { 'Api-Token': API_TOKEN }
    })
    const data = await response.json();
    res.status(response.status).send(data);
  } catch (error) {
    res.status(400).send({ error: true, message: error.message })
  }
}

module.exports.deleteMessage = async (req, res) => {
  const { type, channelUrl, messageId } = req.body

  try {
    const response = await fetch(`https://api-${APP_ID}.sendbird.com/v3/${type}/${channelUrl}/messages/${messageId}`, {
      method: 'DELETE',
      headers: { 'Api-Token': API_TOKEN }
    })
    const data = await response.json();
    res.status(response.status).send(data);
  } catch (error) {
    res.status(400).send({ error: true, message: error.message })
  }
}
