const fetch = require('node-fetch')
const APP_ID = process.env.APP_ID
const API_TOKEN = process.env.API_TOKEN

module.exports = async (req, res) => {
  const { start_ts, end_ts } = req.query
  const reports = []
  async function getReports(_next = '') {
    // Docs: https://sendbird.com/docs/chat/v3/platform-api/report/listing-reports/list-reports
    var url = `https://api-${APP_ID}.sendbird.com/v3/report?limit=100`
    // filter by datetime range
    if (start_ts && end_ts) {
      url += `&start_ts=${start_ts}&end_ts=${end_ts}`
    }
    if (_next) {
      url += `&token=${_next}`
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Api-Token': API_TOKEN }
    })
    if (response.status !== 200) {
      const { message } = await response.json()
      res.status(response.status).send({ error: true, message })
      return
    }

    const { report_logs, next } = await response.json();
    reports.push(...(report_logs || []));

    if (next) {
      getReports(next)
    } else {
      res.status(200).send({ reports })
    }
  }
  await getReports()
}