<template>
  <b-navigation hide-toggle-button>
    <b-menu router default-active="1">
      <b-menu-item
        v-for="item in menuItem"
        :key="item.index"
        :index="item.index"
        :icon="item.icon"
        :title="item.title"
      />
    </b-menu>
  </b-navigation>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      menuItem: [
        {
          index: '/',
          title: 'Dashboard',
          icon: 'home',
        },
        {
          index: '/orders',
          title: 'My Orders',
          icon: 'cooking',
        },
        {
          index: '/weekly-statements',
          title: 'Weekly Statements',
          icon: 'document',
        },
        {
          index: '/food-safety-n-qa',
          title: 'Food Safety & QA',
          icon: 'information',
        },
        {
          index: '/training',
          title: 'Training',
          icon: 'book',
        },
        {
          index: '/contract-details',
          title: 'Contract Details',
          icon: 'document',
        },
      ],
    }
  },
})
</script>
