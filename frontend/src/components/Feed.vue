<template>
  <div class="page-wrapper">
    <md-layout class="feed-container" md-gutter="16" v-infinite-scroll="getStatements" infinite-scroll-disabled="disableInfiniteScroll" infinite-scroll-distance="50" infinite-scroll-throttle-delay="1000">
      <md-layout class="feed-block" md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33" md-flex-large="25" md-flex-xlarge="20" v-for="statement in statements" :key="statement">
        <transition name="fade" appear enter-stagger="50">
          <feed-card :statement="statement"></feed-card>
        </transition>
      </md-layout>
      <md-speed-dial md-mode="scale" class="md-fab add-button">
        <md-button class="md-fab" md-fab-trigger>
          <md-icon md-icon-morph>close</md-icon>
          <md-icon>settings</md-icon>
        </md-button>
        <md-button class="md-fab md-primary md-mini md-clean" @click="sendStatement">
          <md-icon>add</md-icon>
        </md-button>
        <md-button class="md-fab md-primary md-mini md-clean" @click="refreshFeed">
          <md-icon>refresh</md-icon>
        </md-button>
      </md-speed-dial>
    </md-layout>
    <div class="loading-block" v-if="loading && !noMoreStatements">
      <img src="assets/spinner.gif">
    </div>
    <md-snackbar class="error-snackbar" md-position="bottom center" ref="snackbar">
      {{ (errorMessage) ? errorMessage : 'Oops! Something went wrong.' }}
    </md-snackbar>
  </div>
</template>

<script>
import StatementService from 'src/services/StatementService';
import FeedCard from './FeedCard';

export default {
  name: 'feed',
  components: {
    FeedCard
  },
  data () {
    return {
      loading: false,
      noMoreStatements: false,
      moreUrl: null,
      errorMessage: '',
      statements: []
    }
  },
  computed: {
    disableInfiniteScroll () {
      return (this.loading || this.noMoreStatements)
    }
  },
  methods: {
    handleError(msg) {
      this.errorMessage = msg;
      this.$refs.snackbar.open();
    },
    containsStatement (obj, arr) {
      // Check statement ID against existing statements to prevent duplicates
      var i;
      for (i = 0; i < arr.length; i++) {
          if (arr[i].id === obj.id) {
              return true;
          }
      }
      return false;
    },
    getStatements($state) {
      if (!this.noMoreStatements) {
        this.loading = true;
        // Get statements from API
        StatementService.getStatements(this.moreUrl, (err, response, body) => {
          if (err) {
            this.handleError('Could not get statements at this time.');
          }
          else {
            this.moreUrl = body.more;
            // Check to make sure no duplicates are added
            body.statements.forEach((statement) => {
              if (!this.containsStatement(statement, this.statements)) {
                this.statements.push(statement);
              }
            });
            // If we've reached the end of the feed, disable infinite loading to prevent excessive API calls
            if (!this.moreUrl || this.moreUrl === '') {
              this.moreUrl = null;
              this.noMoreStatements = true;
            }
          }
          this.loading = false;
        })
      }
    },
    sendStatement() {
      this.loading = true;
      // Build statement using randomly selected JSON data
      StatementService.buildStatement()
        .then(response => {
          // Add it to the API endpoint
          StatementService.sendStatement(response)
            .then(res => {
              if (res.status === 200) {
                // Attach it to the beginning of the array to avoid an unncessary API call to refresh the feed
                if (!this.containsStatement(response, this.statements)) {
                  this.statements.unshift(response);
                }
              }
              this.loading = false;
            })
            .catch(error => {
              this.handleError('Could not send statement at this time.');
              this.loading = false;
            })
        })
        .catch(error => {
          this.handleError('Could not build statement at this time.');
          this.loading = false;
        })
    },
    refreshFeed () {
      this.statements = [];
      this.loading = false;
      this.noMoreStatements = false;
      this.moreUrl = null;
      this.getStatements();
    }
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
        bottom: 1.5rem;
        right: 1.5rem;
      }
    }

    .loading-block {
      text-align: center;

      img {
        height: 4rem;
        width: 4rem;
      }
    }

    .error-snackbar {
      text-align: center;
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
