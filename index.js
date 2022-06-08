const path = require('path')
const express = require('express')
const router = require('./router.js')
const foodList = require('./food-list.json')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
}

app.use(logger)
app.use(router)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('src/img'))


app.get('/', (req, res) => res.render('index'))

app.get('/greetings', (req, res) => {
    res.send('Selamat datang di Bingle')
})

app.get('/products', (req, res) => {
    res.json([
        "Apple",
        "Redmi",
        "One Plus One"
    ])
})

app.get('/orders', (req, res) => {
    res.json([
        {
            id: 1,
            paid: false,
            user_id: 1
        },
        {
            id: 2,
            paid: false,
            user_id: 1
        }
    ])
})

app.get('/users', (req, res) => {
    res.json([
        {
            Nama: "Lintang",
            TTL: 202020,
            JK: "Laki-laki"
        }
    ])
})

app.get('/greet', (req, res) => {
    const name = req.query.name || 'name'
    res.render('greet', {name})
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', (req, res) => {
    const { email, password } = req.body
    res.json([email, password])
})

// app.get('/karya.png', (req, res) => res.sendFile(path.join(__dirname, 'karya.png')))

app.get('/api/v1/foods', (req, res) => res.status(200).json(foodList))

app.get('/api/v1/foods/:id', (req, res) => {
    const food = foodList.find(food => food.id == req.params.id)

    if (food) {
        return res.status(200).json(food)
    }
    
    return res.status(404).json({ error: "Makanan tidak ada di Daftar."})
})

app.post('/api/v1/foods', (req, res) => {
    const { name, type, price } = req.body
    const id = foodList.length + 1

    const food = {
        id,
        name,
        type,
        price
    }

    foodList.push(food)

    res.status(201).json(food)
})

app.put('/api/v1/foods/:id', (req, res) => {
    const { name, type, price } = req.body
    const id = req.params.id

    let food = foodList.find(food => food.id == req.params.id)
    
    food.name = name
    food.type = type
    food.price = price

    foodList.map(index => index.id == food.id ? food : index )

    res.status(200).json(food)
})

app.get('/api/v1/hitungTotal', (req, res) => {
    const { angka1 = 0, angka2 = 0 } = req.query

    let total = parseInt(angka1) * parseInt(angka2)

    res.status(200).json({ total: total })
}
)

const errorHandler = (err, req, res, next) => {
    console.log(err);
    return res.status(500).json({
        status: 'fail',
        errors: err.message
    })
}

const notFoundHandler = (req, res, next) => {
    return res.status(404).json({
        status: 'fail',
        errors: "Not Found"
    })
}

app.use(errorHandler)
app.use(notFoundHandler)

app.listen(port, () => console.log('Example app listening at http: ${port}'))