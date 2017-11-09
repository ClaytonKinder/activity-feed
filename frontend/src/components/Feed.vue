<template>
  <div class="page-wrapper">
    <md-layout class="feed-container" md-gutter="16">
      <md-layout class="feed-block" md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33" md-flex-large="25" md-flex-xlarge="20" v-for="card in cards" :key="card">
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
    <infinite-loading spinner="spiral" @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

export default {
  name: 'feed',
  components: {
    InfiniteLoading
  },
  data () {
    return {
      msg: 'Feed',
      cards: Array.apply(null, Array(20)).map(function (x, i) { return i + 1; })
    }
  },
  methods: {
    addCard () {
      console.log('Adding!');
    },
    infiniteHandler($state) {
      console.log(1);
      setTimeout(() => {
        const temp = [];
        for (let i = this.cards.length + 1; i <= this.cards.length + 20; i++) {
          temp.push(i);
        }
        this.cards = this.cards.concat(temp);
        if ($state) {
          $state.loaded();
        }
      }, 1000);
    }
  },
  mounted () {
    // this.infiniteHandler();
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/variables.scss';
  .page-wrapper {
    padding: 2rem 2rem 4rem;
    .feed-container {
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
