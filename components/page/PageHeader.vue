<template>
  <div class="r rsm mb6x fic">
    <!-- <div class="c12">
      <store-meta class="mb2x"></store-meta>
    </div> -->
    <div v-if="showBackButton" class="ca">
      <b-button-icon
        name="arrow-left"
        :class="{ mt1x: subTitle }"
        @click.prevent="$router.back()"
      ></b-button-icon>
    </div>
    <div class="c">
      <slot name="left">
        <h1 v-if="title">{{ title }}</h1>
        <p v-if="subTitle" class="fw6 cg6 fs2xl">{{ subTitle }}</p>
      </slot>
    </div>
    <div v-if="$slots.default" class="ca">
      <slot></slot>
    </div>
    <div v-if="hideOrderButton" class="ca">
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
    subTitle: {
      type: String,
      default: '',
    },
    showBackButton: {
      type: Boolean,
      default: false,
    },
    hideOrderButton: {
      type: Boolean,
      default: false,
    }
  },
})
</script>
