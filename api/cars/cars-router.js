const router = require('express').Router()
const Cars = require('./cars-model')
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
} = require('./cars-middleware')

router.get('/', async (req, res, next) => {
    await Cars.getAll(req.query)
    .then((cars) => {
        res.status(200).json(cars)
    })
    .catch(next)
})

router.get('/:id', checkCarId, (req, res) => {
    res.json(req.verified)
})

module.exports = router