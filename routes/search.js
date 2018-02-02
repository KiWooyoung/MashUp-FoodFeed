'use strict';
import express from 'express';
import SEARCH from '../models/search';
const router = express.Router();

// dummy rcmd ingredient tag list
router.get('/rcmd/ingredient', (req, res, next) => {

    SEARCH.rcmdIngredient((err, result) => {
        if (err) {

        } else {

        }
    })
});

// dummy rcmd user tag list
router.get('/rcmd/user', (req, res, next) => {

    SEARCH.rcmdIngredient((err, result) => {
        if (err) {

        } else {

        }
    })
});

// real search
router.get('/', (req, res, next) => {

});


export default router;