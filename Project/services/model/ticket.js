const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    card:{
        type: String
    },
    email:{
        type: String
    }
})

const ticket = module.exports = mongoose.model('Ticket', ticketSchema)
