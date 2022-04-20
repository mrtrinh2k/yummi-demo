<template>
  <div class="r rsm fic mb6x">
    <div class="c12">
      <store-meta class="mb2x"></store-meta>
    </div>
    <div class="c">
      <slot name="left">
        <h1>{{ title }}</h1>
      </slot>
    </div>
    <div class="ca">
      <b-button
        primary
        small
        suffix-icon="arrow-right"
        native-tag="nuxt-link"
        :extend-props="{ to: '/order/create' }"
        >Create Order</b-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import StoreMeta from '../store/StoreMeta.vue'
export default Vue.extend({
  components: { StoreMeta },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
})
</script>
