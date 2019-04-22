// import ModalWindow from "../components/ModalWindow.vue"
// import Vue from 'vue'
export var getCursorOffset = function (e) {
    var leftOffset = +Number(e.clientX - e.currentTarget.getBoundingClientRect().left).toFixed(), topOffset = +Number(e.clientY - e.currentTarget.getBoundingClientRect().top).toFixed(), rightOffset = +Number(e.currentTarget.getBoundingClientRect().right - e.clientX).toFixed(), bottomOffset = +Number(e.currentTarget.getBoundingClientRect().bottom - e.clientY).toFixed();
    return {
        left: leftOffset,
        top: topOffset,
        right: rightOffset,
        bottom: bottomOffset,
    };
};
// declare module 'vue/types/vue' {
//   interface Vue {
//     closeHandler: any;
//   }
// }
//
// export const confirm = (title, message) => {
//
//   return new Promise((resolve, reject) => {
//
//     const dialog = new Vue({
//
//       methods: {
//         closeHandler(fn, arg) {
//           return function() {
//             fn(arg);
//             dialog.$destroy();
//             dialog.$el.remove();
//           };
//         }
//       },
//
//       render(h) {
//         return h(ModalWindow, {
//           props: {
//             title,
//             message,
//           },
//           on: {
//             confirm: this.closeHandler(resolve),
//             cancel: this.closeHandler(reject, new Error('canceled'))
//           }
//         });
//       }
//
//     }).$mount();
//
//     document.body.appendChild(dialog.$el);
//
//   });
//
// };
//# sourceMappingURL=index.js.map