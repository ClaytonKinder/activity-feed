<template>
  <md-card class="feed-card">
    <md-card-media>
      <img :src="getImageSrc(statement.actor.name)" :alt="statement.actor.name">
    </md-card-media>
    <md-card-header>
      <div class="md-title">{{statement.actor.name}}</div>
      <div class="md-subhead">{{statement.actor.mbox.replace('mailto:', '')}}</div>
    </md-card-header>

    <md-card-content style="font-size: 1rem">
      {{statement.actor.name}} {{(statement.result.success) ? 'successfully' : 'unsuccessfully'}} {{statement.verb.display['en-US']}} <em>{{statement.object.definition.name['en-US']}}</em> with a score of <strong>{{Math.round(statement.result.score.scaled * 100)}}%</strong> under the instruction of {{statement.context.instructor.name}}.
    </md-card-content>

    <!-- <md-card-actions>
      <md-button>Action</md-button>
      <md-button>Action</md-button>
    </md-card-actions> -->
  </md-card>
</template>

<script>
export default {
  name: 'feed-card',
  props: ['statement'],
  methods: {
    getImageSrc (name) {
      return `assets/${name.toLowerCase()}.png`;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/variables.scss';
  #app.dark {
    .feed-card {
      background-color: $mediumGray;
      color: white;
    }
  }
</style>
