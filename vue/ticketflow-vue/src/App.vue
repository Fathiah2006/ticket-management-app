<template>
  <div id="app">
    <router-view />
    <Toast v-if="toast" :message="toast.message" :type="toast.type" @close="toast = null" />
  </div>
</template>

<script>
import { ref, provide } from 'vue'
import Toast from './components/Toast.vue'

export default {
  name: 'App',
  components: {
    Toast
  },
  setup() {
    const toast = ref(null)

    const showToast = (message, type) => {
      toast.value = { message, type }
    }

    provide('showToast', showToast)

    return {
      toast
    }
  }
}
</script>

<style src="./assets/styles.css"></style>