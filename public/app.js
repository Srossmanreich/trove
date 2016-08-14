
var app = new Vue({
  el: "body",
  data: {
    signup: {email: null},
    user: {email: null},
    signupError: {email: null},
    signupSuccess: false,
  },
  methods: {
    onSignupUser: function onSignupUser(ev) {
      var that = this;

      this.$http.post("/api/users", this.signup).then(function(output) {
        if (output.data.success) {
          that.signupSuccess = true;
          that.user = output.data.user[0];
          console.log(that.user);
        } else {
          that.signupError = Object.assign.apply(Object, [{}].concat(output.data.errors));
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
