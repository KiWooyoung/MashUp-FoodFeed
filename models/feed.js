'use strict';
import mysql from 'mysql';
import dbPoolConfig from '../config/mysql_config';
const dbPool = mysql.createPool(dbPoolConfig);

class Feed {

    // Write
    static writeFeed (info, callback) {
        dbPool.getConnection((err, dbConn) => {
            if (err) {
                return callback('DB Error');
            }

            const insertPost = () => {
                return new Promise((resolve, reject) => {
                    let sql = "INSERT INTO post(user_id, content, calorie) VALUES(?, ?, ?)";
                    dbConn.query(sql, [info.userId, info.content, info.calorie], (err, result) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(result.insertId)
                        }
                    })
                });
            };

            const insertImage = (insertId) => {
                return new Promise((resolve, reject) => {
                    let sql = "INSERT INTO post_image(post_id, img_url) VALUES(?,?);";

                    dbConn.query(sql, [insertId, info.postImgUrl], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve('Success Image');
                        }
                    })
                });
            };

            const insertHashTag = (insertId) => {
                return new Promise((resolve, reject) => {
                    let hashtag = [];
                    let i = 0;

                    for (i; i < info.hashtags.length; i++) {
                        hashtag.push([
                            insertId,
                            info.hashtags[i]
                        ])
                    }

                    let sql = "INSERT INTO hashtag(post_id, name) VALUES ?;";

                    dbConn.query(sql, [hashtag], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve('Success hashTag');
                        }
                    })
                });
            };

            insertPost()
                .then((insertId) => {
                    Promise.all([insertImage(insertId), insertHashTag(insertId)])
                        .then((result) => {
                            dbConn.release();
                            return callback(null, 'Success');
                        })
                        .catch((error) => {
                            dbConn.release();
                            return callback(error);
                        })
                })
                .catch((error) => {
                    console.log(error);
                    dbConn.release();
                    return callback(error)
                })
        })
    }

    //GetAll
    static getFeed (callback) {
        dbPool.getConnection((err, dbConn) => {
            if (err) {
                return callback('DB Error');
            }

            const getAllFeed = () => {
                return new Promise((resolve, reject) => {
                   let sql = "SELECT U.nickname, P.id, P.calorie, P.content, GROUP_CONCAT(distinct PI.img_url) AS img_url, " +
                       "GROUP_CONCAT(distinct H.name) AS hashtags FROM " +
                       "post P JOIN user U ON U.id=P.user_id JOIN post_image PI " +
                       "ON P.id=PI.post_id JOIN hashtag H ON P.id=H.post_id GROUP BY P.id LIMIT 0, 1000";

                   dbConn.query(sql, (err, results) => {
                       if (err) {
                           reject(err)
                       } else {
                           console.log(results);
                           resolve(results)
                       }
                   })
                });
            };

            getAllFeed()
                .then((feeds) => {
                    dbConn.release();
                    return callback(null, feeds);
                })
                .catch((error) => {
                    dbConn.release();
                    return callback(error)
                })
        })
    }
}


export default Feed;