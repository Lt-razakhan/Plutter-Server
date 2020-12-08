const mongoose = require('mongoose')
const { database } = require('./dbConfig')
const dbConfig = require('./dbConfig')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(dbConfig.database, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected : ${conn.connection.host}`)
    }
    catch (err){
      console.log(err);
      process.exit(1)
    }
}


module.exports = connectDB;