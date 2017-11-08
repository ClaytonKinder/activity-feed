<template>
  <md-layout class="feed-container" md-gutter="16">
    <md-layout
      class="feed-block"
      md-flex-xsmall="100"
      md-flex-small="50"
      md-flex-medium="33"
      md-flex-large="25"
      md-flex-xlarge="20"
      v-for="card in cards"
    >
      <md-card>
        <md-card-header>
          <div class="md-title">{{card + 1}}</div>
          <div class="md-subhead">Subtitle here</div>
        </md-card-header>
  
        <md-card-content style="font-size: 1rem">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
        </md-card-content>
  
        <md-card-actions>
          <md-button>Action</md-button>
          <md-button>Action</md-button>
        </md-card-actions>
      </md-card>
    </md-layout>
    <md-button class="md-fab add-button" @click="addCard">
      <md-icon>add</md-icon>
    </md-button>
  </md-layout>
</template>

<script>
export default {
  name: 'feed',
  data () {
    return {
      msg: 'Feed',
      cards: Array.apply(null, Array(40)).map(function (x, i) { return i; })
    }
  },
  methods: {
    addCard () {
      console.log('Adding!');
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/variables.scss';
  .feed-container {
    padding: 2rem 2rem 6rem;
    margin-right: 0;
    margin-left: 0;
    
    .feed-block {
      margin-bottom: 1rem;
    }
    
    .add-button {
      position: fixed;
      z-index: 1000;
      bottom: 32px;
      right: 24px;
    }
  }
  
  // Bug fix for vue-material
  @media (min-width: 601px) and (max-width: 944px) {
    .md-flex-small-50 {
      min-width: 50%;
      -ms-flex: 0 1 50%;
      flex: 0 1 50%;
    }
  }
</style>
