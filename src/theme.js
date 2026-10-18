// Copyright 2017-2019 LinkedIn Corp. Licensed under the BSD 2-Clause License (the "License"). See License in the project root for license information.

// Keep STORAGE_KEY and the resolution logic in sync with the inline script in index.html.
const STORAGE_KEY = 'cc-ui-theme'
export const THEME_PREFERENCES = ['system', 'light', 'dark']

const darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null

export function loadPreference () {
  try {
    let pref = window.localStorage.getItem(STORAGE_KEY)
    return THEME_PREFERENCES.indexOf(pref) >= 0 ? pref : 'system'
  } catch (e) {
    return 'system'
  }
}

export function savePreference (pref) {
  try {
    if (pref === 'system') {
      window.localStorage.removeItem(STORAGE_KEY)
    } else {
      window.localStorage.setItem(STORAGE_KEY, pref)
    }
  } catch (e) {}
}

export function systemPrefersDark () {
  return !!(darkQuery && darkQuery.matches)
}

export function resolveTheme (pref, systemDark) {
  if (pref === 'system') {
    return systemDark ? 'dark' : 'light'
  }
  return pref
}

export function applyTheme (theme) {
  document.documentElement.setAttribute('data-theme', theme)
}

export function onSystemThemeChange (callback) {
  if (!darkQuery) {
    return
  }
  let handler = (e) => callback(e.matches)
  // Safari < 14 only supports the deprecated addListener.
  if (darkQuery.addEventListener) {
    darkQuery.addEventListener('change', handler)
  } else {
    darkQuery.addListener(handler)
  }
}
