<template>
  <div :class="['toast', `toast-${type}`]">
    <CheckCircle v-if="type === 'success'" />
    <AlertCircle v-else />
    <span>{{ message }}</span>
    <button @click="$emit('close')" class="toast-close">
      <X :size="18" />
    </button>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { CheckCircle, AlertCircle, X } from 'lucide-vue-next'

export default {
  name: 'Toast',
  components: { CheckCircle, AlertCircle, X },
  props: {
    message: String,
    type: String
  },
  emits: ['close'],
  setup(props, { emit }) {
    onMounted(() => {
      setTimeout(() => emit('close'), 4000)
    })
  }
}
</script>