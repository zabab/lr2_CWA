const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 8004
const SURNAME_EN = 'Zababonina Anna'
const SURNAME_RU = 'Забабонина Анна'

const app = express()

app.use(express.json())
app.use(cors({
    origin: '*'
}))

app.get('/fetch', (req, res) => {
    res.status(200).sendFile(__dirname + '/fetch.html')
})

app.get('/login', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.status(200).send(SURNAME_RU)
})

app.get('/login/1', (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.write(JSON.stringify(SURNAME_RU))
    res.end()
})

app.get('/login/2', (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.status(200).json(SURNAME_RU)
})

app.get('/login/code1', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.status(200).send(html)
})

app.get('/login/code2', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.status(200).send(html)
})

app.get('/promise', async (req, res) => {
    if (Object.keys(req.query).length) {
        const { x } = req.query
        if (Number.isNaN(Number(x))) {
            return res.status(400).send(`Bad request: Параметр X должен отправляться в формате "?x=число"`)
        }
        const result = await task(x)
        res.status(200).send(result)
    } else {
        res.status(200).send(`function task(x) {
            return new Promise((resolve, reject) => {
                if (x < 13) {
                    resolve('yes')
                } else {
                    resolve('no')
                }
            })
        }`)
    }
})

app.get('/promise/*', (req, res) => {
    res.status(400).send(`Bad request: Параметр X должен отправляться в формате "?x=число"`)
})

app.get('/', (req, res) => {
    res.status(500).sendFile(__dirname + '/500.html')
})

app.get('*', (req, res) => {
    res.status(404).sendFile(__dirname + '/404.html')
})

app.listen(PORT, () => console.log(`Server start on PORT ${PORT}...`))

function task(x) {
    return new Promise((resolve, reject) => {
        if (x < 13) {
            resolve('yes')
        } else {
            resolve('no')
        }
    })
}

const html = `<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <style>
        body {
            font-weight: 700;
            font-size: 21px;
        }
    </style>
</head>
<body>${SURNAME_EN}</body>
</html>
`