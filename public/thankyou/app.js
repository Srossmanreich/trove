var app = new Vue({
	el: "body",
	data: {
		email: null
	},

	ready() {
		if (!this.token()) {
			window.location.href = "/";
			return;
		}

		let user = JSON.parse(localStorage.getItem("user"));
		this.email = user[0].email;
	},

	methods: {
		token() {
			return localStorage.getItem("token");
		}
	}
})