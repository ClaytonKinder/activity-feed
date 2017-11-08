<template>
  <md-toolbar>
    <h2 class="md-title">Vue Material</h2>
    <md-button class="md-icon-button" @click="refreshFeed">
      <md-icon>refresh</md-icon>
    </md-button>
  </md-toolbar>
</template>

<script>
export default {
  name: 'app-header',
  methods: {
    refreshFeed () {
      console.log('Refreshing!');
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/variables.scss';
  h2.md-title {
    flex: 1;
  }
</style>
