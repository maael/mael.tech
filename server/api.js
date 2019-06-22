const express = require('express')
const db = require('./db')
const router = express.Router()

const {PASSPHRASE} = process.env

const ONE_DAY_MS = 8.64e+7

function sort(docs) {
  return [].concat(docs).sort(({createdAt: createdAtA}, {createdAt: createdAtB}) => {
    return createdAtB - createdAtA;
  });
}

router.post('/authenticate/passphrase', (req, res) => {
  if (req.body.passphrase === PASSPHRASE) {
    res.cookie('token', Math.floor(Math.random() * 1e6), {httpOnly: true, maxAge: ONE_DAY_MS })
    res.send({ok: 1})
  } else {
    res.status(401).send({err: 'Incorrect passphrase'})
  }
})

router.post('/entry', async (req, res) => {
  db.insert(req.body, (err, doc) => {
    if (err) return res.status(500).send(doc)
    res.send(doc)
  })
})

router.get('/entry', async (_, res) => {
  db.find({}).sort({createdAt: 1}).exec((err, docs) => {
    if (err) return res.status(500).send(doc)
    res.send(sort(docs))
  })
})

router.get('/entry/:entryType', async (req, res) => {
  const {entryType} = req.params
  db.find({entryType}).sort({createdAt: 1}).exec((err, docs) => {
    if (err) return res.status(500).send(doc)
    res.send(sort(docs))
  })
})

module.exports = router
