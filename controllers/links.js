const APP_ID = process.env.APP_ID

const TYPES_OF_LINKS = [
  'group_channels',
  'open_channels',
  'users'
]

module.exports = (req, res) => {
  const { type, value = '' } = req.query
  if (!TYPES_OF_LINKS.find(_ => _ === type)) {
    res.status(400).send({ error: true, message: `Invalid type: ${type}` })
  } else {
    res.status(200).send({ link: `https://dashboard.sendbird.com/${APP_ID}/${type}/${value}` })
  }
}