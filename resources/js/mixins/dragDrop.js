export default {

    data () {
        return {
            dragged: false,
            cursorOffset: {}
        }
    },

    methods: {

        setCursorOffset (e) {

            this.cursorOffset = {
                left: e.clientX - e.target.getBoundingClientRect().left,
                top: e.clientY - e.target.getBoundingClientRect().top
            };

        },

        getPosition (e, areaOffset) {

            return {
                left: e.clientX - areaOffset.left - this.cursorOffset.left,
                top: e.clientY - areaOffset.top - this.cursorOffset.top
            };

        }

    }

};
