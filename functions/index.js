const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')(
  'sk_test_51Hvq0VIoMcpobH3yXha4ss0akDogG8uyWkq1g77PWI2JzxmbSfXUwvCKa7IJPYWHn3llQS9u5TrRc6aRDhF0wTLS00bTY7N2Fa',
)

// API
// ~ App config
const app = express()

// ~ middlewares
app.use(cors({ origin: true }))
//  parse data in json format
app.use(express.json())

// ~ API routes
app.get('/', (req, res) => {
  res.status(200).send('hello')
})
app.post('/payments/create', async (req, res) => {
  const total = req.query.total
  console.log('payment', total)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'usd',
  })
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  })
})

// ~ listen command
exports.api = functions.https.onRequest(app)
