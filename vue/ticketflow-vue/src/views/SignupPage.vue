<template>
  <div class="page-wrapper auth-bg">
    <div class="auth-card">
      <div class="auth-header">
        <h2>Get Started</h2>
        <p>Create your account</p>
      </div>

      <div>
        <div class="form-group">
          <label class="form-label">Name</label>
          <input
            v-model="formData.name"
            type="text"
            class="form-input"
            placeholder="Enter your name"
          />
          <p v-if="errors.name" class="form-error">{{ errors.name }}</p>
        </div>

        <div class="form-group">
          <label class="form-label">Email</label>
          <input
            v-model="formData.email"
            type="email"
            class="form-input"
            placeholder="Enter your email"
          />
          <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
        </div>

        <div class="form-group">
          <label class="form-label">Password</label>
          <input
            v-model="formData.password"
            type="password"
            @keypress.enter="handleSubmit"
            class="form-input"
            placeholder="Enter your password"
          />
          <p v-if="errors.password" class="form-error">{{ errors.password }}</p>
        </div>

        <button @click="handleSubmit" class="btn btn-primary btn-full">
          Sign Up
        </button>
      </div>

      <p class="auth-footer">
        Already have an account?
        <button @click="$router.push('/login')" class="auth-link">
          Login
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { getUsers, saveUsers } from '../utils/auth'
export default {
  name: 'SignupPage',
  setup() {
    const router = useRouter()
    const showToast = inject('showToast')
    
    const formData = ref({
      name: '',
      email: '',
      password: ''
    })
    
    const errors = ref({})

    const validate = () => {
      const newErrors = {}
      
      if (!formData.value.name || formData.value.name.trim() === '') {
        newErrors.name = 'Name is required'
      }
      
      if (!formData.value.email) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
        newErrors.email = 'Invalid email format'
      }
      
      if (!formData.value.password) {
        newErrors.password = 'Password is required'
      } else if (formData.value.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }
      
      return newErrors
    }

    const handleSubmit = () => {
      // Clear previous errors
      errors.value = {}
      
      // Validate form
      const newErrors = validate()
      if (Object.keys(newErrors).length > 0) {
        errors.value = newErrors
        return
      }

      // Check if email already exists
      const users = getUsers()
      if (users.some(u => u.email === formData.value.email)) {
        showToast('Email already exists', 'error')
        return
      }

      // Save new user
      users.push({
        name: formData.value.name,
        email: formData.value.email,
        password: formData.value.password
      })
      saveUsers(users)
      
      // Show success message and redirect
      showToast('Account created! Please login.', 'success')
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }

    return {
      formData,
      errors,
      handleSubmit
    }
  }
}
</script>