const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars')
    .where('id', id)
    .first()
}

const create = async ({ vin, make, model, mileage }) => {
  const [id] = await db('cars').insert({ vin, make, model, mileage })
  return create(id)
}


module.exports = {
  getAll,
  getById,
  create,
}