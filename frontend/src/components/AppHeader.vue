<template>
  <md-toolbar>
    <h2 class="md-title md-hide-xsmall">Activity Feed</h2>
    <h2 class="md-title md-hide-small-and-up">Feed</h2>
    <md-input-container class="search">
      <md-icon>search</md-icon>
      <label></label>
      <md-input v-model="searchTerm" type="text"></md-input>
    </md-input-container>
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
import { EventBus } from 'src/buses/EventBus.js';
export default {
  name: 'app-header',
  data () {
    return {
      searchTerm: ''
    }
  },
  watch: {
    searchTerm (val) {
      // Emit event to feed
      EventBus.$emit('filterFeed', val);
    }
  },
  methods: {
    changeTheme (key) {
      // Set color theme and save in local storage
      if (key === 'default') {
        this.$material.setCurrentTheme('default');
        localStorage.setItem('theme', 'default');
      } else if (key === 'dark') {
        this.$material.setCurrentTheme('dark');
        localStorage.setItem('theme', 'dark');
      }
    },
    verifyTheme (key) {
      // Which theme option is given the check mark in the dropdown menu?
      return (key === this.$material.currentTheme);
    }
  }
}
</script>

<style lang="scss" scoped>
  // IE bug fix
  #app.ie  {
    .md-toolbar {
      height: 64px;
    }
  }

  .md-toolbar {
    .md-title {
      flex: 1;
    }
    .search {
      width: 200px;
    }
  }

</style>
