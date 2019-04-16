export default {

  install (Vue, options) {

    Vue.prototype.$confirm = async (message) => {

      // console.info('You are really sure do it?');

      setTimeout(_ => {
        console.log(message);
      }, 3000);

    };

  }
}
