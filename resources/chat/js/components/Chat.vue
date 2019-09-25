<template lang="pug">
  div This is a chat component
</template>

<script>
  export default {
    name: "Chat",

    created() {

      this.listenForBroadcast(1);

    },

    methods: {

      listenForBroadcast(survey_id) {
        Echo.join('survey.' + survey_id)
        .here((users) => {
          this.users_viewing = users;
          this.$forceUpdate();
        })
        .joining((user) => {
          if (this.checkIfUserAlreadyViewingSurvey(user)) {
            this.users_viewing.push(user);
            this.$forceUpdate();
          }
        })
        .leaving((user) => {
          this.removeViewingUser(user);
          this.$forceUpdate();
        });
      },

    }
  }
</script>

<style lang="sass" scoped>

</style>
