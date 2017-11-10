<template>
  <div class="page-wrapper">
    <md-button class="md-fab md-primary md-mini md-clean" @click="logData" style="position: fixed; z-index: 9999999999999">
      <md-icon>bug_report</md-icon>
    </md-button>
    <md-layout class="feed-container" md-gutter="16">
      <md-layout class="feed-block" md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33" md-flex-large="25" md-flex-xlarge="20" v-for="statement in statements" :key="statement">
        <feed-card :statement="statement"></feed-card>
      </md-layout>
      <!-- <md-button class="md-fab add-button" @click="sendStatement">
        <md-icon>add</md-icon>
      </md-button> -->
      <md-speed-dial md-mode="scale" class="md-fab add-button">
        <md-button class="md-fab" md-fab-trigger>
          <md-icon md-icon-morph>close</md-icon>
          <md-icon>share</md-icon>
        </md-button>
        <md-button class="md-fab md-primary md-mini md-clean" @click="sendStatement">
          <md-icon>add</md-icon>
        </md-button>
        <md-button class="md-fab md-primary md-mini md-clean">
          <md-icon>refresh</md-icon>
        </md-button>
      </md-speed-dial>
    </md-layout>
    <infinite-loading @infinite="getStatements" ref="infiniteLoading" v-if="statements.length >= 20">
      <span slot="spinner">
        <img src="assets/spinner.gif">
      </span>
    </infinite-loading>
    <div class="loading-screen" v-if="loading">
      <!-- <img src="assets/spinner.gif"> -->
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import StatementService from 'src/services/StatementService';
import EventBus from 'src/buses/EventBus';
import InfiniteLoading from 'vue-infinite-loading';
import FeedCard from './FeedCard';

export default {
  name: 'feed',
  components: {
    InfiniteLoading,
    FeedCard
  },
  data () {
    return {
      loading: false,
      initiallyLoaded: false,
      moreUrl: null,
      statements: []
    }
  },
  methods: {
    containsObject (obj, arr) {
      var i;
      for (i = 0; i < arr.length; i++) {
          if (arr[i].id === obj.id) {
              return true;
          }
      }
      return false;
    },
    // getStatements ($state) {
    //   console.log(1);
    //   _.debounce(($state) => {
    //
    //   }, 2000);
    // },
    getStatements: _.debounce(($state) => {
      console.log(this);
      if (!this.loading) {
        this.loading = true;
        StatementService.getStatements(this.moreUrl, (err, response, body) => {
          if (err) {
            console.error(err);
          }
          else {
            this.moreUrl = body.more;
            // this.statements.push(...body.statements);
            body.statements.forEach((statement) => {
              if (!this.containsObject(statement, this.statements)) {
                this.statements.push(statement);
              }
            });
            if (!this.moreUrl || this.moreUrl === '') {
              $state.complete();
            }
          }
          this.loading = false;
          this.initiallyLoaded = true;
          if ($state) {
            $state.loaded();
          }
        })
      }
      else {
        if (!this.moreUrl && $state) {
          $state.reset();
        }
      }
    }, 2000),
    // getStatements($state) {
    //   console.log('Getting statements');
    //   if (!this.loading) {
    //     console.log(1);
    //     this.loading = true;
    //     StatementService.getStatements(this.moreUrl, (err, response, body) => {
    //       if (err) {
    //         console.error(err);
    //       }
    //       else {
    //         console.log(2);
    //         this.moreUrl = body.more;
    //         // this.statements.push(...body.statements);
    //         console.log(3);
    //         body.statements.forEach((statement) => {
    //           if (!this.containsObject(statement, this.statements)) {
    //             this.statements.push(statement);
    //           }
    //         });
    //         console.log(this.statements);
    //         if (!this.moreUrl || this.moreUrl === '') {
    //           $state.complete();
    //         }
    //       }
    //       this.loading = false;
    //       this.initiallyLoaded = true;
    //       if ($state) {
    //         $state.loaded();
    //       }
    //     })
    //   }
    //   else {
    //     if (!this.moreUrl && $state) {
    //       $state.reset();
    //     }
    //   }
    // },
    sendStatement() {
      this.loading = true;
      StatementService.buildStatement()
        .then(response => {
          StatementService.sendStatement(response)
            .then(res => {
              this.loading = false;
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
              if (res.status === 200) {
                this.getStatements();
              }
            })
            .catch(error => {
              this.loading = false;
            })
        })
        .catch(error => {
          this.loading = false;
        })
    },
    logData () {
      console.log(this.loading);
    }
  },
  mounted () {
    this.getStatements();
    EventBus.$on('refreshFeed', () => {
      this.statements = [];
      this.loading = false;
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
      this.moreUrl = null;
      console.log(1);
      this.getStatements();
    });
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/variables.scss';
  @import '~styles/animations.scss';
  #app.dark {
    .page-wrapper {
      background: $darkGray;
    }
  }

  .page-wrapper {
    padding: 2rem 2rem 4rem;
    position: relative;

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

    .loading-screen {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 100000000;
      background-color: rgba(255,255,255,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      animation: fadeIn 0.2s linear;
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
