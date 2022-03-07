/**
 * Required for side nav to show login or logout button
 * @returns {Boolean}
 */
export function isLoggedIn() {
  const auth = getLoginDetails()
  return Boolean(auth && auth.userId && auth.sessionToken)
}

export async function logout() {
  const auth = getLoginDetails()

  try {
    const response = await fetch('/api/auth', {
      method: 'DELETE',
      body: JSON.stringify({ userId: auth.userId }),
      headers: { 'Content-Type': 'application/json' }
    })
    // server will set a cookie with session token
    // and redirect to home page if login successful
    if (response.status !== 200) {
      const { message } = await response.json()
      return message
    } else {
      // removes only sessionToken from local storage
      // userID is persisted for better UX
      localStorage.setItem('auth', JSON.stringify({ userId: auth.userId }))
      return 'Successfully logged out!'
    }
  } catch (e) {
    return 'There was an error while logging out. Try logging in again.'
  }
}

/**
 * @param {Object} auth
 * @param {String} auth.userId
 * @param {String} auth.sessionToken
 */
export function setLoginDetails(auth) {
  localStorage.setItem('auth', JSON.stringify(auth))
}

/**
 * @returns {Object|null} {userId}
 */
export function getLoginDetails() {
  return JSON.parse(localStorage.getItem('auth') || 'null')
}

/**
 *
 * @param {String} type users, group_channels, open_channels
 * @param {String} id
 * @returns
 */
export async function openInDashboard(type, id) {
  try {
    const response = await fetch(`/api/link?type=${type}&value=${id}`, { headers: getAuthHeaders() })
    if (response.status !== 200) {
      return false
    }
    const { link } = await response.json()
    window.open(link, '_blank').focus()
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export function getAuthHeaders() {
  const auth = getLoginDetails()
  return {
    'Authorization': `Bearer ${auth?.sessionToken || ''}`,
    'sbuserid': auth?.userId || ''
  }
}