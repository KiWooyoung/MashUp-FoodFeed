'use strict';
import express from 'express';
import FEED from '../models/feed'
import upload from '../service/upload';

const uploadPostImg = upload.single('postImg');
const router = express.Router();

/**
 * 게시글 작성.
 */
router.post('/', uploadPostImg, (req, res, next) => {

    let info = {
        userId: req.body.userId,
        content: req.body.content,
        calorie: req.body.calorie,
        hashtags: req.body.hashtags,
        postImgUrl: req.file.location
    };

    FEED.writeFeed(info, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Server Error",
                code: 0
            })
        } else {
            return res.status(204).json({})
        }
    });
});

/**
 * 게시글 수정.
 */
router.put('/:feed_id', (req, res, next) => {

});

/**
 * 게시글 삭제
 */
router.delete('/', (req, res, next) => {

    let info = {
        userId : req.query.user_id,
        feedId : req.query.feed_id
    };

    FEED.deleteFeed(info, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Server Error',
                code: 0
            })
        } else {
            return res.status(204).json({})
        }
    })
});

//TODO 좋아요 상태 가져오는 로직 보통 어떻게 하는지? //++ 데이터 어떻게 넘기는지?
/**
 * 게시글 리스트 가져오기.
 */
router.get('/', (req, res, next) => {

    let info = {
        userId : req.query.userId
    };

    FEED.getFeed(info, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: 'Server Error',
                code: 0
            });
        } else {
            return res.status(200).json({
                message: 'Success',
                code: 1,
                results: results
            })
        }
    })
});

/**
 * 게시글 상세.
 */
router.get('/:feed_id', (req, res, next) => {

    let info = {
        feedId : req.params.feed_id
    };

    FEED.getDetailFeed(info, (err, result) => {
        if (err) {
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
    })
});

//TODO 좋아요 막누를시 예외 처리 어떻게 하나요~? 혹은 좋아요 로직 어떻게 짜나요 다들~?   / Self Answer : MYSQL(RDB)에서는 똑같은 로우가 계속 생겨도 한번만 지우니까 전부 삭제 됨.
//TODO Put -> Post아닌가염?,Delete 인가?
/**
 * 좋아요 하기.
 */
router.post('/like/:feed_id', (req, res, next) => {

    let info = {
        feedId : req.params.feed_id,
        userId : req.body.userId
    };

    FEED.likeFeed(info, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Server Error',
                code: 0
            });
        } else {
            return res.status(204).json({});
        }
    })

});
//TODO ISSUE : 'Truncated incorrect DOUBLE value: \'13&userId=2\'',  쿼리문 자체를 이상하케 call 한거로만으로 서버 멈춤.
/**
 * 좋아요 취소.
 */
router.delete('/like/:feed_id', (req, res, next) => {

    let info = {
        feedId : req.params.feed_id,
        userId : req.query.userId
    };

    FEED.unlikeFeed(info, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Server Error',
                code: 0
            });
        } else {
            return res.status(204).json({});
        }
    })

});
//TODO 상태를 한개씩만 가져오나?? - 정확히 어떤 상태의 좋아요?
/**
 * 좋아요 상태 가져오기.
 */
router.get('/like/:feed_id', (req, res, next) => {

    let info = {
        feedId : req.params.feed_id,
        userId : req.query.userId
    };

    FEED.getLikeStatus(info, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Server Error',
                code: 0
            });
        } else {
            if (result === 'zero') {
                return res.status(200).json({
                    message: 'none exist',
                    code: 1,
                    isLike : false
                });
            } else if (result === 'exist') {
                return res.status(200).json({
                    message: 'exist',
                    code: 2,
                    isLike : true
                });
            }
        }
    })
});

//TODO - feed_image_upload 가 있는데, 이건
//TODO 게시글 등록 할때 한번에 하는게 아니고, Api 2개 콜?


export default router;
