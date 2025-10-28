<template>
  <div class="page-wrapper auth-bg">
    <div class="auth-card">
      <div class="auth-header">
        <h2>Welcome Back</h2>
        <p>Login to your account</p>
      </div>

      <div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input
            v-model="formData.email"
            type="email"
            class="form-input"
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
          />
          <p v-if="errors.password" class="form-error">{{ errors.password }}</p>
        </div>

        <button @click="handleSubmit" class="btn btn-primary btn-full">
          Login
        </button>
      </div>

      <p class="auth-footer">
        Don't have an account?
        <button @click="$router.push('/signup')" class="auth-link">
          Sign Up
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { getUsers, setSession } from '../utils/auth'

export default {
  name: 'LoginPage',
  setup() {
    const router = useRouter()
    const showToast = inject('showToast')
    
    const formData = ref({ email: '', password: '' })
    const errors = ref({})

    const validate = () => {
      const newErrors = {}
      if (!formData.value.email) newErrors.email = 'Email is required'
      else if (!/\S+@\S+\.\S+/.test(formData.value.email)) newErrors.email = 'Invalid email format'
      if (!formData.value.password) newErrors.password = 'Password is required'
      else if (formData.value.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
      return newErrors
    }

    const handleSubmit = () => {
      const newErrors = validate()
      if (Object.keys(newErrors).length > 0) {
        errors.value = newErrors
        return
      }

      const users = getUsers()
      const user = users.find(
        u => u.email === formData.value.email && u.password === formData.value.password
      )

      if (user) {
        setSession({ email: user.email, name: user.name })
        router.push('/dashboard')
      } else {
        showToast('Invalid credentials. Try demo@example.com / password123', 'error')
      }
    }

    return {
      formData,
      errors,
      handleSubmit
    }
  }
}
</script>