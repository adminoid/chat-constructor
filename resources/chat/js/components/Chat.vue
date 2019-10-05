<template lang="pug">
  div This is a chat component
</template>

<script>
  export default {
    name: "Chat",

    created() {

      this.listenForBroadcast();

    },

    methods: {

      listenForBroadcast() {

        Echo.private('chat.client.' + 2370000)
          .listen('.ClientChat', (message) => {

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
