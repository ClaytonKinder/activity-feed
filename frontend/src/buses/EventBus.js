// Allows for broadcasts and emits without having to traverse up the Vue hierarchy
import Vue from 'vue';
const EventBus = new Vue();
export default EventBus;