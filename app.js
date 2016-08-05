
const bcrypt = require("bcrypt-then");
const app = require("koa")();
const router = require("koa-router")();
const jwt = require("koa-jwt");
const r = require("rethinkdbdash")({db: "trove"});

const config = require("./config");

app.use(require("koa-bodyparser")());
require("koa-validate")(app);

router.get("/test", function*() {
	this.body = yield r.db("rethinkdb").table("stats");
});

router.post("/api/login", function*() {
	this.checkBody('email').isEmail("Please enter a real email");
	this.checkBody('email').notEmpty("Please enter your email");
	this.checkBody('password').notEmpty("Please enter your password");

	if (this.errors) {
    this.body = {success: false, errors: this.errors};
    return;
  }
  
  let {email, password} = this.request.body;
  
	let user = yield r.table("users")
		.getAll(email, {index: "email"})(0)
		.default(null);
	
	if (!user) {
		this.body = {success: false, errors: [{email: "User does not exist with that email"}]};
		return;
	}

	if (!(yield bcrypt.compare(password, user.password))) {
		this.body = {success: false, errors: [{password: "The password you entered does not match the password for that user"}]};
		return;
	}

	delete user.password;

	this.body = {
		success: true,
		user: user,
		token: jwt.sign(email, config.jwtSecret)
	};
});

router.post("/api/users", function*() {
	this.checkBody('email').isEmail("Please enter a real email");
	this.checkBody('first').notEmpty("Please enter your first name");
	this.checkBody('last').notEmpty("Please enter your first name");
	this.checkBody('password').notEmpty("Please enter a password");

	if (this.errors) {
        this.body = {success: false, errors: this.errors};
        return;
    }

	let {email, first, last, password, confirm} = this.request.body;
	let newUser = {
		email: email,
		first: first,
		last: last,
		password: yield bcrypt.hash(password)
	};

	let checkUser = yield r.table("users")
						   .getAll(email, {index: "email"})
						   .count().gt(0);

	if (checkUser) {
		this.body = {success: false, errors: [{email: "User already exists"}]};
		return;
	}

	let data = yield r.table("users")
	                  .insert(newUser, {returnChanges: true})("changes")("new_val")
	                  .without("password");

	this.body = {
		success: true,
		user: data,
		token: jwt.sign(email, config.jwtSecret)
	};
});

router.get("/api/test", jwt({secret: config.jwtSecret}), function*() {
	this.body = {success: "You passed the correct auth header"};
});

app.use(require('koa-static')(__dirname + "/public"));
app.use(router.routes());
app.listen(8000);
