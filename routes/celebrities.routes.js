const CelebM = require("../models/Celebrity.model");
//const bodyParser = require('body-parser');

const router = require("express").Router();

// all your routes here
router.get('/celebrities/create', (req, res, next) => {
    res.render('../views/celebrities/new-celebrity.hbs')
})
router.post('/celebrities/create', (req, res, next) => {
    console.log(req.body);
    const {name, occupation, catchPhrase} = req.body;

    CelebM.create({name, occupation, catchPhrase})
        .then(createdCel => {console.log(`New celebrity created: ${createdCel.name}`)})
        .catch(err => {
            console.log(err)
            return res.redirect('/celebrities/create')
        });
})

router.get('/celebrities', (req, res, next) => {
    CelebM.find()
        .then(celebArr => {
            console.log(celebArr)
            res.render('../views/celebrities/celebrities.hbs', {celebs: celebArr})})
        .catch(err => console.log(err))
})
module.exports = router;