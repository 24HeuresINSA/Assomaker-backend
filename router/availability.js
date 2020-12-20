const express = require('express');
const {keycloak, models} = require("../app")

let availabilityRouter = express.Router();

availabilityRouter.route("/")
    .get(keycloak.protect("realm:user"), (req, res) => {
        models.Availability.findAll({where: req.query})
            .then(availability => res.send(availability))
            .catch(err => res.status(500).send(err));
    })
    .post(keycloak.protect("realm:user"), (req, res) => {
        models.Availability.bulkCreate(req.body)
            .then(availability => res.status(201).send(availability))
            .catch(err => res.status(500).send(err));
    })
    .put(keycloak.protect("realm:user"), (req, res) => {
        models.Availability.update(req.body, {where: {id: req.body.id}})
            .then(() => {
                models.Availability.findByPk(req.body.id)
                    .then(availability => res.status(201).send(availability))
                    .catch(err => res.status(500).send(err));
            })
            .catch(err => res.status(500).send(err));
    })
    .delete(keycloak.protect("realm:user_admin"), (req, res) => {
        models.Availability.destroy({where: {id: req.query.id}})
            .then(result => {
                if (result) res.sendStatus(204);
                else res.sendStatus(404);
            })
            .catch(err => res.status(500).send(err));
    });

module.exports = availabilityRouter