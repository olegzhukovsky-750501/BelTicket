const express = require('express')
const router = express.Router()
const routeModel = require('../model/route')
const scheduleModel = require('../model/schedule')
const ticketModel = require('../model/ticket')
const client = require('../client')

router.get('/bus/routes', async (req, res) => {
    try {
        const result = await routeModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/bus/route/:id', async (req, res) => {
    try {
        const result = await routeModel.findOne({ '_id': req.params.id })
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/bus/buses/:route', async (req, res) => {
    try {
        const route = await routeModel.findOne({ '_id': req.params.route })
        const result = await trainModel.find({ route: route.name })
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/bus/schedules', async (req, res) => {
    try {
        const result = await scheduleModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/bus/tickets', async (req, res) => {
    try {
        const body = req.body
        var ticket = new ticketModel(body)
        var result = await ticket.save()
        if (body.card) {
            const html = '<h2><u>Билет</u></h2><p>Номер : <b> ' + result._id + ' </b><br><br>Откуда <b> ' + body.from + ' </b> куда <b> ' + body.to + ' </b><br>' + 'Дата :<b> ' + body.date + ' </b> Время :<b> ' + body.time + ' </b><br>Количество : <b> ' + body.qty + ' </b></p><p>Всего : <b> ' + body.total + ' BYN</b></p> '
            client.sendEmail({ ...body, html: html, subject: 'BusTicket' })
        }
        res.status(200).json(result)
    }
    catch (err) {
        res.status(500).json(err)
    }
});

router.get('/bus/tickets', async (req, res) => {
    try {
        const result = await ticketModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/bus/tickets/:user', async (req, res) => {
    try {
        const result = await ticketModel.find({ user: req.params.user })
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/bus/tickets/:id', async (req, res) => {
    try {
        const result = await ticketModel.deleteOne({ _id: req.params.id }).exec()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router
