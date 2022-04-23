import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

// Предположу что fetchMeetupById можно вынести в methods, но куда в таком случае деть API_URL ? Как то описываются костанты компонентов?

const Root = defineComponent({
  name: 'Root',

  data() {
    return {
      meetupId: 0,
      meetupName: ''
    };
  },

  watch: {

    meetupId() {

      this.fetchMeetupById(this.meetupId).then((data) => {

        this.meetupName = data.title;
      });
    },
  },

  methods: {
    fetchMeetupById(meetupId) {
      return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((error) => {
            throw error;
          });
        }
      });
    }
  }
});

const app = createApp(Root);

const vm = app.mount('#app');