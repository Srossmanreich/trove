
const app = require("koa")();
const router = require("koa-router")();
const rethinkdb = require("rethinkdbdash")

const config = require("./config");
const r = rethinkdb(config.database);

app.use(require("koa-bodyparser")());
require("koa-validate")(app);

router.post("/api/users", function*() {
	this.checkBody('email').isEmail("Please enter a real email");

	if (this.errors) {
    this.body = {success: false, errors: this.errors};
    return;
	}

	let {email} = this.request.body;
	let newUser = {email: email};

	let data = yield r.table("users").insert(newUser,
		{returnChanges: true})("changes")("new_val");

	this.body = {success: true, user: data};
});

app.use(require('koa-static')(`${__dirname}/public`));
app.use(router.routes());
app.listen(config.port);
