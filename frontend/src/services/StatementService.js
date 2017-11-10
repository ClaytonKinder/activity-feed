import Vue from 'vue'

export default {
  actorNames: ['Morty', 'Summer', 'Jerry', 'Beth'],
  getStatements(moreUrl, cb) {
    return ADL.XAPIWrapper.getStatements({ limit: 20 }, moreUrl, cb);
  },
  getRandomArrayValue(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
  },
  getRandomJsonData (key) {
    return new Promise((resolve, reject) => {
      Vue.http.get(`data/${key}.json`)
        .then((response) => {
          resolve(this.getRandomArrayValue(response.body));
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  buildStatement () {
    return new Promise((resolve, reject) => {
      let statement = {
        actor: {}
      };
      Promise.all([
        this.getRandomJsonData('verbs'),
        this.getRandomJsonData('activities'),
        this.getRandomJsonData('results'),
        this.getRandomJsonData('contexts'),
      ])
        .then(response => {
          let name = this.getRandomArrayValue(this.actorNames);
          statement.actor.name = name;
          statement.actor.mbox = `mailto:${name}@playposit.com`;
          statement.verb = response[0];
          statement.object = response[1];
          statement.result = response[2];
          statement.context = response[3];
          resolve(statement);
        })
        .catch(error => {
          reject(error);
        })
    })
  },
  sendStatement (statement) {
    return new Promise((resolve, reject) => {
      ADL.XAPIWrapper.sendStatement(statement, (error, response, body) => {
        if (error) {
          reject(error);
        }
        else {
          resolve(response);
        }
      });
    });
  }
}