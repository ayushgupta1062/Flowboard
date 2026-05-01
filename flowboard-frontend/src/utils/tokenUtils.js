const TOKEN_KEY = 'flowboard_token'
const USER_KEY = 'flowboard_user'

export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token)
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

export const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user))
export const getUser = () => {
  try {
    const user = localStorage.getItem(USER_KEY)
    return user ? JSON.parse(user) : null
  } catch (error) {
    return null
  }
}
export const removeUser = () => localStorage.removeItem(USER_KEY)

export const clearAuth = () => {
  removeToken()
  removeUser()
}
