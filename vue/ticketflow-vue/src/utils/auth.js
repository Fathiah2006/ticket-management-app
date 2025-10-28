// src/utils/auth.js

export function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

export function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

export function setSession(user) {
  localStorage.setItem('session', JSON.stringify(user));
}

export function getSession() {
  return JSON.parse(localStorage.getItem('session'));
}

export function clearSession() {
  localStorage.removeItem('session');
}
