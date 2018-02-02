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
    //TODO 보통 feed 좋아요 상태 가져올때, 쿼리 한번에 가져 오나?
    static getFeed(info, callback) {
        dbPool.getConnection((err, dbConn) => {
            if (err) {
                return callback('DB Error');
            }

            const getAllFeed = () => {
                return new Promise((resolve, reject) => {
                   let sql = "SELECT U.id AS userId, U.nickname, U.profile_img, P.id AS feed_id, P.calorie, P.content, GROUP_CONCAT(distinct PI.img_url) AS img_url, " +
                       "GROUP_CONCAT(distinct H.name) AS hashtags FROM " +
                       "post P JOIN user U ON U.id=P.user_id JOIN post_image PI " +
                       "ON P.id=PI.post_id JOIN hashtag H ON P.id=H.post_id GROUP BY P.id LIMIT 0, 1000";

                   dbConn.query(sql, (err, results) => {
                       if (err) {
                           reject(err)
                       } else {
                           resolve(results)
                       }
                   })
                });
            };
            const getAllLikeFeed = () => {
                return new Promise((resolve, reject) =>  {
                    let sql = "SELECT post_id FROM post_like WHERE user_id=?;";

                    dbConn.query(sql, [info.userId], (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(results)
                        }
                    })
                })
            };

            Promise.all([getAllFeed(), getAllLikeFeed()])
                .then((results) => {
                    let values = {
                        feedData : results[0],
                        likedPostId : results[1]
                    };
                    return callback(null, values)
                })
                .catch((error) => {
                    console.log(error);
                    dbConn.release();
                    return callback(error);
                });
        })
    }


    //delete
    static deleteFeed(info, callback) {
        dbPool.getConnection((err, dbConn) => {
            if (err) {
                return callback('DB Error');
            }

            const removeFeed = () => {
                return new Promise((resolve, reject) => {
                    let sql = "DELETE FROM post WHERE user_id=? AND id=?;";

                    dbConn.query(sql, [info.userId, info.feedId], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    })
                })
            };

            removeFeed()
                .then((res) => {
                    dbConn.release();
                    return callback(null, res);
                })
                .catch((error) => {
                    console.log(error);
                    dbConn.release();
                    return callback(error);
                })
        })
    }


    //getDetail
    static getDetailFeed(info, callback) {
        dbPool.getConnection((err, dbConn) => {
            if (err) {
                return callback('DB Error');
            }

            const getDetail = () => {
                return new Promise((resolve, reject) => {
                    let sql = "SELECT U.id AS userId, U.nickname, U.profile_img, " +
                        "P.id AS feedId, P.calorie, P.content, " +
                        "GROUP_CONCAT(distinct H.name) AS hashtags, " +
                        "GROUP_CONCAT(distinct PI.img_url) AS img_url " +
                        "FROM user U JOIN post P ON U.id=P.user_id " +
                        "JOIN hashtag H ON P.id=H.post_id JOIN " +
                        "post_image PI ON P.id=PI.post_id WHERE P.id=?;";

                    dbConn.query(sql, [info.feedId], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    })
                })


            };

            getDetail()
                .then((res) => {
                    dbConn.release();
                    return callback(null, res);
                })
                .catch((error) => {
                    console.log(error);
                    dbConn.release();
                    return callback(error);
                })
        })
    }


    //like
    static likeFeed(info, callback) {
        dbPool.getConnection((err, dbConn) => {
            if (err) {
                return callback('DB Error');
            }
            const like = () => {
                return new Promise((resolve, reject) => {
                    let sql = "INSERT INTO post_like(post_id, user_id) VALUES(?,?);";

                    dbConn.query(sql, [info.feedId, info.userId], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
            };

            like()
                .then((res) => {
                    dbConn.release();
                    return callback(null, res);
                })
                .catch((error) => {
                    dbConn.release();
                    console.log(error);
                    return callback(error);
                })

        });
    };

    //unlike
    static unlikeFeed(info, callback) {
        dbPool.getConnection((err, dbConn) => {
            if (err) {
                return callback('DB Error');
            }
            const unLike = () => {
                return new Promise((resolve, reject) => {
                    let sql = "DELETE FROM post_like WHERE post_id=? AND user_id=?;";

                    dbConn.query(sql, [info.feedId, info.userId], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    })
                })
            };
            unLike()
                .then((res) => {
                    dbConn.release();
                    return callback(null, res);
                })
                .catch((error) => {
                    dbConn.release();
                    console.log(error);
                    return callback(error);
                })
        });
    };

    //checkLikeFeed
    static getLikeStatus(info, callback) {
        dbPool.getConnection((err, dbConn) => {
            if (err) {
                return callback('DB Error');
            }
            const checkLike = () => {
                return new Promise((resolve, reject) => {
                    let sql = "SELECT * FROM post_like WHERE post_id=? AND user_id=?;";
                    dbConn.query(sql, [info.feedId, info.userId], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (result.length === 0) {
                                resolve(0);
                            } else {
                                resolve(100);
                            }
                        }
                    })
                })
            };
            checkLike()
                .then((res) => {
                    dbConn.release();
                    if (res === 0) {
                       return callback(null, 'zero');
                    } else {
                        return callback(null, 'exist');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    dbConn.release();
                    return callback(error);
                })

        });
    };
}


export default Feed;