const express = require('express')
const ListsService = require('./lists-service')
const logger = require('../logger')

const listsRouter = express.Router()
const jsonParser = express.json()

listsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    ListsService.getAllLists(knexInstance)
        .then(lists => {
            res.json(lists)
        })
        .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { name, gpId, nsId } = req.body
    const newList = { name, gpId, nsId }

    for (const field of ['name']) {
        if (!newList[field]) {
          logger.error(`${field} is required`)
          return res.status(400).send(`'${field}' is required`)
        }
    }

    ListsService.insertList(
      req.app.get('db'),
      newList
    )
      .then(list => {
        res
          .status(201)
          .location(`lists/${list.id}`)
          .json((list))
      })
      .catch(next)
  })

  listsRouter
  .route('/:listId')
  .all((req, res, next) => {
    ListsService.getById(
      req.app.get('db'),
      req.params.listId
    )
      .then(list => {
        if (!list) {
          return res.status(404).json({
            error: { message: `List doesn't exist` }
          })
        }
        res.list = list
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    ListsService.getById(knexInstance, req.params.listId)
      .then(list => {
        if (!list) {
          return res.status(404).json({
            error: { message: `List doesn't exist` }
          })
        }
        res.json(list)
      })
      .catch(next)
  })

    .delete((req, res, next) => {
        ListsService.deleteList(
          req.app.get('db'),
          req.params.listId
        )
          .then(numRowsAffected => {
            res.status(204).end()
          })
          .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { name, gpId, nsId } = req.body
        const listToUpdate = { name, gpId, nsId }

        for (const field of ['name', 'gospelPresentation', 'newSalvations']) {
          if (!listToUpdate[field]) {
            logger.error(`${field} is required`)
            return res.status(400).send({
              error: { message: `'${field}' is required` }
            })
          }
        }
  

        ListsService.updateList(
        req.app.get('db'),
        req.params.listId,
        listToUpdate
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })

module.exports = listsRouter