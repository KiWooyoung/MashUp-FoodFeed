'use strict';
import express from 'express';
import SEARCH from '../models/search';
const router = express.Router();

// dummy rcmd ingredient tag list
router.get('/rcmd/ingredient', (req, res, next) => {

    SEARCH.rcmdIngredient((err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Server Error",
                code: 0,
            })
        } else {
            return res.status(200).json({
                message: "Success",
                code: 1,
                result: result
            })
        }
    });
});

// dummy rcmd user tag list
router.get('/rcmd/user', (req, res, next) => {

    SEARCH.rcmdUser((err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Server Error",
                code: 0,
            })
        } else {
            return res.status(200).json({
                message: "Success",
                code: 1,
                result: result
            })
        }
    });
});

// real search
router.get('/', (req, res, next) => {

    let info = {
        startKalorie : start_kalorie,
        endKalorie : end_kalorie
    };

    SEARCH.search((err, result) => {
        if (err) {

        } else {

        }
    });
});


export default router;