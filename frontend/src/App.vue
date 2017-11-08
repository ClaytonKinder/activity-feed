<template>
  <div id="app">
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
  }
}
</script>

<style lang="scss">
  @import '~styles/variables.scss';
</style>
