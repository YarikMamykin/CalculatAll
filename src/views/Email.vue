<script setup lang="ts">
import ModalWindow from '@/components/ModalWindow.vue'
import { useControlPanelStore } from '@/store/control_panel'
import { inject, defineModel, defineEmits, ref } from 'vue'
import emailValidate from 'deep-email-validator'

const controlPanelStore = useControlPanelStore()
const originHost = inject('originHost')
const userEmail = defineModel<string>('userEmail', { default: '' })
const emailBody = defineModel<string>('emailBody', { default: '' })
let errorMessage = ref('')
const emit = defineEmits(['submit', 'cancel'])

function sendEmail() {
  emailValidate({
    email: userEmail.value,
    sender: userEmail.value,
    // fails with DNS error even on valid email address if not disabled
    // DNS resolve is not supported on browser side.
    validateMx: false
  })
    .then((result) => {
      if (!result.valid) {
        errorMessage.value = `Email validation error: ${result.reason}`
        return
      }

      fetch(`${originHost}/mail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userEmail: userEmail.value,
          emailBody: emailBody.value
        })
      })
        .then((response: Response) => {
          if (response.ok) {
            emit('submit')
            return
          }
          errorMessage.value = 'Failed to send email. Please, try later.'
        })
        .catch((err) => {
          errorMessage.value = err
        })
    })
    .catch((err) => {
      errorMessage.value = err
    })
}
</script>

<template>
  <ModalWindow name="EMAIL" @cancel="emit('cancel')">
    <form class="email-container" @submit.prevent.stop="sendEmail">
      <div class="email-header">
        <p>To:</p>
        <p style="padding-left: 0.5em">ymamykin@gmail.com</p>
        <p>From:</p>
        <input
          class="line-edit"
          type="email"
          placeholder="your.email@domain"
          v-model="userEmail"
          required
        />
      </div>
      <textarea
        placeholder="Put your feedback right here..."
        v-model="emailBody"
        required
      ></textarea>
      <label>{{ errorMessage }}</label>
      <button type="submit">Send</button>
    </form>
  </ModalWindow>
</template>
