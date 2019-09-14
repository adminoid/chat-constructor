<template lang="pug">

  div
    h4 {{ $t('customer.block_buttons') }}
    ul.buttons
      draggable.buttons__wrapper(tag='ul', v-model='buttons', v-bind='dragOptions', @start='drag = true', @end='drag = false')
        transition-group(type='transition', :name="!drag ? 'flip-list' : null")
          li.buttons__item(v-for='button in buttons', :key='button.sort_order_id')
            input.btn.btn-primary(v-model="button.text")

    button.btn.btn-info(type="button" @click="addButton") {{ $t('customer.add_button') }}

</template>

<script lang="ts">

  import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
  import axios from 'axios'
  import _ from 'lodash'
  // @ts-ignore
  import draggable from 'vuedraggable'

  @Component({
    components: {
      draggable
    }
  })
  export default class ModalFormBlockEditSubFormButton extends Vue {

    name: 'ModalFormBlockEditSubFormButton';

    buttons = [
      {
        id: 0,
        text: '', //this.$t('customer.text_on_button'),
        sort_order_id: 0,
      },
    ];

    drag = false;

    @Prop({}) state!: {
      params: {
        blockId: -1
      },
      formData: {
        buttons: [],
      },
    };

    created() {
      // @ts-ignore
      this.buttons[0].text = this.$t('customer.text_on_button');
      // console.log(this.$t('customer.text_on_button'));
      axios.get('/private/outputs/' + this.state.params.blockId).then(resp => {
        let buttons = resp.data;
        if( buttons.length > 0 ) {
          this.buttons = _.orderBy(buttons, 'sort_order_id');
        }
      });
    }

    get dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }

    get orderedButtons () {
      return _.orderBy(this.buttons, 'sort_order_id');
    }

    onInput(e, idx) {
      const value = e.target.innerText;
      this.buttons[idx].text = value;
    }

    addButton() {
      this.buttons.push({
        id: 0,
        text: this.$t('customer.text_on_button') + ' ' + this.buttons.length,
        sort_order_id: this.buttons.length,
      });
    }

    @Watch('buttons', { immediate: true, deep: true })
    onButtonsChanged(val) {
      this.state.formData.buttons = val;
    }

  }

</script>

<style lang="sass" scoped>

  .buttons
    padding: 0

  .buttons__wrapper
    list-style: none
    padding: 0
    li
      padding: 0  0 10px 0
      button
        min-width: 100px

</style>
