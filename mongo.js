const mongoose = require('mongoose')

if(process.argv.length !== 3 && process.argv.length !== 5){
  console.log('Please add all requirement')
  process.exit()
}

const password = process.argv[2]
const userName = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://admin:${password}@cluster0.kzdvxmb.mongodb.net/phoneBook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name : String,
  number : String,
})
console.log('%cmongo.js line:18 ', 'color: #007acc;')

const Person = mongoose.model('Person',personSchema)
console.log('%cmongo.js line:21 ', 'color: #007acc;')
mongoose.connect(url)
  .then(result => {
    console.log('conected')
    if(process.argv.length === 5){
      const person = new Person({
        name: userName,
        number: number,
      })
      person.save().then(() => {
        console.log('note saved')
        return mongoose.connection.close()
      })
    }
    else if(process.argv.length === 3){
      Person.find({}).then(data => {
        console.log('phonebook:')
        data.map(obj => {
          console.log(obj.name, obj.number)
        })
        return mongoose.connection.close()
      })
    }
  })
  .catch(console.log)