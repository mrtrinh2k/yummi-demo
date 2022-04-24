<template>
  <div class="b-login-container">
    <div class="ctnf">
      <div class="hmn100vh df fic fcc">
        <div class="b-login-form-container">
          <img
            src="/branding.jpg"
            alt="Yummi Partner"
            class="b-login-app-branding mb6x"
          />
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'LoginLayout',
})
</script>
