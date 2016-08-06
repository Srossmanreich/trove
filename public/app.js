var app = new Vue({
  el: "body",
  data: {
    showModal: false,
    signup: {
      email: null
    },
    signupSuccess: false,
    signupError: {
      email: null
    }
  },
  methods: {
    onSignupUser(ev){
      this.$http.post("/api/users", this.signup).then(output => {
          if (output.data.success) {
            this.signupSuccess = true;
            localStorage.setItem("token", output.data.token);
            localStorage.setItem("user", JSON.stringify(output.data.user));
            window.location.href = "/thankyou";
          }
          else {
            this.signupError = Object.assign({}, ...output.data.errors)
          }
      })
    }
  }
})


// var app = new Vue({
  
//   el: '#app',
  
//   data: {
//     message: 'Hello world'
//   },
  
//   created: function(){
//   },
  
//   methods: {
//    onClick: ev => {
//      fetch('/test')
//        .then(output => output.json())
//        .then(output =>{
//          output.test
//          app.message = output.test
//        })
//    }
//   }

// })
