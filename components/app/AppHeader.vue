<template>
  <div>
    <b-header :shadow="1">
      <div slot="branding">
        <nuxt-link slot="branding" to="/">
          <img src="/branding.jpg" alt="Yummi Partner" />
        </nuxt-link>
      </div>
      <div slot="left" class="dn sm:df fic">
        <div>
          <nuxt-link to="">
            <b-icon name="home"></b-icon>
          </nuxt-link>
        </div>
        <div v-for="item in breadCrumbs" :key="item.path" class="df fic">
          <b-icon name="chevron-right" class="mx1x" size="12"></b-icon>
          <nuxt-link :to="item.path"
            ><span class="fw-600 tssm">{{ item.title }}</span></nuxt-link
          >
        </div>
      </div>
      <div slot="right">
        <b-dropdown>
          <div class="df fic fcsb bdrmax bgg2 p05x">
            <b-avatar
              rounded
              text="Vy Trinh"
              src="https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg"
            />
            <p class="text-semibold text-sm px2x">My Account</p>
            <b-icon name="action-down" size="12" class="mr1x"></b-icon>
          </div>
          <b-dropdown-menu class="wmn160">
            <nuxt-link to="">A</nuxt-link>
            <nuxt-link to="">B</nuxt-link>
          </b-dropdown-menu>
        </b-dropdown>
      </div>
    </b-header>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      breadCrumbs: [
        {
          path: '/',
          title: 'Dashboard',
        },
        {
          path: '/',
          title: 'My Orders',
        },
      ],
    }
  },
})
</script>
