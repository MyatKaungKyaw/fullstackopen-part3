const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// morgan(':method :url :status :res[content-length] - :response-time ms')

app.use(morgan('tiny', {
    skip: (req, res) => req.method !== 'GET'
}))

morgan.token('req-json', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-json', {
    skip: (req, res) => req.method !== 'POST'
}))


let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})


app.post('/api/persons', (req, res) => {
    const person = {
        id: parseInt(Math.random() * 100000),
        name: req.body.name,
        number: req.body.number,
    }

    if (!person.name) {
        return res.status(400).json({ error: `The name is missing` })
    }
    if (!person.number) {
        return res.status(400).json({ error: `The number is missing` })
    }
    else if (persons.find(p => p.name === person.name)) {
        return res.status(400).json({ error: 'name must be unique' })
    }

    persons = persons.concat(person)

    res.json(person)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (!person) {
        return res.status(400).send(`Person with id '${id}' is not in the server.`)
    }

    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const prevPersons = persons
    persons = persons.filter(p => p.id !== id)

    if (prevPersons.length === persons.length) {
        return res.send(`Person with id '${id}' is not in the server`)
    }

    return res.status(204).end()
})

app.get('/info', (req, res) => {
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    `)
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})