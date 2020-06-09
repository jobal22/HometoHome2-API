const ListsService = {
    getAllLists(knex) {
      return knex.select('*').from('hometohome_lists')
    },
    insertList(knex, newList) {
      return knex
        .insert(newList)
        .into('hometohome_lists')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
    getById(knex, id) {
      return knex.from('hometohome_lists').select('*').where('id', id).first()
    },
    deleteList(knex, id) {
      return knex('hometohome_lists')
        .where({ id })
        .delete()
    },
    updateList(knex, id, newListFields) {
      return knex('hometohome_lists')
        .where({ id })
        .update(newListFields)
    },
  }
  
  module.exports = ListsService