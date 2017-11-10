<template>
  <md-toolbar>
    <h2 class="md-title">Activity Feed</h2>
    <md-menu md-align-trigger md-size="4" md-direction="bottom left" ref="menu">
      <md-button class="md-icon-button" md-menu-trigger>
        <md-icon>more_vert</md-icon>
      </md-button>
      <md-menu-content>
        <md-menu-item @click="changeTheme('default')">
          <md-icon>{{verifyTheme('default') ? 'check' : ''}}</md-icon>
          <span>Default theme</span>
        </md-menu-item>
        <md-menu-item @click="changeTheme('dark')">
          <md-icon>{{verifyTheme('dark') ? 'check' : ''}}</md-icon>
          <span>Dark theme</span>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
  </md-toolbar>
</template>

<script>
export default {
  name: 'app-header',
  methods: {
    changeTheme (key) {
      if (key === 'default') {
        this.$material.setCurrentTheme('default');
        localStorage.setItem('theme', 'default');
      } else if (key === 'dark') {
        this.$material.setCurrentTheme('dark');
        localStorage.setItem('theme', 'dark');
      }
    },
    verifyTheme (key) {
      return (key === this.$material.currentTheme)
    }
  }
}
</script>

<style lang="scss" scoped>
  h2.md-title {
    flex: 1;
  }
</style>
