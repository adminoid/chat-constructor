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

        window.Echo.channel('public-chat')
          .listen('UserConnectedToChat', (e) => {
            console.log(e);
          });

      },

    }
  }
</script>

<style lang="sass" scoped>

</style>
