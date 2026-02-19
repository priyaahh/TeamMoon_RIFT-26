const KEY = 'pharmaguard:results:v1'

export const saveResults = (payload) => {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(payload))
  } catch {
    // ignore
  }
}

export const loadResults = () => {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export const clearResults = () => {
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}

