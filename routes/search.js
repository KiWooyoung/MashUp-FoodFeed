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
/**
 *  Request :
 *      startKalorie  - default :0 (require)
 *      endKalorie  - default :700 (require)
 *      hashtag(Ingredient) - one (option)
 *      nickname - one (option)
 *
 *  Response :
 *      shara~~ shara~~
 *
 */
router.get('/', (req, res, next) => {

    let info = {
        userId : req.query.userId,
        startKalorie : req.query.startKalorie,
        endKalorie : req.query.endKalorie,
        hashtag : req.query.hashtag,
        nickname : req.query.nickname
    };

    SEARCH.search(info, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Server Error",
                code: 0,
            })
        } else {
            return res.status(200).json({
                message: "Success",
                code: 1,
                results: results
            })
        }
    });
});


export default router;