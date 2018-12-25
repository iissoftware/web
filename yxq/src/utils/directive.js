import Vue from 'vue'


// Vue.directive('onlyNumber', {           //只能输入数字
//     bind(el, options, vnode) {
//         var elem = el.querySelector('.el-input__inner');
//         elem.addEventListener('keyup', e => {
//             var reg = /^\/./g;
//             if(!reg.test(elem.value)) {
//                 elem.value = '';
//             }
//         });
//         elem.addEventListener('blur', () => {
//             console.log(elem.value)
//         })
//     }
// });