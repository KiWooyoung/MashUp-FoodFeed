'use strict';

const express = require('express');
const router = express.Router();

//TODO 토큰 쓸껀지 확실히 하기. 그리고, 요청 값도.
/**
 * Facebook을 통한 회원가입
 * Flow :
 * 1. IOS -> REQ(fb_token)
 * 2. ~~
 */
router.post('/register', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

//TODO get으로 요청/?
/**
 * Facebook을 통한 로그인.
 */
router.post('/login', (req, res, next) => {

});

module.exports = router;
