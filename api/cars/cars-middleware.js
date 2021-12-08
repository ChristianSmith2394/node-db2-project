const Cars = require('./cars-model')
const db = require('../../data/db-config')
const vin = require('vin-validator')

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
  if(!req.body.vin) return next({
    status:400,
    message: 'vin is missing'
  }) 
  if(!req.body.make) return next({
    status:400,
    message: 'make is missing'
  }) 
  if(!req.body.model) return next({
    status:400,
    message: 'model is missing'
  }) 
  if(!req.body.mileage) return next({
    status:400,
    message: 'mileage is missing'
  }) 
  next()
}

const checkVinNumberValid = (req, res, next) => {
  if(vin.validate(req.body.vin)){
    next()
  }else{
    next({
      status: 400, 
      message: `vin ${req.body.vin} is invalid`
    })
  }

}

const checkVinNumberUnique = (req, res, next) => {
  db('cars').where({ name: req.body.vin }).first()
    .then(vin => {
      if (!vin) {
        next()
      } else {
        res.status(400).json({ message: `vin ${vin} already exists`})
      }
    })
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}