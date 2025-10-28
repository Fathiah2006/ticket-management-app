// src/utils/storage.js

export function getTickets() {
  const tickets = localStorage.getItem('tickets')
  return tickets ? JSON.parse(tickets) : []
}

export function saveTickets(tickets) {
  localStorage.setItem('tickets', JSON.stringify(tickets))
}

export function addTicket(ticket) {
  const tickets = getTickets()
  tickets.push(ticket)
  saveTickets(tickets)
}

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}