'use strict';
import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import config from '../config/s3_config';

AWS.config.region = config.region;
AWS.config.accessKeyId = config.accessKeyId;
AWS.config.secretAccessKey = config.secretAccessKey;

const bucketName = config.bucketName;
const s3 = new AWS.S3({params: {Bucket: bucketName}});

const uploadImg = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, callback) {
            // console.log('aaaaaa');
            callback(null, {fieldName: file.fieldname});
        },
        key: function (req, file, callback) {
            let newFileName = Date.now() + '-' + file.originalname + '-' + generateRandom(1,5);
            let fullPath = 'foodfeed/' + newFileName;
            callback(null, fullPath);
        },
        limits: {fileSize: 10 * 1024 * 1024}
    })
});

function generateRandom(min, max) {
    let ranNum = 0;
    let str = '';
    for (let i = 0; i < max; i++) {
        ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
        str += ranNum;
    }
    return str;
}

export default uploadImg;