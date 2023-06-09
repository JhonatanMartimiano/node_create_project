let express = require("express"),
	router = express.Router(),
	Usuario = require("./../models/usuario")

router.get("/", (req, res) => {
	res.redirect("/login")
})
router.get("/login", (req, res) => {
	res.render("pages/login", {
		layout: "web/_auth"
	})
})
router.post("/login", async (req, res) => {
	let { email, senha } = req.body
	if (email && senha) {
		try {
			await Usuario.sync()
			let usuario = await Usuario.findOne({
				raw: true,
				where: {
					email,
					senha
				}
			})
			if (usuario) {
				req.session.loggedIn = true
				req.session.user = usuario
				res.redirect("/app/dashboard/home")
			}
		} catch (error) {
			console.error(error)
		}
	}
})

module.exports = router
