let express = require("express"),
    router = express.Router()

router.get("/dashboard/home", (req, res) => {
    res.render("modules/dash/home")
})

module.exports = router