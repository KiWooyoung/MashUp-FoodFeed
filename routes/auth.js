import express from 'express';
import authFacebook from '../models/auth';
const router = express.Router();

//TODO 토큰 쓸껀지 확실히 하기. 그리고, 요청 값도.
/**
 * Facebook을 통한 회원가입 / 로그인
 * Flow :
 * 1. IOS fb.data to SERVER (userNickname, facebookCode)
 * 2. facebookCode로 중복검사를 한다.
 * 3. 중복 안되었을시, 회원가입
 * 4. 중복 됬을시, 로그인 한다.
 * 5. 유저인증은 제외. - 그냥 id값만 넘기는걸로.
 */
router.post('/facebook', (req, res, next) => {
    // res.render('index', { title: 'Express' });

    let info = {
        nickname : req.facebookUserNickname,
        facebook_code : req.facebookCode
    };
    console.log('aaaa');
    authFacebook(info, (err, res) => {
        if (err) {

        } else {

        }
    })
});


module.exports = router;
