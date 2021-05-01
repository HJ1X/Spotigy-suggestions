const express = require('express')
const router = express.Router()
const controller = require('../controllers/suggestions')
// const validate = require('../controllers/Suggestions validator')    # not required


/**
 * API for getting suggestion request
 */

router.get(
    '/getSuggestion',
    controller.getSuggestions
)


/**
 * API for getting search details
 */

router.post(
    '/findSongs',
    controller.findSongs
)


/**
 * API to terminate scheduled job
 */

router.get(
    '/terminateScheduling',
    controller.terminateJob
)


module.exports = router