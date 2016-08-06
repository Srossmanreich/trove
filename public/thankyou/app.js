var app = new Vue({
	el: "body",
	data: {
		user: {
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
		}
	}
})