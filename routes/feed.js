'use strict';
import express from 'express';
const router = express.Router();

/**
 * 게시글 작성.
 */
router.post('/write', (req, res, next) => {
  res.send('respond with a resource');
});

/**
 * 게시글 수정.
 */
router.put('/modify', (req, res, next) => {

});

/**
 * 게시글 삭제
 */
router.delete('/:feed_id', (req, res, next) => {

});

/**
 * 게시글 상세.
 */
router.get('/:feed_id', (req, res, next) => {

});

/**
 * 게시글 리스트 가져오기.
 */
router.get('/', (req, res, next) => {

});

//TODO Put -> Post아닌가염?,Delete 인가?
/**
 * 좋아요 하기.
 */
router.put('/:feed_id/like', (req, res, next) => {

});
/**
 * 좋아요 취소.
 */
router.delete('/:feed_id/like', (req, res, next) => {

});
//TODO 상태를 한개씩만 가져오나?? - 정확히 어떤 상태의 좋아요?
/**
 * 좋아요 상태 가져오기.
 */
router.get('/:feed_id/like', (req, res, next) => {

});

//TODO - feed_image_upload 가 있는데, 이건
//TODO 게시글 등록 할때 한번에 하는게 아니고, Api 2개 콜?



module.exports = router;
