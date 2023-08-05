const mongoose = require("mongoose")
const uri = process.env.DB_URL;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
let db = mongoose.connection;

db.once('open', () => {
    console.log('Connection Successful :', uri);
});

db.on('error', () => {
    console.log('Error in mongodb connection', uri);
});

module.exports = mongoose;

