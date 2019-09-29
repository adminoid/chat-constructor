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

        Echo.channel('public-chat')
          .listen('.newMessage', (message) => {
            // this.messages.push(message);
            console.log(message);
          });

      },

    }
  }
</script>

<style lang="sass" scoped>

</style>
