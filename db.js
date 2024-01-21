const mongoose = require("mongoose");
var mongoURL = 'mongodb+srv://AbhishekPeiris:abhi2001@cluster0.yiebxsw.mongodb.net/mern-rooms'

mongoose.connect(mongoURL, {
    useUnifiedTopology : true,
    useNewUrlParser : true
})

var connection = mongoose.connection

connection.on('error' , ()=> {
    console.log('MongoDB Connection failed')
})
connection.on('connected' , ()=> {
    console.log('MongoDB Connection Sucessful')
})

module.exports = mongoose