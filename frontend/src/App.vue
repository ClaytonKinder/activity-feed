<template>
  <div id="app" :class="computedClasses">
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
  computed: {
    computedClasses () {
      let classArray = [];
      classArray.push(this.$material.currentTheme);
      // The things we do for IE...
      classArray.push((!!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g)) ? 'ie' : '');
      return classArray;
    }
  },
  mounted () {
    if (localStorage.getItem('theme')) {
      this.$material.setCurrentTheme(localStorage.getItem('theme'));
    }
  }
}
</script>

<style lang="scss">
  // IE bug fix
  .md-list .md-list-item-container {
    height: 48px;
  }
</style>
