let express = require("express"),
	router = express.Router()

router.get("/test", (req, res) => {
	res.status(200).json("test")
})

module.exports = router
