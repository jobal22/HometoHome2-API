const express = require('express')
const AddressesService = require('./addresses-service')
const logger = require('../logger')

const addressesRouter = express.Router()
const jsonParser = express.json()

addressesRouter
  .route('/')
  .get((req, res, next) => {
      const knexInstance = req.app.get('db')
      AddressesService.getAllAddresses(knexInstance)
        .then(addresses => {
            res.json(addresses)
        })
        .catch(next)
    
  })
  .post(jsonParser, (req, res, next) => {
    const { street, city, state, zip, name, email, gospelpresentation, newsalvations, notes} = req.body
    const newAddress = { street, city, state, zip, name, email, gospelpresentation, newsalvations, notes}

    for (const field of ['street', 'city', 'state']) {
      if (!newAddress[field]) {
        logger.error(`${field} is required`)
        return res.status(400).send(`'${field}' is required`)
      }
    }

  AddressesService.insertAddress(
    req.app.get('db'),
    newAddress
  )
    .then(address => {
      res
        .status(201)
        .location(`addresses/${address.id}`)
        .json((address))
    })
    .catch(next)
})


  addressesRouter
  .route('/:addressId')
  .all((req, res, next) => {
    AddressesService.getById(
      req.app.get('db'),
      req.params.addressId
    )
      .then(address => {
        if (!address) {
          return res.status(404).json({
            error: { message: `Address doesn't exist` }
          })
        }
        res.address = address
        next()
      })
      .catch(next)
  })

  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    AddressesService.getById(knexInstance, req.params.addressId)
      .then(address => {
        if (!address) {
          return res.status(404).json({
            error: { message: `Address doesn't exist` }
          })
        }
        res.json(address)
      })
      .catch(next)
  })
 
  .delete((req, res, next) => {
    AddressesService.deleteAddress(
      req.app.get('db'),
      req.params.addressId
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
})


  .patch(jsonParser, (req, res, next) => {
    const {street, city, state, zip, name, email, gospelpresentation, newsalvations, notes} = req.body
    const addressToUpdate = { street, city, state, zip, name, email, gospelpresentation, newsalvations, notes}

      AddressesService.updateAddress(
        req.app.get('db'),
        req.params.addressId,
        addressToUpdate
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })

module.exports = addressesRouter