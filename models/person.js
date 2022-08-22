const mongoose = require('mongoose')

const mongodb_url = process.env.MONGODB_URL

mongoose.connect(mongodb_url)
    .then(() => {console.log('connection success')})
    .catch(console.log)

const personSchema = new mongoose.Schema({
    name: {
        type:String,
        minLength:3,
    },
    number: {
        type:String,
        validate:{
            //validator: v => /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v),
            validator: v => /\d{2,3}-\d+/.test(v),
            message: props => `${props.value} is not a valid phone number!`
        }
    },
})

personSchema.set('toJSON',{
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person',personSchema)