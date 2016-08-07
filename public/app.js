"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var app = new Vue({
  el: "body",
  data: {
    signup: {
      email: null
    },
    signupSuccess: false,
    signupError: {
      email: null
    }
  },
  methods: {
    onSignupUser: function onSignupUser(ev) {
      var _this = this;

      this.$http.post("/api/users", this.signup).then(function (output) {
        if (output.data.success) {
          _this.signupSuccess = true;
          localStorage.setItem("token", output.data.token);
          localStorage.setItem("user", JSON.stringify(output.data.user));
          window.location.href = "/thankyou";
        } else {
          _this.signupError = Object.assign.apply(Object, [{}].concat(_toConsumableArray(output.data.errors)));
        }
      });
    }
  }
});


// ES6 below

// var app = new Vue({
//   el: "body",
//   data: {
//     signup: {
//       email: null
//     },
//     signupSuccess: false,
//     signupError: {
//       email: null
//     }
//   },
//   methods: {
//     onSignupUser(ev){
//       this.$http.post("/api/users", this.signup).then(output => {
//           if (output.data.success) {
//             this.signupSuccess = true;
//             localStorage.setItem("token", output.data.token);
//             localStorage.setItem("user", JSON.stringify(output.data.user));
//             window.location.href = "/thankyou";
//           }
//           else {
//             this.signupError = Object.assign({}, ...output.data.errors)
//           }
//       })
//     }
//   }
// })


// // var app = new Vue({
  
// //   el: '#app',
  
// //   data: {
// //     message: 'Hello world'
// //   },
  
// //   created: function(){
// //   },
  
// //   methods: {
// //    onClick: ev => {
// //      fetch('/test')
// //        .then(output => output.json())
// //        .then(output =>{
// //          output.test
// //          app.message = output.test
// //        })
// //    }
// //   }

// // })
