<template>
  <div class="app-container">
    <AppHeader />
    <div class="app-body df app-body--offcanvas-off">
      <AppNavigation />
      <div class="page-container fg1">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
