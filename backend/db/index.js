const mongoose = require('mongoose')

mongoose
    .connect('mongodb://localhost:27017/info', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'db connection error!'));
db.once('open', function() {
  console.log('db is connected!')
});

module.exports = db
