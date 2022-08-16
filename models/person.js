const mongoose = require('mongoose')

const mongodb_url = process.env.MONGODB_URL

mongoose.connect(mongodb_url)
    .then(() => {console.log('connection success')})
    .catch(console.log)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('goJSON',{
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person',personSchema)