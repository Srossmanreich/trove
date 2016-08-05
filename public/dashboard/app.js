var app = new Vue({
	el: "body",
	data: {
		user: {
			first: null,
			last: null,
			email: null
		}
	},

	ready() {
		if (!this.token()) {
			window.location.href = "/";
			return;
		}

		this.user = JSON.parse(localStorage.getItem("user"));
	},

	methods: {
		token() {
			return localStorage.getItem("token");
		},
		onLogoutUser(ev) {
      		localStorage.clear()
      		window.location.href = "/";
    	}
	}
})

// app.$http.get("/api/test", {}, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).then(x => console.log(x))