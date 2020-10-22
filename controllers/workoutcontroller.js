let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log');

router.get('/', (req, res) => {
    Log.findAll()
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }));
});

router.post('/create', validateSession, (req, res) => {
    const workoutEntry = {
        desc: req.body.log.desc,
        def: req.body.log.def,
        result: req.body.log.result,
        owner_id: req.user.id
    }
    Log.create(workoutEntry)
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err }))
});

router.get('/:id', function (req, res) {
    let owner = req.params.id;

    Log.findAll({
        where: { owner_id: owner }
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }));
});

router.put('/edit/:entryId', validateSession, function (req, res) {
    const newLog = {
        desc: req.body.log.desc,
        def: req.body.log.def,
        result: req.body.log.result,
    };

    const query = { where: { id: req.params.entryId, owner_id: req.user.id }};

    Log.update(newLog, query)
        .then((logs) => res.status(200).json(logs))
        .catch((err) => res.status(500).json({ error: err }));
})

router.delete('/:id/delete', validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner_id: req.user.id }};

    Log.destroy(query)
        .then(() => res.status(200).json({ message: "Workout log removed! Get back to the gym, ${user.name}!"})) //why can't I use a variable within this message with ``? It will give an error...
        .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;