// import { mapState } from 'vuex';
import store from '../store/private.js';

export default {

    computed: {

        coordinates () {

            return {
                top: store.state.area.cursorInArea.top + 'px',
                left: store.state.area.cursorInArea.left + 'px',
            };

        }

        // ...mapState(['area']),

    },

    created () {

        console.log(store.state.area);
        // console.log(this.area);
        // console.log(this.area.cursorInArea);

    }


}
