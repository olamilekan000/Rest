const express = require('express')
const bodyParser = require('body-parser')
const  morgan = require('morgan')
const routes = require('./routes/index')
require('./passport')

const app = express()

app.set("json spaces", 4);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'))
app.use('/', routes)

app.listen(8005, () => {
	console.log('SERVER NOW LISTENING FOR REQUESTS!!!')
})

