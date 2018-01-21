'use strict';

const express = require('express');
const router = express.Router();

/**
 *  유저 정보 가져오기.
 */
router.get('/:user_name', (req, res, next) => {

});

/**
 * 유저 Feed 가져오기.
 */
router.get('/:user_name/feeds', (req, res, next) => {

});

/**
 * 유저 정보 수정하기.
 */
router.put('/:user_name', (req, res, next) => {

});

/**
 * 프로필 사진 업로드.
 */
router.put('/:user_name/images/upload', (req, res, next) => {

});

//Todo post 아닌가?
/**
 * Follow 하기
 */
router.put('/:following_user_id/follow', (req, res, next) => {

});

/**
 * UnFollow 하기
 */
router.delete('/:following_user_id/follow', (req, res, next) => {

});

/**
 * 특정 게시물 Follow 상태 가져오기.
 */
router.get('/:following_user_id/follow', (req, res, next) => {

});

module.exports = router;