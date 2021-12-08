const Cars = require('./cars-model')
const db = require('../../data/db-config')

const checkCarId = (req, res, next) => {
  const { id } = req.params
  Cars.getById(id).then(car => {
    if (car) {
      req.verified = car
      next()
    } else {
      res.status(404).json({message: `car with id ${id} is not found`})
    }
  })
}

const checkCarPayload = (req, res, next) => {

}

const checkVinNumberValid = (req, res, next) => {

}

const checkVinNumberUnique = (req, res, next) => {
  db('cars').where({ name: req.body.car }).first()
    .then(car => {
      if (!car) {
        next()
      } else {
        res.status(400).json( message: `vin ${vin} already exists`)
      }
    })
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}