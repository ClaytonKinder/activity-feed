<template>
  <div id="app" :class="$material.currentTheme">
    <app-header></app-header>
    <feed></feed>
  </div>
</template>

<script>
import AppHeader from 'components/AppHeader'
import Feed from 'components/Feed'
export default {
  name: 'app',
  components: {
    AppHeader,
    Feed
  },
  mounted () {
    if (localStorage.getItem('theme')) {
      this.$material.setCurrentTheme(localStorage.getItem('theme'));
    }
  }
}
</script>

<style lang="scss">
  @import '~styles/variables.scss';
</style>
