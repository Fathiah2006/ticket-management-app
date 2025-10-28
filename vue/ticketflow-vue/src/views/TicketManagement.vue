<template>
  <div class="page-wrapper dashboard-bg">
    <div class="container">
      <!-- Header -->
      <header class="header-dashboard">
        <div class="tickets-header">
          <button @click="$router.push('/dashboard')" class="back-link">
            ← Dashboard
          </button>
          <h1>Ticket Management</h1>
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

      <!-- Create Button -->
      <div class="tickets-actions">
        <button @click="openModal()" class="btn btn-primary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          Create New Ticket
        </button>
      </div>

      <!-- Tickets Grid -->
      <div class="tickets-grid">
        <!-- Empty State -->
        <div v-if="tickets.length === 0" class="empty-state">
          <p>No tickets yet. Create your first ticket!</p>
        </div>

        <!-- Ticket Cards -->
        <div 
          v-else 
          v-for="ticket in tickets" 
          :key="ticket.id" 
          class="ticket-card"
        >
          <div class="ticket-header">
            <h3 class="ticket-title">{{ ticket.title }}</h3>
            <span :class="getStatusClass(ticket.status)">
              {{ formatStatus(ticket.status) }}
            </span>
          </div>
          <p class="ticket-description">
            {{ ticket.description || 'No description' }}
          </p>
          <div class="ticket-actions">
            <button @click="openModal(ticket)" class="btn btn-edit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
              </svg>
              Edit
            </button>
            <button @click="handleDelete(ticket.id)" class="btn btn-delete">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="m19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="footer">
        <p>© 2025 TicketFlow. All rights reserved.</p>
      </footer>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click="handleOverlayClick">
      <div class="modal" @click.stop>
        <h2>{{ editingTicket ? 'Edit Ticket' : 'Create New Ticket' }}</h2>
        
        <div>
          <!-- Title Field -->
          <div class="form-group">
            <label class="form-label">Title *</label>
            <input
              v-model="formData.title"
              type="text"
              class="form-input"
              placeholder="Enter ticket title"
            />
            <p v-if="errors.title" class="form-error">{{ errors.title }}</p>
          </div>

          <!-- Description Field -->
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea
              v-model="formData.description"
              rows="3"
              class="form-textarea"
              placeholder="Enter ticket description"
            />
          </div>

          <!-- Status Field -->
          <div class="form-group">
            <label class="form-label">Status *</label>
            <select v-model="formData.status" class="form-select">
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <p v-if="errors.status" class="form-error">{{ errors.status }}</p>
          </div>

          <!-- Priority Field -->
          <div class="form-group">
            <label class="form-label">Priority</label>
            <select v-model="formData.priority" class="form-select">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <!-- Modal Actions -->
          <div class="modal-actions">
            <button @click="handleSubmit" class="btn btn-primary">
              {{ editingTicket ? 'Update' : 'Create' }}
            </button>
            <button @click="closeModal" class="btn btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { clearSession } from '../utils/auth'
import { getTickets, saveTickets, generateId } from '../utils/storage'

export default {
  name: 'TicketManagement',
  setup() {
    const router = useRouter()
    const showToast = inject('showToast')
    
    // State
    const tickets = ref([])
    const showModal = ref(false)
    const editingTicket = ref(null)
    const formData = ref({
      title: '',
      description: '',
      status: 'open',
      priority: 'medium'
    })
    const errors = ref({})

    // Load tickets on mount
    onMounted(() => {
      tickets.value = getTickets()
    })

    // Validation function
    const validate = () => {
      const newErrors = {}
      
      if (!formData.value.title || formData.value.title.trim() === '') {
        newErrors.title = 'Title is required'
      }
      
      const validStatuses = ['open', 'in_progress', 'closed']
      if (!validStatuses.includes(formData.value.status)) {
        newErrors.status = 'Invalid status'
      }
      
      return newErrors
    }

    // Submit form (Create or Update)
    const handleSubmit = () => {
      // Clear previous errors
      errors.value = {}
      
      // Validate
      const newErrors = validate()
      if (Object.keys(newErrors).length > 0) {
        errors.value = newErrors
        return
      }

      let updatedTickets
      
      if (editingTicket.value) {
        // Update existing ticket
        updatedTickets = tickets.value.map(t => 
          t.id === editingTicket.value.id 
            ? { ...formData.value, id: t.id } 
            : t
        )
        showToast('Ticket updated successfully!', 'success')
      } else {
        // Create new ticket
        const newTicket = {
          ...formData.value,
          id: generateId()
        }
        updatedTickets = [...tickets.value, newTicket]
        showToast('Ticket created successfully!', 'success')
      }

      // Save and update
      saveTickets(updatedTickets)
      tickets.value = updatedTickets
      closeModal()
    }

    // Delete ticket
    const handleDelete = (id) => {
      if (confirm('Are you sure you want to delete this ticket?')) {
        const updatedTickets = tickets.value.filter(t => t.id !== id)
        saveTickets(updatedTickets)
        tickets.value = updatedTickets
        showToast('Ticket deleted successfully!', 'success')
      }
    }

    // Open modal for create or edit
    const openModal = (ticket = null) => {
      if (ticket) {
        // Edit mode
        editingTicket.value = ticket
        formData.value = {
          title: ticket.title,
          description: ticket.description || '',
          status: ticket.status,
          priority: ticket.priority || 'medium'
        }
      } else {
        // Create mode
        editingTicket.value = null
        formData.value = {
          title: '',
          description: '',
          status: 'open',
          priority: 'medium'
        }
      }
      errors.value = {}
      showModal.value = true
    }

    // Close modal
    const closeModal = () => {
      showModal.value = false
      editingTicket.value = null
      formData.value = {
        title: '',
        description: '',
        status: 'open',
        priority: 'medium'
      }
      errors.value = {}
    }

    // Handle overlay click (close modal)
    const handleOverlayClick = () => {
      closeModal()
    }

    // Logout
    const handleLogout = () => {
      clearSession()
      router.push('/')
    }

    // Get status CSS class
    const getStatusClass = (status) => {
      return `ticket-status status-${status.replace('_', '-')}`
    }

    // Format status for display
    const formatStatus = (status) => {
      return status.replace('_', ' ')
    }

    return {
      tickets,
      showModal,
      editingTicket,
      formData,
      errors,
      handleSubmit,
      handleDelete,
      openModal,
      closeModal,
      handleOverlayClick,
      handleLogout,
      getStatusClass,
      formatStatus
    }
  }
}
</script>