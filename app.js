
const bcrypt = require("bcrypt-then");
const app = require("koa")();
const router = require("koa-router")();
const jwt = require("koa-jwt");
const r = require("rethinkdbdash")({db: "trove"});

const config = require("./config");

app.use(require("koa-bodyparser")());
require("koa-validate")(app);

// router.get("/test", function*() {
// 	this.body = yield r.db("rethinkdb").table("stats");
// });

router.post("/api/users", function*() {
	this.checkBody('email').isEmail("Please enter a real email");

	if (this.errors) {
        this.body = {success: false, errors: this.errors};
        return;
    }

	let {email} = this.request.body;
	let newUser = {
		email: email
	};

	let data = yield r.table("users")
	                  .insert(newUser, {returnChanges: true})("changes")("new_val");

	this.body = {
		success: true,
		user: data,
		token: jwt.sign(email, config.jwtSecret)
	};
});

// router.get("/api/test", jwt({secret: config.jwtSecret}), function*() {
// 	this.body = {success: "You passed the correct auth header"};
// });

app.use(require('koa-static')(__dirname + "/public"));
app.use(router.routes());
app.listen(8000);
