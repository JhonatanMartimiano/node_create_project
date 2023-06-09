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
            nome_completo: req.body.nome_completo,
            perfil_acesso: req.body.perfil_acesso,
            email: req.body.email,
            senha: req.body.senha
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
            req.flash("warning_message", "Usuário não encontrado!")
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
            req.flash("warning_message", "Usuário não encontrado!")
            res.redirect("/app/usuarios/usuarios")
        }
        await Usuario.update({
            nome_completo: req.body.nome_completo,
            perfil_acesso: req.body.perfil_acesso,
            email: req.body.email,
            senha: req.body.senha ? req.body.senha : usuario.senha
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
        let usuario = await Usuario.findByPk(req.params.id)
        if (!usuario) {
            req.flash("warning_message", "Usuário não encontrado!")
            res.redirect("/app/usuarios/usuarios")
        }
        await Usuario.destroy({
            where: {
                id: req.params.id
            }
        })

        req.flash("success_message", "Usuário excluido com sucesso!")
        res.json({ redirect: "/app/usuarios/usuarios" })
    } catch (error) {
        console.error(error)
    }
})

module.exports = router