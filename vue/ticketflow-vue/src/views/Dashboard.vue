<template>
  <div class="page-wrapper dashboard-bg">
    <div class="container">
      <!-- Header -->
      <header class="header-dashboard">
        <div>
          <h1 class="logo">TicketFlow</h1>
          <p class="user-welcome">Welcome, {{ user?.name || 'User' }}</p>
        </div>
        <button @click="handleLogout" class="btn btn-logout">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Logout</span>
        </button>
      </header>

      <!-- Statistics Cards -->
      <div class="stats-grid">
        <div v-for="(stat, index) in stats" :key="index" class="stat-card">
          <div :class="['stat-icon', stat.colorClass]">{{ stat.value }}</div>
          <h3 class="stat-label">{{ stat.label }}</h3>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <button @click="$router.push('/tickets')" class="btn btn-primary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
            <path d="M13 5v2"></path>
            <path d="M13 17v2"></path>
            <path d="M13 11v2"></path>
          </svg>
          Manage Tickets
        </button>
      </div>

      <!-- Footer -->
      <footer class="footer">
        <p>© 2025 TicketFlow. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getSession, clearSession } from '../utils/auth'
import { getTickets } from '../utils/storage'

export default {
  name: 'Dashboard',
  setup() {
    const router = useRouter()
    const user = ref(null)
    const tickets = ref([])

    onMounted(() => {
      user.value = getSession()
      if (!user.value) {
        router.push('/login')
        return
      }
      tickets.value = getTickets()
    })

    const stats = computed(() => [
      { 
        label: 'Total Tickets', 
        value: tickets.value.length, 
        colorClass: 'stat-icon-blue' 
      },
      { 
        label: 'Open', 
        value: tickets.value.filter(t => t.status === 'open').length, 
        colorClass: 'stat-icon-green' 
      },
      { 
        label: 'In Progress', 
        value: tickets.value.filter(t => t.status === 'in_progress').length, 
        colorClass: 'stat-icon-amber' 
      },
      { 
        label: 'Closed', 
        value: tickets.value.filter(t => t.status === 'closed').length, 
        colorClass: 'stat-icon-gray' 
      }
    ])

    const handleLogout = () => {
      clearSession()
      router.push('/')
    }

    return {
      user,
      stats,
      handleLogout
    }
  }
}
</script>