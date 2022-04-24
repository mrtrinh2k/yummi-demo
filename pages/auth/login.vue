<template>
  <b-card class="w360 wmx100p">
    <h2>Sign in</h2>
    <form @submit.prevent="handleUserLogin">
      <b-form-item label="Email">
        <b-input v-model.trim="email" placeholder="Enter your email" />
      </b-form-item>
      <b-form-item label="Password">
        <b-input
          v-model.trim="password"
          placeholder="Enter your password"
          show-password
        />
      </b-form-item>
      <div class="mt4x">
        <b-button ghost small>Forgot your password?</b-button>
      </div>
      <div class="mt6x df fce">
        <b-button
          type="submit"
          primary
          suffix-icon="arrow-right"
          :loading="isProccessing"
          >Access</b-button
        >
      </div>
    </form>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
export default Vue.extend({
  auth: 'guest',
  data() {
    return {
      email: 'tam.mai@bigin.vn',
      password: '%{oT05',
      isProccessing: false,
    }
  },
  methods: {
    ...mapActions('common', ['setLoading']),
    async handleUserLogin() {
      try {
        this.isProccessing = true
        const res = await this.$auth.loginWith('local', {
          data: {
            username: this.email,
            password: this.password,
          },
        })

        console.log(res)
      } catch (error) {
      } finally {
        this.isProccessing = false
      }
    },
  },
})
</script>
