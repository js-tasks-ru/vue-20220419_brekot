import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';

import MeetupView from '../06-MeetupView/MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,

    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      loading: false,
      error: false,
    };
  },

  watch: {
    meetupId() {
      this.getData();
    },
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      this.loading = true;
      this.error = false;
      this.meetup = null;

      fetchMeetupById(this.meetupId)
        .then((result) => {
          this.meetup = result;
        })
        .catch((error) => {
          this.error = error.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },

  template: `
    <div class="page-meetup">
      <meetup-view :meetup="meetup" v-if="meetup && !loading"></meetup-view>

      <ui-container v-if="loading && !error">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-if="error">
        <ui-alert>{{ error }}</ui-alert>
      </ui-container>
    </div>`,
});
