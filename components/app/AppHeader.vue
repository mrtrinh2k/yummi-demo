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
        <div v-for="item in breadcrumbs" :key="item.path" class="df fic">
          <b-icon name="chevron-right" class="mx1x" size="12"></b-icon>
          <nuxt-link :to="item.path"
            ><span class="fw-600 tssm">{{ item.title }}</span></nuxt-link
          >
        </div>
      </div>
      <div slot="right">
        <b-dropdown slot="right" trigger="click" @command="handleCommand">
          <div class="df fic fcsb bdrmax bgg2 p05x csp">
            <b-avatar
              rounded
              text="Vy Trinh"
              src="https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg"
            />
            <p class="text-semibold text-sm px2x">My Account</p>
            <b-icon name="action-down" size="12" class="mr1x"></b-icon>
          </div>
          <b-dropdown-menu slot="dropdown" small class="wmn160">
            <b-dropdown-item icon="store" command="franchisee">
              Franchisee Details
            </b-dropdown-item>
            <b-dropdown-item icon="profile" command="settings">
              Account Settings
            </b-dropdown-item>
            <b-dropdown-item icon="mail" command="contact">
              Contact Us
            </b-dropdown-item>
            <b-dropdown-item icon="sign-out" command="logout">
              Sign Out
            </b-dropdown-item>
          </b-dropdown-menu>
        </b-dropdown>
      </div>
      {{ breadcrumbs }}
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
  computed: {
    breadcrumbs() {
      const excludeURLs = [
        this.$auth.options.redirect.home,
        this.$auth.options.redirect.home + '/',
      ]
      const r = this.$route.matched
        .map((item) => {
          const { path, components } = item
          const options = components.default?.extendOptions
          const title = options && options.meta ? options.meta.breadcrumb : ''
          return { path, title }
        })
        .filter((item) => !excludeURLs.includes(item.path) && item.title !== '')
      console.log(this.$route.params)
      console.log(excludeURLs, r, this.$route.matched)
      return r
    },
  },
  methods: {
    handleCommand(command: any) {
      switch (command) {
        case 'logout':
          return this.$auth.logout()
      }
    },
  },
})
</script>
