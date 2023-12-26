const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const ReminderSchema = new Schema( {
    title: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: false,
    },
} )

module.exports = mongoose.model('Reminder', ReminderSchema )