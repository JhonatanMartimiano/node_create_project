const db = require("./../db"),
	{ DataTypes } = require("sequelize"),
	Usuario = db.define("usuarios", {
		nome_completo: {
			type: DataTypes.STRING("255"),
			allowNull: false
		},
		perfil_acesso: {
			type: DataTypes.STRING("255"),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING("255"),
			allowNull: false,
			unique: true
		},
		senha: {
			type: DataTypes.STRING("255"),
			allowNull: false
		}
	})

module.exports = Usuario