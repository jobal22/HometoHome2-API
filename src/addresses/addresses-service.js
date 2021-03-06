const AddressesService = {
    getAllAddresses(knex) {
      return knex.select('*').from('hometohome3_addresses')
    },
    insertAddress(knex, newAddress) {
      return knex
        .insert(newAddress)
        .into('hometohome3_addresses')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
    getById(knex, id) {
      return knex.from('hometohome3_addresses').select('*').where('id', id).first()
    },
    deleteAddress(knex, id) {
      return knex('hometohome3_addresses')
        .where({ id })
        .delete()
    },
    updateAddress(knex, id, newAddressFields) {
      return knex('hometohome3_addresses')
        .where({ id })
        .update(newAddressFields)
    },
  }
  
  module.exports = AddressesService