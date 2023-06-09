let express = require("express"),
    router = express.Router(),
    Usuario = require("./../models/usuario")

router.get("/usuarios/usuarios", async (req, res) => {
    try {
        await Usuario.sync()
        let usuarios = await Usuario.findAll({ raw: true })

        res.render("modules/usuarios/usuarios", { usuarios })
    } catch (error) {
        console.error(error)
    }
})

router.get("/usuarios/usuario", (req, res) => {
    res.render("modules/usuarios/usuario")
})

router.post("/usuarios/usuario", async (req, res) => {
    try {
        await Usuario.sync();
        await Usuario.create({
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password
        })

        req.flash("success_message", "Usuário cadastrado com sucesso!")
        res.redirect("/app/usuarios/usuarios")
    } catch (error) {
        console.error(error)
    }
})

router.get("/usuarios/usuario/:id", async (req, res) => {
    try {
        await Usuario.sync()
        let usuario = await Usuario.findByPk(req.params.id, { raw: true })
        if (!usuario) {
            req.flash("warning_message", "Usuário não encontrado")
            res.redirect("/app/usuarios/usuarios")
        }
        res.render("modules/usuarios/usuario", { usuario })
    } catch (error) {
        console.error(error)
    }
})

router.post("/usuarios/usuario/:id", async (req, res) => {
    try {
        await Usuario.sync()
        let usuario = await Usuario.findByPk(req.params.id, { raw: true })
        if (!usuario) {
            req.flash("warning_message", "Usuário não encontrado")
            res.redirect("/app/usuarios/usuarios")
        }
        await Usuario.update({
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password ? req.body.password : usuario.password
        },
        {
            where: {
                id: req.params.id
            }
        })

        req.flash("success_message", "Usuário atualizado com sucesso!")
        res.redirect(`/app/usuarios/usuario/${req.params.id}`)
    } catch (error) {
        console.error(error)
    }
})

router.delete("/usuarios/usuario/:id", async (req, res) => {
    try {
        await Usuario.sync()
        await Usuario.destroy({
            where: {
                id: req.params.id
            }
        })

        res.json({ redirect: "/app/usuarios/usuarios" })
    } catch (error) {
        console.error(error)
    }
})

module.exports = router