const express = require('express')
const router = express.Router()
const CardModel = require('../model/card')

router.post('/payment/card', (req, res) => {

    const body = req.body

    try {
        CardModel.findOne({ card: body.card, cvc: body.cvc, exp: body.exp }, (err, val) => {
            if (err) {
                console.log(err);
                res.status(500).json(err)
            } else if (!val) {
                res.status(200).json({ validated: false })
            } else {
                console.log(req.body.total + " paid")
                res.status(200).json({ validated: true })
            }
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router
