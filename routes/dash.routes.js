let express = require("express"),
    router = express.Router(),
    Usuario = require("./../models/usuario")

router.get("/dashboard/home", async (req, res) => {
    try {
        let usuarios = await Usuario.count()
        res.render("modules/dash/home", { usuarios })
    } catch (error) {
        console.error(error)
    }
})

module.exports = router