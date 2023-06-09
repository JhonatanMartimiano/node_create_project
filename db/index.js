let { Sequelize } = require("sequelize"),
	sequelize = new Sequelize("ferafox62", "ferafox62", "194280aa", {
		host: "mysql.ferafox.com",
		dialect: "mysql"
	})

module.exports = sequelize