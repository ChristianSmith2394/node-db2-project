const { default: knex } = require('knex')
const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars').where("id", id).first()
}

const create = async ({ vin, make, model, mileage, title, transmission }) => {
  const [id] = await db('cars').insert({ vin, make, model, mileage, title, transmission })
  return getById(id)
}

const checkVinUnique = (vinParam) => {
  return db('cars').where({ vin: vinParam }).first()
}
module.exports = {
  getAll,
  getById,
  create,
  checkVinUnique
}