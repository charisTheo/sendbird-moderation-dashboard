/**
 * @returns {Boolean}
 */
export function isLoggedIn() {
  const auth = getLoginDetails()
  return Boolean(auth && auth.appId && auth.apiToken)
}

export function logout() {
  localStorage.setItem('auth', '')
}

/**
 * @param {Object} auth
 * @param {String} auth.appId
 * @param {String} auth.apiToken
 */
export function setLoginDetails(auth) {
  localStorage.setItem('auth', JSON.stringify(auth))
}

/**
 * @returns {Object|null} {appId, apiToken}
 */
export function getLoginDetails() {
  return JSON.parse(localStorage.getItem('auth') || 'null')
}

export function getLinkToUser(id) {
  const auth = getLoginDetails()
  if (!auth) {
    return null
  }
  return `https://dashboard.sendbird.com/${auth.appId}/users/${id}`
}

export function getLinkToGroupChannel(id) {
  const auth = getLoginDetails()
  if (!auth) {
    return null
  }
  return `https://dashboard.sendbird.com/${auth.appId}/group_channels/${id}`
}