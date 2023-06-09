let express = require("express"),
	app = express(),
	exphbs = require("express-handlebars"),
	path = require("path"),
	session = require("express-session"),
	flash = require("connect-flash"),
	webRoutes = require("./routes/web.routes"),
	dashRoutes = require("./routes/dash.routes"),
	usuarioRoutes = require("./routes/usuario.routes"),
	apiRoutes = require("./routes/api.routes"),
	db = require("./db")

app.engine(
	"hbs",
	exphbs.engine({
		extname: "hbs",
		helpers: {
			eq: (firstValue, secondValue) => {
				return firstValue === secondValue
			},
			subtract: (firstValue, secondValue) => {
				if (secondValue > 0) {
					return firstValue - secondValue
				} else {
					return firstValue
				}
			},
			fmtDate: (date) => {
				let [year, month, day] = date.split("-")
				return `${day}/${month}/${year}`
			},
			charactersLimit: (text, limit) => {
				if (text.length > limit) {
					return text.slice(0, limit) + "..."
				} else {
					return text
				}
			},
			statusOperation: (status) => {
				switch (status) {
					case "started":
						return "INICIADA"
						break

					case "finished":
						return "FINALIZADA"
						break

					case "paused":
						return "PAUSADA"
						break
				}
			},
			selected: (firstValue, secondValue) => {
				if (Array.isArray(secondValue)) {
					return secondValue.includes(firstValue) ? "selected" : ""
				}
				return firstValue === secondValue ? "selected" : ""
			},
			formatList: (list, separator) => {
				if (list.length === 0) {
					return ""
				}
				return list.join(separator) + "."
			}
		}
	})
)
app.set("view engine", "hbs")
app.use(express.static(path.join(__dirname, "public")))
app.use(
	express.urlencoded({
		extended: true
	})
)
app.use(express.json())
app.use(
	session({
		secret: "message",
		resave: true,
		saveUninitialized: true
	})
)
app.use(flash())
app.use((req, res, next) => {
	res.locals.success_message = req.flash("success_message")
	res.locals.info_message = req.flash("info_message")
	res.locals.warning_message = req.flash("warning_message")
	res.locals.error_message = req.flash("error_message")
	req.session.loggedIn
	res.locals.user = req.session.user
	next()
})

function verifyAuthentication(req, res, next) {
	if (!req.session.loggedIn) {
		req.session.user = null
		res.redirect("/login")
		return
	}
	next()
}

app.use("/", webRoutes)
app.use("/api", apiRoutes)
// app.use(verifyAuthentication)
app.use("/app", dashRoutes)
app.use("/app", usuarioRoutes)

async function start() {
	try {
		await db.sync()
		app.listen(3000)
	} catch (error) {
		console.error(error)
	}
}

start()