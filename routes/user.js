'use strict';
import express from 'express';
import USER from '../models/user';
const router = express.Router();

/**
 *  유저 정보 가져오기.
 */
router.get('/:user_id', (req, res, next) => {

    let info = {
        userId : req.params.user_id
    };

    USER.getUserInfo(info, (err, result) => {
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

/**
 * 유저 Feed 가져오기.
 */
router.get('/:user_id/feeds', (req, res, next) => {

});

/**
 * 유저 정보 수정하기.
 */
router.put('/:user_id', (req, res, next) => {

});

/**
 * 프로필 사진 업로드.
 */
router.put('/:user_id/images/upload', (req, res, next) => {

});

//Todo post 아닌가? why put?
/**
 * Follow 하기
 * desc {
 *      팔로우 하는 사람 = followerId(추종자)
 *      팔로우 당하는 사람 = followingId(따라가는중인 ID)
 * }
 */
router.post('/:user_id/follow', (req, res, next) => {

    let info = {
        followerId : req.query.followerUserId, //추종자
        followingId : req.params.user_id
    };

    USER.followUser(info, (err, result) => {
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

/**
 * UnFollow 하기
 * desc {
 *      언팔로우 하는 사람 = followerId(추종자)
 *      언팔로우 당하는 사람 = followingId(따라가는중인 ID)
 * }
 */
router.delete('/:user_id/follow', (req, res, next) => {

    let info = {
        followerId : req.query.followerUserId,  //추종자
        followingId : req.params.user_id
    };

    USER.unFollowUser(info, (err, result) => {
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

/**
 * 특정 게시물 Follow 상태 가져오기.
 */
router.get('/:user_id/follow', (req, res, next) => {

    let info = {
        followerId : req.query.followerUserId,  //추종자
        followingId : req.params.user_id
    };

    USER.isFollower(info, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Server Error',
                code: 0
            })
        } else {
            if (result) {
                return res.status(200).json({
                    message: 'Success And Followed',
                    code: 1,
                    isFollower: true
                })
            } else {
                return res.status(200).json({
                    message: 'Success And Not Follow',
                    code: 1,
                    isFollower: false
                })
            }
        }
    })
});

module.exports = router;