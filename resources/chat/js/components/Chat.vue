<template lang="pug">
  div This is a chat component
</template>

<script>
  export default {
    name: "Chat",

    data () {
      return {
        user_id: null,
      }
    },

    created() {

      this.listenForBroadcast();

    },

    methods: {

      listenForBroadcast() {

        this.user_id = window.Laravel.user_id;

        // + user_id
        Echo.private('chat.' + this.user_id)
          .listen('.InitChat', (message) => {

            console.info('listen...', message);

            // this.messages.push(message);
            // console.log(e);
          });

      },

    }
  }
</script>

<style lang="sass" scoped>

</style>
