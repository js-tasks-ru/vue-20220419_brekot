<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
      <ui-icon icon="trash" />
    </button>

    <ui-form-group>
      <ui-dropdown title="Тип" :options="$options.agendaItemTypeOptions" name="type" v-model="localAgendaItem.type" />
    </ui-form-group>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <ui-form-group label="Начало">
          <ui-input
            type="time"
            v-model="localAgendaItem.startsAt"
            placeholder="00:00"
            name="startsAt"
            @change="updateDif"
          />
        </ui-form-group>
      </div>
      <div class="agenda-item-form__col">
        <ui-form-group label="Окончание">
          <ui-input type="time" v-model="localAgendaItem.endsAt" placeholder="00:00" name="endsAt" @change="setDif" />
        </ui-form-group>
      </div>
    </div>

    <ui-form-group :label="titleName">
      <ui-input name="title" v-model="localAgendaItem.title" />
    </ui-form-group>
    <ui-form-group label="Докладчик" v-if="localAgendaItem.type === 'talk'">
      <ui-input name="speaker" v-model="localAgendaItem.speaker" />
    </ui-form-group>
    <ui-form-group label="Описание" v-if="localAgendaItem.type === 'talk' || localAgendaItem.type === 'other'">
      <ui-input multiline name="description" v-model="localAgendaItem.description" />
    </ui-form-group>
    <ui-form-group label="Язык" v-if="localAgendaItem.type === 'talk'">
      <ui-dropdown
        title="Язык"
        :options="$options.talkLanguageOptions"
        v-model="localAgendaItem.language"
        name="language"
      />
    </ui-form-group>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon';
import UiFormGroup from './UiFormGroup';
import UiInput from './UiInput';
import UiDropdown from './UiDropdown';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      localAgendaItem: { ...this.agendaItem },
      timeDif: 0,
    };
  },

  emits: ['remove', 'update:agendaItem'],

  computed: {
    titleName() {
      if (this.localAgendaItem.type === 'talk') return 'Тема';
      else if (this.localAgendaItem.type === 'other') return 'Заголовок';
      else return 'Нестандартный текст (необязательно)';
    },
  },

  watch: {
    localAgendaItem: {
      deep: true,
      handler(item) {
        this.$emit('update:agendaItem', { ...item });
      },
    },
  },

  mounted() {
    let start = this.localAgendaItem.startsAt.split(':');
    let end = this.localAgendaItem.endsAt.split(':');

    this.timeDif = end[0] - start[0];
  },

  methods: {
    setDif() {
      let start = this.localAgendaItem.startsAt.split(':');
      let end = this.localAgendaItem.endsAt.split(':');

      this.timeDif = end[0] - start[0];
    },
    updateDif() {
      let start = this.localAgendaItem.startsAt.split(':');

      let sum = +start[0] + this.timeDif;

      if (sum > 23) sum = sum - 24;

      this.localAgendaItem.endsAt = (sum < 10 ? '0' + sum : sum) + ':' + start[1];
    },
  },
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
