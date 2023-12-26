
const mongoose = require( 'mongoose' );

const connectDB = async () =>
{
    try {
        mongoose.set('strictQuery', false)
        const conn = await mongoose.connect( process.env.MONGODB_URI )
    } catch (error) {
        console.log( error )
        process.exit(1)
    }
}

module.exports = connectDB;