'use strict';
import express from 'express';
import Auth from '../models/auth';
const router = express.Router();

//TODO 토큰 쓸껀지 확실히 하기. 그리고, 요청 값도.
//TODO facebookCode 를 UQ 하게 다시 예외처리 해야한다.
router.post('/facebook', (req, res, next) => {

    let info = {
        nickname: req.body.facebookUserNickname,
        facebookCode: req.body.facebookCode
    };

    Auth.authFacebook(info, (err, result) => {
        if (err) {
            // throw err //TODO 확인
            return res.status(500).json({
                message: 'Server Error',
                code: 0
            })
        } else {
            return res.status(200).json({
                message: 'Success',
                code: 1,
                result: result
            })
        }
    });

});

export default router;
